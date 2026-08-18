import type { Metadata } from "next";

const FALLBACK_SITE_URL = "https://nbrs.com.au";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || FALLBACK_SITE_URL
).replace(/\/$/, "");

export const ALLOW_INDEXING =
  process.env.NEXT_PUBLIC_ALLOW_INDEXING?.toLowerCase() !== "false";

export const DEFAULT_SEO_DESCRIPTION =
  "NBRS is a multidisciplinary design practice uniting architecture, landscape, interior design, and heritage to create life-changing environments.";

export const DEFAULT_OG_IMAGE = {
  url: `${SITE_URL}/images/hero/about-hero.png`,
  width: 1200,
  height: 630,
  alt: "NBRS Architecture",
};

type PageMetadataInput = {
  pathname: string;
  title?: string;
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

  const candidate = image as Record<string, unknown>;

  // Prefer desktop crop (landscape aspect ratio optimal for 1200x630 OG preview)
  for (const key of ["desktop", "url", "src", "tablet", "mobile"] as const) {
    const value = candidate[key];
    if (typeof value === "string" && value.trim()) {
      return toAbsoluteUrl(value.trim());
    }
  }

  // Nested image object
  if (candidate.image && typeof candidate.image === "object") {
    return getImageUrl(candidate.image);
  }

  return null;
}

export function createPageMetadata({
  pathname,
  title,
  description,
  image,
  imageAlt,
  type = "website",
  noIndex = false,
}: PageMetadataInput): Metadata {
  const resolvedDescription = description || DEFAULT_SEO_DESCRIPTION;
  const imageUrl = getImageUrl(image);
  const resolvedImage = imageUrl
    ? [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: imageAlt || title || "NBRS Architecture",
        },
      ]
    : [DEFAULT_OG_IMAGE];

  const fullCanonicalUrl = toAbsoluteUrl(pathname);
  const formattedTitle = title ? `${title} | NBRS` : "NBRS Architecture | Multidisciplinary Design";

  return {
    title,
    description: resolvedDescription,
    alternates: {
      canonical: fullCanonicalUrl,
    },
    openGraph: {
      type,
      locale: "en_AU",
      url: fullCanonicalUrl,
      siteName: "NBRS Architecture",
      title: formattedTitle,
      description: resolvedDescription,
      images: resolvedImage,
    },
    twitter: {
      card: "summary_large_image",
      title: formattedTitle,
      description: resolvedDescription,
      images: resolvedImage.map(({ url }) => url),
    },
    robots: getRobotsMetadata(noIndex),
  };
}
