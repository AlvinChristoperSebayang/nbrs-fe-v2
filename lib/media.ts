import type { ImageSource, ResponsiveImage } from "./types";

export type RawResponsiveAsset = Partial<ResponsiveImage> & { url?: string };
export type RawSeoAsset = {
  url?: string | null;
  width?: number | null;
  height?: number | null;
  title?: string | null;
};
export type SeoImage = {
  url: string;
  width?: number;
  height?: number;
  title?: string;
};

/** Keeps static-image fallbacks working while CMS assets expose three Craft crops. */
export function toImageSource(asset?: RawResponsiveAsset | null): ImageSource | null {
  const desktop = asset?.desktop ?? asset?.url;
  if (!desktop) return null;

  if (asset?.mobile && asset.tablet) {
    return { mobile: asset.mobile, tablet: asset.tablet, desktop };
  }

  return desktop;
}

/** Preserves the original Craft asset metadata used by Open Graph/Twitter. */
export function toSeoImage(asset?: RawSeoAsset | null): SeoImage | null {
  const url = asset?.url?.trim();
  if (!asset || !url) return null;
  const record = asset;

  return {
    url,
    ...(typeof record.width === "number" && record.width > 0 ? { width: record.width } : {}),
    ...(typeof record.height === "number" && record.height > 0 ? { height: record.height } : {}),
    ...(record.title?.trim() ? { title: record.title.trim() } : {}),
  };
}
