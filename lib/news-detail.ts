import { cache } from "react";
import { craftFetch } from "./craft";
import { toImageSource } from "./media";
import type { CtaContent, ImageSource, ResponsiveImage } from "./types";

type RawAsset = Partial<ResponsiveImage> & {
  url?: string;
  width: number | null;
  height: number | null;
  title: string | null;
};

type RawCategory = {
  title: string;
  slug: string;
};

type RawCta = {
  ctaSectionHeading: string | null;
  ctaSectionDescription: string | null;
  ctaSectionButtonLabel: string | null;
  ctaSectionButtonUrl: string | null;
  ctaSectionBackgroundImage: RawAsset[];
};

type RawContentBlock = {
  __typename: "text_Entry" | "image_Entry" | "gallery_Entry" | "quote_Entry" | "embedcode_Entry";
  text?: string | null;
  image?: RawAsset[];
  gallery?: RawAsset[];
  quote?: string | null;
  citation?: string | null;
  embedCode?: string | null;
};

type NewsDetailResponse = {
  entries: Array<{
    title: string;
    slug: string;
    dateCreated: string | null;
    seoPageTitle: string | null;
    seoMetaDescription: string | null;
    seoImage: RawAsset[];
    artHdrHeading: string | null;
    artHdrSubheading: string | null;
    thumbnail: RawAsset[];
    artHdrHeroImage: RawAsset[];
    newsType: RawCategory[];
    catDiscipline: RawCategory[];
    ctaSection: RawCta | null;
    artContent: RawContentBlock[];
  }>;
};

export type NewsContentBlock =
  | { type: "text"; html: string }
  | { type: "image"; image: ImageSource }
  | { type: "gallery"; images: ImageSource[] }
  | { type: "quote"; quote: string; citation: string | null }
  | { type: "embed"; html: string };

export type NewsDetail = {
  slug: string;
  title: string;
  date: string | null;
  category: string | null;
  hero: ImageSource | null;
  description: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
  seoImage: RawAsset | null;
  content: NewsContentBlock[];
  cta: CtaContent;
};

const DEFAULT_CTA: CtaContent = {
  image: "/images/contact-bg.png",
  title: "GET IN TOUCH",
  buttonText: "CONTACT US",
  buttonHref: "/contact",
};

const NEWS_DETAIL_QUERY = /* GraphQL */ `
  query NewsDetail($slug: [String]!) {
    entries(section: "news", slug: $slug, limit: 1) {
      title
      slug
      dateCreated @formatDateTime(format: "jS F Y")
      ... on news_Entry {
        seoPageTitle
        seoMetaDescription
        seoImage { url width height title }
        artHdrHeading
        artHdrSubheading
        thumbnail {
          url
          mobile: url @transform(width: 768, mode: "fit", format: "webp", quality: 80, immediately: true)
          tablet: url @transform(width: 1440, mode: "fit", format: "webp", quality: 82, immediately: true)
          desktop: url @transform(width: 1920, mode: "fit", format: "webp", quality: 85, immediately: true)
          width
          height
          title
        }
        artHdrHeroImage {
          url
          mobile: url @transform(width: 768, mode: "fit", format: "webp", quality: 80, immediately: true)
          tablet: url @transform(width: 1440, mode: "fit", format: "webp", quality: 82, immediately: true)
          desktop: url @transform(width: 1920, mode: "fit", format: "webp", quality: 85, immediately: true)
          width
          height
          title
        }
        newsType {
          ... on newsType_Category { title slug }
        }
        catDiscipline {
          ... on discipline_Category { title slug }
        }
        ctaSection {
          ctaSectionHeading
          ctaSectionDescription
          ctaSectionButtonLabel
          ctaSectionButtonUrl
          ctaSectionBackgroundImage {
            url
            mobile: url @transform(width: 768, mode: "fit", format: "webp", quality: 80, immediately: true)
            tablet: url @transform(width: 1440, mode: "fit", format: "webp", quality: 82, immediately: true)
            desktop: url @transform(width: 1920, mode: "fit", format: "webp", quality: 85, immediately: true)
            width
            height
            title
          }
        }
        artContent {
          __typename
          ... on text_Entry { text }
          ... on image_Entry {
            image {
              url
              mobile: url @transform(width: 768, mode: "fit", format: "webp", quality: 80, immediately: true)
              tablet: url @transform(width: 1440, mode: "fit", format: "webp", quality: 82, immediately: true)
              desktop: url @transform(width: 1920, mode: "fit", format: "webp", quality: 85, immediately: true)
              width
              height
              title
            }
          }
          ... on gallery_Entry {
            gallery {
              url
              mobile: url @transform(width: 768, mode: "fit", format: "webp", quality: 80, immediately: true)
              tablet: url @transform(width: 1440, mode: "fit", format: "webp", quality: 82, immediately: true)
              desktop: url @transform(width: 1920, mode: "fit", format: "webp", quality: 85, immediately: true)
              width
              height
              title
            }
          }
          ... on quote_Entry { quote citation }
          ... on embedcode_Entry { embedCode }
        }
      }
    }
  }
`;

function toContentBlocks(blocks: RawContentBlock[]): NewsContentBlock[] {
  return blocks.flatMap((block): NewsContentBlock[] => {
    if (block.__typename === "text_Entry" && block.text?.trim()) {
      return [{ type: "text", html: block.text }];
    }

    if (block.__typename === "image_Entry") {
      const image = toImageSource(block.image?.[0]);
      return image ? [{ type: "image", image }] : [];
    }

    if (block.__typename === "gallery_Entry") {
      const images = (block.gallery ?? []).flatMap((asset) => {
        const image = toImageSource(asset);
        return image ? [image] : [];
      });
      return images.length > 0 ? [{ type: "gallery", images }] : [];
    }

    if (block.__typename === "quote_Entry" && block.quote?.trim()) {
      return [{ type: "quote", quote: block.quote, citation: block.citation ?? null }];
    }

    if (block.__typename === "embedcode_Entry" && block.embedCode?.trim()) {
      return [{ type: "embed", html: block.embedCode }];
    }

    return [];
  });
}

function toCta(cta: RawCta | null): CtaContent {
  return {
    image: toImageSource(cta?.ctaSectionBackgroundImage?.[0]) ?? DEFAULT_CTA.image,
    title: cta?.ctaSectionHeading ?? DEFAULT_CTA.title,
    description: cta?.ctaSectionDescription ?? undefined,
    buttonText: cta?.ctaSectionButtonLabel ?? DEFAULT_CTA.buttonText,
    buttonHref: cta?.ctaSectionButtonUrl ?? DEFAULT_CTA.buttonHref,
  };
}

export const getNewsDetail = cache(async (slug: string): Promise<NewsDetail | null> => {
  const data = await craftFetch<NewsDetailResponse>(NEWS_DETAIL_QUERY, { slug: [slug] });
  const entry = data.entries?.[0];
  if (!entry) return null;

  return {
    slug: entry.slug,
    title: entry.artHdrHeading ?? entry.title,
    date: entry.dateCreated,
    category: entry.catDiscipline?.[0]?.title ?? entry.newsType?.[0]?.title ?? null,
    hero: toImageSource(entry.artHdrHeroImage?.[0]) ?? toImageSource(entry.thumbnail?.[0]),
    description: entry.artHdrSubheading ?? null,
    seoTitle: entry.seoPageTitle,
    seoDescription: entry.seoMetaDescription?.trim() || entry.artHdrSubheading?.trim() || null,
    seoImage: entry.seoImage?.[0] ?? entry.artHdrHeroImage?.[0] ?? entry.thumbnail?.[0] ?? null,
    content: toContentBlocks(entry.artContent ?? []),
    cta: toCta(entry.ctaSection),
  };
});
