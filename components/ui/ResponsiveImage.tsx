import type { ImageSource } from "@/lib/types";
import { getImageDimensions } from "@/lib/static-image-dimensions";

type ResponsiveImageProps = {
  src: ImageSource;
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
  const sourceDimensions = typeof src === "string"
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

  if (typeof src === "string") return <img src={src} alt={computedAlt} {...imageProps} />;

  return (
    <picture>
      <source media="(max-width: 767px)" srcSet={src.mobile} />
      <source media="(max-width: 1199px)" srcSet={src.tablet} />
      <img src={src.desktop} alt={computedAlt} {...imageProps} />
    </picture>
  );
}
