const CRAFT_GRAPHQL_URL =
  process.env.CRAFT_GRAPHQL_URL ??
  "https://phpstack-1082258-6573734.cloudwaysapps.com/api/";

type GraphQLResponse = {
  data?: unknown;
  errors?: Array<{ message?: unknown }>;
};

type CraftFetchOptions = {
  cache?: RequestCache;
  revalidate?: number;
};

function isGraphQLResponse(value: unknown): value is GraphQLResponse {
  return typeof value === "object" && value !== null;
}

function normalizeLocalAssetUrls(value: unknown): unknown {
  if (process.env.NODE_ENV !== "development") return value;

  if (typeof value === "string") {
    return value.replace(
      /^https:\/\/nbrs-staging\.test\/media\//,
      "http://nbrs-staging.test/media/"
    );
  }

  if (Array.isArray(value)) return value.map(normalizeLocalAssetUrls);

  if (typeof value === "object" && value !== null) {
    return Object.fromEntries(
      Object.entries(value).map(([key, nestedValue]) => [
        key,
        normalizeLocalAssetUrls(nestedValue),
      ])
    );
  }

  return value;
}

export async function craftFetch<T>(
  query: string,
  variables?: Record<string, unknown>,
  options?: CraftFetchOptions
): Promise<T> {
  const res = await fetch(CRAFT_GRAPHQL_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ query, variables }),
    cache: options?.cache,
    next: options?.cache === "no-store" ? undefined : { revalidate: options?.revalidate ?? 60 },
  });

  if (!res.ok) {
    throw new Error(`Craft GraphQL request failed with status ${res.status}`);
  }

  const body = await res.text();
  let json: unknown;
  try {
    json = JSON.parse(body);
  } catch {
    throw new Error(`Craft GraphQL returned non-JSON response`);
  }

  if (!isGraphQLResponse(json)) {
    throw new Error("Craft GraphQL request returned an invalid JSON response.");
  }

  if (json.errors) {
    throw new Error(
      json.errors
        .map((error) => (typeof error.message === "string" ? error.message : "Unknown GraphQL error"))
        .join("\n")
    );
  }

  if (!json.data) {
    throw new Error("Craft GraphQL request returned no data");
  }

  return normalizeLocalAssetUrls(json.data) as T;
}
