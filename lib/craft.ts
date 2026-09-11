import { cache } from "react";

function resolveCraftGraphqlUrl() {
  const configured =
    process.env.CRAFT_GRAPHQL_URL ?? "https://new.cms.nbrs.com.au/api/";

  // Valet/nginx 301 http → https. fetch() follows that redirect and drops the
  // POST body, so Craft returns "No GraphQL query was supplied".
  try {
    const url = new URL(configured);
    if (url.protocol === "http:" && url.hostname.endsWith(".test")) {
      url.protocol = "https:";
      return url.toString();
    }
  } catch {
    return configured;
  }

  return configured;
}

const CRAFT_GRAPHQL_URL = resolveCraftGraphqlUrl();

if (
  process.env.NODE_ENV === "development" ||
  CRAFT_GRAPHQL_URL.includes(".test") ||
  CRAFT_GRAPHQL_URL.includes("localhost") ||
  CRAFT_GRAPHQL_URL.includes("127.0.0.1")
) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}

type GraphQLResponse = {
  data?: unknown;
  errors?: Array<{ message?: unknown }>;
};

type CraftFetchOptions = {
  cache?: RequestCache;
  revalidate?: number;
  tags?: string[];
  signal?: AbortSignal;
  /** Craft preview/share tokens from the page URL (`token`, `x-craft-preview`). */
  previewTokens?: {
    token?: string | null;
    previewToken?: string | null;
  };
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

function getPreviewRequestHeaders(
  previewTokens?: CraftFetchOptions["previewTokens"]
): Record<string, string> {
  const headers: Record<string, string> = {};
  if (previewTokens?.token) {
    headers["X-Craft-Token"] = previewTokens.token;
  }
  if (previewTokens?.previewToken) {
    headers["X-Craft-Preview-Token"] = previewTokens.previewToken;
  }
  return headers;
}

const memoizedFetch = cache(
  async (
    url: string,
    bodyString: string,
    bypassCache: boolean,
    revalidate: number,
    tagsString: string,
    previewHeadersJson: string
  ): Promise<string> => {
    const previewHeaders = previewHeadersJson
      ? (JSON.parse(previewHeadersJson) as Record<string, string>)
      : {};

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...previewHeaders,
      },
      body: bodyString,
      cache: bypassCache ? "no-store" : "force-cache",
      ...(bypassCache
        ? {}
        : {
            next: {
              revalidate,
              tags: tagsString ? tagsString.split(",") : ["craft"],
            },
          }),
    });

    if (!res.ok) {
      throw new Error(`Craft GraphQL request failed with status ${res.status}`);
    }

    return res.text();
  }
);

export async function craftFetch<T>(
  query: string,
  variables?: Record<string, unknown>,
  options?: CraftFetchOptions
): Promise<T> {
  const isDev = process.env.NODE_ENV === "development";
  const cacheMode = process.env.CMS_CACHE_MODE ?? (isDev ? "no-store" : "revalidate");
  const previewHeaders = getPreviewRequestHeaders(options?.previewTokens);
  const hasPreview = Object.keys(previewHeaders).length > 0;
  const bypassCache =
    isDev ||
    hasPreview ||
    cacheMode === "no-store" ||
    options?.cache === "no-store";
  const revalidate = options?.revalidate ?? 60;
  const tagsString = (options?.tags ?? ["craft"]).join(",");
  const bodyString = JSON.stringify({ query, variables });

  const body = await memoizedFetch(
    CRAFT_GRAPHQL_URL,
    bodyString,
    bypassCache,
    revalidate,
    tagsString,
    JSON.stringify(previewHeaders)
  );

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
