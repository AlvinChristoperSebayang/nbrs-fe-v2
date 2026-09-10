export type CraftPreviewTokens = {
  token: string | null;
  previewToken: string | null;
};

type SearchParamValue = string | string[] | undefined;
type SearchParamRecord = Record<string, SearchParamValue>;

function readParam(searchParams: SearchParamRecord | undefined, key: string): string | null {
  const value = searchParams?.[key];
  if (Array.isArray(value)) return value[0] ?? null;
  return value ?? null;
}

export function craftPreviewFromSearchParams(
  searchParams?: SearchParamRecord
): CraftPreviewTokens {
  return {
    token: readParam(searchParams, "token"),
    previewToken:
      readParam(searchParams, "x-craft-preview") ??
      readParam(searchParams, "x-craft-live-preview"),
  };
}
