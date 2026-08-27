import type {
  ImageSource,
  ResponsiveImage,
  ResponsiveImageDimensions,
} from "./types";
import { getImageDimensions } from "./static-image-dimensions";

export type RawResponsiveAsset = Partial<ResponsiveImage> & {
  url?: string;
  width?: number | null;
  height?: number | null;
};
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

function inferResponsiveDimensions(asset: RawResponsiveAsset): ResponsiveImageDimensions | undefined {
  const dimensions: ResponsiveImageDimensions = {};

  for (const breakpoint of ["mobile", "tablet", "desktop"] as const) {
    const source = asset[breakpoint];
    if (!source) continue;

    const dimension = getImageDimensions(source) ?? getAutoHeightTransformDimensions(source, asset);
    if (dimension) dimensions[breakpoint] = dimension;
  }

  return Object.keys(dimensions).length ? dimensions : undefined;
}

/**
 * Craft URLs such as `_1200xAUTO_*` retain the original aspect ratio. Their
 * generated height is not encoded in the URL, so derive it from the asset
 * metadata already returned by GraphQL.
 */
function getAutoHeightTransformDimensions(source: string, asset: RawResponsiveAsset) {
  if (!asset.width || !asset.height || asset.width <= 0 || asset.height <= 0) return undefined;

  try {
    const match = new URL(source).pathname.match(/_(\d+)xAUTO(?:_|$)/i);
    if (!match) return undefined;

    const width = Number(match[1]);
    return {
      width,
      height: Math.round((width * asset.height) / asset.width),
    };
  } catch {
    return undefined;
  }
}

/**
 * Keeps static-image fallbacks working while CMS assets expose three Craft
 * crops. Dimensions are inferred from explicit Craft transforms or the
 * original asset metadata, and callers can override them for art direction.
 */
export function toImageSource(
  asset?: RawResponsiveAsset | null,
): ImageSource | null;
export function toImageSource(
  asset: RawResponsiveAsset | null | undefined,
  dimensions: ResponsiveImageDimensions,
): ImageSource | null;
export function toImageSource(
  asset?: RawResponsiveAsset | null,
  dimensions?: ResponsiveImageDimensions,
): ImageSource | null {
  const desktop = asset?.desktop ?? asset?.url;
  if (!desktop) return null;

  if (asset?.mobile && asset.tablet) {
    const inferredDimensions = inferResponsiveDimensions(asset);
    const resolvedDimensions = inferredDimensions || dimensions
      ? { ...inferredDimensions, ...dimensions }
      : undefined;

    return {
      mobile: asset.mobile,
      tablet: asset.tablet,
      desktop,
      ...(resolvedDimensions ? { dimensions: resolvedDimensions } : {}),
    };
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
