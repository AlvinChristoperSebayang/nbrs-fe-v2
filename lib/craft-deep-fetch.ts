import { craftFetch } from "./craft";

type ArgRef = {
  type: { kind: string };
};

type IntrospectedType = {
  __type: {
    kind: string;
    name: string | null;
    fields: { name: string; args: ArgRef[]; type: TypeRef }[] | null;
    possibleTypes: { name: string }[] | null;
  } | null;
};

type TypeRef = {
  name: string | null;
  kind: string;
  ofType: TypeRef | null;
};

const TYPE_INTROSPECTION_QUERY = /* GraphQL */ `
  query IntrospectType($name: String!) {
    __type(name: $name) {
      kind
      name
      fields {
        name
        args {
          type {
            kind
          }
        }
        type {
          name
          kind
          ofType {
            name
            kind
            ofType {
              name
              kind
            }
          }
        }
      }
      possibleTypes {
        name
      }
    }
  }
`;

// Fields that are safe to skip: Craft's structure/meta plumbing that either
// self-references (causing cycles), requires arguments we can't guess, or is
// rarely useful for content rendering.
const SKIP_FIELDS = new Set([
  "children",
  "descendants",
  "parent",
  "ancestors",
  "prev",
  "next",
  "localized",
  "revisionId",
  "revisionNotes",
  "draftId",
  "isDraft",
  "isRevision",
  "isUnpublishedDraft",
  "draftName",
  "draftNotes",
  "canonicalId",
  "canonicalUid",
  "_count",
  "srcset",
]);

function hasRequiredArgs(args: ArgRef[]): boolean {
  return args.some((a) => a.type.kind === "NON_NULL");
}

// Craft asset types (one per volume, e.g. "images_Asset") all share this
// field signature. Rather than walking every raw asset field (filename,
// volumeId, focalPoint, ...), select responsive transformed URLs instead.
const ASSET_FIELD_SIGNATURE = ["filename", "kind", "url"];

function isAssetType(fields: { name: string }[]): boolean {
  const names = new Set(fields.map((f) => f.name));
  return ASSET_FIELD_SIGNATURE.every((n) => names.has(n));
}

// TODO: switch back to per-width @transform aliases (url1..url7) once the
// Craft GraphQL schema has "Allow this schema to generate transforms"
// enabled — until then the directive doesn't exist and breaks the whole
// query. Plain `url` still returns the original asset URL.
const ASSET_SELECTION = `
  url
  width
  height
  title
`;

function unwrap(type: TypeRef): { name: string | null; isList: boolean } {
  let t: TypeRef | null = type;
  let isList = false;
  while (t) {
    if (t.kind === "LIST") isList = true;
    if (t.name) return { name: t.name, isList };
    t = t.ofType;
  }
  return { name: null, isList };
}

const typeCache = new Map<string, Promise<IntrospectedType["__type"]>>();

async function introspectType(typeName: string): Promise<IntrospectedType["__type"]> {
  if (!typeCache.has(typeName)) {
    typeCache.set(
      typeName,
      craftFetch<IntrospectedType>(TYPE_INTROSPECTION_QUERY, { name: typeName })
        .then((data) => data.__type)
        .catch((error) => {
          // Craft's GraphQL server throws a hard "unregistered type" error
          // instead of returning `{ __type: null }` for unknown type names.
          // That's the expected outcome when a section handle is wrong or
          // the schema/token isn't scoped to see it — treat it as "not found"
          // rather than blowing up the whole query build.
          if (error instanceof Error && /unregistered type/i.test(error.message)) {
            return null;
          }
          throw error;
        })
    );
  }
  return typeCache.get(typeName)!;
}

async function buildSelection(
  typeName: string,
  depth: number,
  visited: Set<string>
): Promise<string> {
  if (visited.has(typeName)) return "";

  const info = await introspectType(typeName);
  if (!info) return "";

  // Asset types are a fixed, shallow, terminal selection — resolve them
  // regardless of remaining depth budget, so images nested several levels
  // deep (e.g. inside Neo/Matrix blocks) don't silently get dropped once
  // the depth counter hits zero. Craft exposes assets via "AssetInterface"
  // directly (kind INTERFACE, not OBJECT) with filename/kind/url already on
  // the interface itself, so this must not be restricted to OBJECT kinds.
  if (isAssetType(info.fields ?? [])) {
    return ASSET_SELECTION;
  }

  if (depth <= 0) return "";

  if (info.kind === "UNION" || info.kind === "INTERFACE") {
    const possible = info.possibleTypes ?? [];
    const nextVisited = new Set(visited);
    nextVisited.add(typeName);
    const fragments = await Promise.all(
      possible.map(async (pt) => {
        const sub = await buildSelection(pt.name, depth - 1, nextVisited);
        return sub.trim() ? `... on ${pt.name} { ${sub} }` : "";
      })
    );
    return fragments.filter(Boolean).join("\n");
  }

  const fields = info.fields ?? [];
  const nextVisited = new Set(visited);
  nextVisited.add(typeName);

  const parts = await Promise.all(
    fields.map(async (field) => {
      if (SKIP_FIELDS.has(field.name)) return "";
      if (hasRequiredArgs(field.args)) return "";

      const { name: baseTypeName } = unwrap(field.type);
      if (!baseTypeName) return "";

      const baseInfo = await introspectType(baseTypeName);
      if (!baseInfo || baseInfo.kind === "SCALAR" || baseInfo.kind === "ENUM") {
        return field.name;
      }

      const sub = await buildSelection(baseTypeName, depth - 1, nextVisited);
      return sub.trim() ? `${field.name} { ${sub} }` : "";
    })
  );

  return parts.filter(Boolean).join("\n");
}

/**
 * Fetches every reachable field of a Craft entry via GraphQL introspection,
 * without hand-authoring a query for each block/field type. Useful for
 * exploring what content actually exists on an entry.
 */
export async function craftFetchEntryDeep(
  section: string,
  /**
   * Omit for Singles sections — they have exactly one entry, so filtering by
   * slug/uri is unnecessary and risks a mismatch (an entry's `slug` field and
   * its configured URI can differ, as they do here: slug "about" vs
   * site-settings URI "about-us"). Pass a slug only for Channel-type sections
   * that hold multiple entries.
   */
  slug?: string,
  { depth = 3 }: { depth?: number } = {}
): Promise<unknown> {
  // The concrete GraphQL type name is based on the entry's *type* handle
  // (e.g. "aboutUs3"), not the section handle (e.g. "aboutUs") — Craft lets
  // these differ. So we first look up the real typeHandle via the generic
  // EntryInterface fields, then build the type-specific selection from that.
  const probeQuery = slug
    ? /* GraphQL */ `
        query ProbeEntry($slug: [String]) {
          entries(section: "${section}", slug: $slug) {
            typeHandle
          }
        }
      `
    : /* GraphQL */ `
        query ProbeEntry {
          entries(section: "${section}") {
            typeHandle
          }
        }
      `;

  const probeData = await craftFetch<{ entries: { typeHandle: string }[] }>(
    probeQuery,
    slug ? { slug: [slug] } : undefined
  );
  const typeHandle = probeData.entries?.[0]?.typeHandle;
  if (!typeHandle) {
    throw new Error(
      `No entry found for section "${section}"${slug ? ` with slug "${slug}"` : ""} — check the section is exposed to this GraphQL token/schema.`
    );
  }

  const entryTypeName = `${typeHandle}_Entry`;
  const entryType = await introspectType(entryTypeName);
  if (!entryType) {
    throw new Error(
      `Craft GraphQL schema has no type "${entryTypeName}" for entry type "${typeHandle}" — its fields likely aren't exposed to this GraphQL token/schema yet.`
    );
  }

  const selection = await buildSelection(entryTypeName, depth, new Set());

  const query = slug
    ? /* GraphQL */ `
        query DeepEntry($slug: [String]) {
          entries(section: "${section}", slug: $slug) {
            ... on ${entryTypeName} {
              ${selection}
            }
          }
        }
      `
    : /* GraphQL */ `
        query DeepEntry {
          entries(section: "${section}") {
            ... on ${entryTypeName} {
              ${selection}
            }
          }
        }
      `;

  const data = await craftFetch<{ entries: unknown[] }>(
    query,
    slug ? { slug: [slug] } : undefined
  );
  return data.entries?.[0] ?? null;
}
