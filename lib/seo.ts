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
  url: "/images/hero/about-hero.png",
  width: 1440,
  height: 910,
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

function getImageUrl(image: unknown): string | null {
  if (typeof image === "string") return image;
  if (!image || typeof image !== "object") return null;

  for (const key of ["url", "src"] as const) {
    const value = (image as Record<string, unknown>)[key];
    if (typeof value === "string") return value;
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
    ? [{ url: imageUrl, alt: imageAlt || title || "NBRS Architecture" }]
    : [DEFAULT_OG_IMAGE];

  return {
    title,
    description: resolvedDescription,
    alternates: {
      canonical: pathname,
    },
    openGraph: {
      type,
      locale: "en_AU",
      url: pathname,
      siteName: "NBRS Architecture",
      title,
      description: resolvedDescription,
      images: resolvedImage,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: resolvedDescription,
      images: resolvedImage.map(({ url }) => url),
    },
    robots: getRobotsMetadata(noIndex),
  };
}
