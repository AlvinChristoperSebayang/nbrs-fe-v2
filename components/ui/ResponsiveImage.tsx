import type { ImageSource } from "@/lib/types";

type ResponsiveImageProps = {
  src: ImageSource;
  alt?: string;
  title?: string;
  className?: string;
  priority?: boolean;
  onError?: () => void;
};

/** Renders CMS-provided Craft crops; static image paths continue to work as-is with SEO alt & title. */
export function ResponsiveImage({
  src,
  alt,
  title,
  className,
  priority = false,
  onError,
}: ResponsiveImageProps) {
  const computedAlt = (alt && alt.trim()) ? alt.trim() : (title && title.trim()) ? title.trim() : "NBRS Architecture";
  const computedTitle = (title && title.trim()) ? title.trim() : computedAlt;

  const imageProps = {
    alt: computedAlt,
    title: computedTitle,
    className,
    loading: priority ? ("eager" as const) : ("lazy" as const),
    fetchPriority: priority ? ("high" as const) : undefined,
    onError,
  };

  if (typeof src === "string") return <img src={src} {...imageProps} />;

  return (
    <picture>
      <source media="(max-width: 767px)" srcSet={src.mobile} />
      <source media="(max-width: 1199px)" srcSet={src.tablet} />
      <img src={src.desktop} {...imageProps} />
    </picture>
  );
}
