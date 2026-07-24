const CRAFT_GRAPHQL_URL =
  process.env.CRAFT_GRAPHQL_URL ??
  "https://phpstack-1082258-6573734.cloudwaysapps.com/api";

export async function craftFetch<T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  const res = await fetch(CRAFT_GRAPHQL_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
  });

  const json = await res.json();
  console.log(json)
  if (json.errors) {
    throw new Error(
      json.errors.map((error: { message: string }) => error.message).join("\n")
    );
  }

  return json.data as T;
}
