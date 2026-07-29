import type { ImageSource } from "@/lib/types";

type ResponsiveImageProps = {
  src: ImageSource;
  alt: string;
  className?: string;
  priority?: boolean;
  onError?: () => void;
};

/** Renders CMS-provided Craft crops; static image paths continue to work as-is. */
export function ResponsiveImage({ src, alt, className, priority = false, onError }: ResponsiveImageProps) {
  const imageProps = {
    alt,
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
