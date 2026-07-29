import type { ImageSource, ResponsiveImage } from "./types";

export type RawResponsiveAsset = Partial<ResponsiveImage> & { url?: string };

/** Keeps static-image fallbacks working while CMS assets expose three Craft crops. */
export function toImageSource(asset?: RawResponsiveAsset | null): ImageSource | null {
  const desktop = asset?.desktop ?? asset?.url;
  if (!desktop) return null;

  if (asset?.mobile && asset.tablet) {
    return { mobile: asset.mobile, tablet: asset.tablet, desktop };
  }

  return desktop;
}
