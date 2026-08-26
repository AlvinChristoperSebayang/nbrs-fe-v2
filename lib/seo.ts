import type { Metadata } from "next";

function resolveSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`.replace(/\/$/, "");
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`.replace(/\/$/, "");
  }
  return "https://nbrs-fe-v2.vercel.app";
}

export const SITE_URL = resolveSiteUrl();

export const ALLOW_INDEXING =
  process.env.NEXT_PUBLIC_ALLOW_INDEXING?.toLowerCase() === "true";

export const DEFAULT_SEO_DESCRIPTION =
  "NBRS is a multidisciplinary design practice uniting architecture, landscape, interior design, and heritage to create life-changing environments.";

export const DEFAULT_OG_IMAGE = {
  url: "/images/hero/seo-image.jpg",
  width: 1200,
  height: 630,
  alt: "NBRS Architecture",
  type: "image/jpeg",
};

type PageMetadataInput = {
  pathname: string;
  title?: string;
  /** Final editor-controlled title from Craft. It must not receive the root title template. */
  cmsTitle?: string | null;
  description?: string | null;
  image?: unknown;
  imageAlt?: string;
  type?: "website" | "article";
  noIndex?: boolean;
};

export function getRobotsMetadata(noIndex = false): Metadata["robots"] {
  const index = ALLOW_INDEXING && !noIndex;

  return {
    index,
    follow: index,
    googleBot: {
      index,
      follow: index,
    },
  };
}

export function toAbsoluteUrl(url: string): string {
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  return `${SITE_URL}${url.startsWith("/") ? "" : "/"}${url}`;
}

export function getImageUrl(image: unknown): string | null {
  if (typeof image === "string" && image.trim()) {
    return toAbsoluteUrl(image.trim());
  }
  if (!image || typeof image !== "object") return null;

  for (const key of ["url", "src", "desktop"] as const) {
    const value = (image as Record<string, unknown>)[key];
    if (typeof value === "string") return toAbsoluteUrl(value.trim());
  }

  return null;
}

function getImageMetadata(image: unknown, preferredAlt?: string) {
  const url = getImageUrl(image);
  if (!url) return null;

  const record = image && typeof image === "object"
    ? image as Record<string, unknown>
    : null;
  const width = record?.width;
  const height = record?.height;
  const assetTitle = record?.title;

  return {
    url,
    alt: preferredAlt
      || (typeof assetTitle === "string" && assetTitle.trim()
        ? assetTitle.trim()
        : "NBRS Architecture"),
    ...(typeof width === "number" && width > 0 ? { width } : {}),
    ...(typeof height === "number" && height > 0 ? { height } : {}),
  };
}

export function createPageMetadata({
  pathname,
  title,
  cmsTitle,
  description,
  image,
  imageAlt,
  type = "website",
  noIndex = false,
}: PageMetadataInput): Metadata {
  const resolvedCmsTitle = cmsTitle?.trim() || undefined;
  const resolvedTitle = resolvedCmsTitle || title?.trim();
  const socialTitle = resolvedCmsTitle
    || (resolvedTitle ? `${resolvedTitle} | NBRS` : undefined);
  const resolvedDescription = description || DEFAULT_SEO_DESCRIPTION;
  const imageMetadata = getImageMetadata(
    image,
    imageAlt || title || "NBRS Architecture"
  );
  const resolvedImage = imageMetadata
    ? [imageMetadata]
    : [{ ...DEFAULT_OG_IMAGE, url: toAbsoluteUrl(DEFAULT_OG_IMAGE.url) }];

  const fullCanonicalUrl = toAbsoluteUrl(pathname);

  return {
    // Craft SEO titles are already final editor-authored strings. Fallback labels
    // intentionally inherit the root "%s | NBRS" template.
    title: resolvedCmsTitle ? { absolute: resolvedCmsTitle } : resolvedTitle,
    description: resolvedDescription,
    alternates: {
      canonical: fullCanonicalUrl,
    },
    openGraph: {
      type,
      locale: "en_AU",
      url: fullCanonicalUrl,
      siteName: "NBRS Architecture",
      title: socialTitle,
      description: resolvedDescription,
      images: resolvedImage,
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: resolvedDescription,
      images: resolvedImage.map(({ url }) => url),
    },
    robots: getRobotsMetadata(noIndex),
  };
}
