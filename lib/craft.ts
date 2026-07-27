const CRAFT_GRAPHQL_URL =
  process.env.CRAFT_GRAPHQL_URL ??
  "https://phpstack-1082258-6573734.cloudwaysapps.com/api/";

export async function craftFetch<T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  const res = await fetch(CRAFT_GRAPHQL_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
  });

  const body = await res.text();
  let json: any;
  try {
    json = JSON.parse(body);
  } catch {
    throw new Error(
      `Craft GraphQL request failed (${res.status} ${res.statusText}): ${body.slice(0, 300)}`
    );
  }

  if (json.errors) {
    throw new Error(
      json.errors.map((error: { message: string }) => error.message).join("\n")
    );
  }

  if (!json.data) {
    throw new Error(
      `Craft GraphQL request returned no data: ${JSON.stringify(json).slice(0, 300)}`
    );
  }

  return json.data as T;
}
