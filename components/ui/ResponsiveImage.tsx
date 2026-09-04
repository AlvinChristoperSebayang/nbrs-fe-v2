import type { ImageSource } from "@/lib/types";
import { getImageDimensions } from "@/lib/static-image-dimensions";

type ResponsiveImageProps = {
  src: ImageSource;
  /** Optional art-directed source used at the GridEffect desktop breakpoint. */
  desktopSrc?: ImageSource;
  alt?: string;
  title?: string;
  className?: string;
  priority?: boolean;
  /** Fallback intrinsic dimensions, used for static-image paths. */
  width?: number;
  height?: number;
  onError?: () => void;
  onLoad?: React.ReactEventHandler<HTMLImageElement>;
};

/** Renders CMS-provided Craft crops; static image paths continue to work as-is with SEO alt & title. */
export function ResponsiveImage({
  src,
  desktopSrc,
  alt,
  title,
  className,
  priority = false,
  width,
  height,
  onError,
  onLoad,
}: ResponsiveImageProps) {
  const computedAlt = (alt && alt.trim()) ? alt.trim() : (title && title.trim()) ? title.trim() : "NBRS Architecture";
  const computedTitle = (title && title.trim()) ? title.trim() : computedAlt;
  const sourceDimensions = desktopSrc
    ? typeof desktopSrc === "string"
      ? getImageDimensions(desktopSrc)
      : desktopSrc.dimensions?.desktop ?? getImageDimensions(desktopSrc.desktop)
    : typeof src === "string"
      ? getImageDimensions(src)
      : src.dimensions?.desktop ?? getImageDimensions(src.desktop);
  const intrinsicWidth = width ?? sourceDimensions?.width;
  const intrinsicHeight = height ?? sourceDimensions?.height;

  const imageProps = {
    title: computedTitle,
    className,
    loading: priority ? ("eager" as const) : ("lazy" as const),
    fetchPriority: priority ? ("high" as const) : undefined,
    ...(intrinsicWidth && intrinsicHeight
      ? { width: intrinsicWidth, height: intrinsicHeight }
      : {}),
    onError,
    onLoad,
  };

  const desktopSrcSet = desktopSrc
    ? typeof desktopSrc === "string"
      ? desktopSrc
      : desktopSrc.desktop
    : null;

  if (typeof src === "string") {
    if (!desktopSrcSet) return <img src={src} alt={computedAlt} {...imageProps} />;

    return (
      <picture>
        <source media="(min-width: 1024px)" srcSet={desktopSrcSet} />
        <img src={src} alt={computedAlt} {...imageProps} />
      </picture>
    );
  }

  return (
    <picture>
      {desktopSrcSet && <source media="(min-width: 1024px)" srcSet={desktopSrcSet} />}
      <source media="(max-width: 767px)" srcSet={src.mobile} />
      <source media="(max-width: 1199px)" srcSet={src.tablet} />
      <img src={src.desktop} alt={computedAlt} {...imageProps} />
    </picture>
  );
}
