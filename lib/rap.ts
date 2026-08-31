import { craftFetch } from "@/lib/craft";
import { toImageSource, toSeoImage, type SeoImage } from "@/lib/media";
import type { ImageSource } from "@/lib/types";

type CraftAsset = {
  url?: string;
  width?: number;
  height?: number;
  title?: string;
};

type CraftBlock = {
  text?: string | null;
  image?: CraftAsset[] | null;
};

type CraftCtaSection = {
  ctaSectionHeading?: string | null;
  ctaSectionDescription?: string | null;
  ctaSectionButtonLabel?: string | null;
  ctaSectionButtonUrl?: string | null;
  ctaSectionBackgroundImage?: CraftAsset[] | null;
};

type RapQueryData = {
  entries?: Array<{
    title?: string | null;
    postDate?: string | null;
    heroImage?: CraftAsset[] | null;
    artIssuuUrl?: string | null;
    rapPdfFile?: CraftAsset[] | null;
    rapAuthor?: string | null;
    rapEndorsedBy?: string | null;
    rapReadTime?: string | null;
    rapDownloadBackground?: CraftAsset[] | null;
    ctaSection?: CraftCtaSection | null;
    artContent?: CraftBlock[] | null;
    seoPageTitle?: string | null;
    seoMetaDescription?: string | null;
    seoImage?: CraftAsset[] | null;
  }>;
};

export type RapPageData = {
  title: string;
  publicationDate: string;
  author: string;
  endorsedBy: string;
  readTime: string;
  hero: ImageSource;
  artwork: ImageSource;
  bodyHtml: string;
  cta: {
    heading: string;
    description: string;
    buttonLabel: string;
    buttonUrl: string;
    background: ImageSource;
  };
  cmsSeoTitle: string | null;
  seoDescription: string;
  seoImage: SeoImage | null;
};

const FALLBACK_BODY = [
  "Place and Country are key design principles at NBRS. We support the cultural heritage of the land on which we design. We support Aboriginal and Torres Strait Islander peoples with initiatives that pay respect to Aboriginal culture. The newest initiative which has been endorsed by Reconciliation Australia is our own Reflect Reconciliation Action Plan (RAP).",
  "This plan is being spearheaded by the NBRS RAP working group; Convener Melanie Karaca, Andrew Duffin, Samantha Polkinghorne, Mengling Fu along with Olivia Ash and Saanya Parmar who will work through our RAP commitments.",
  "A special mention must go to Christopher Tobin who created our RAP’s artwork. The title of the artwork is Shared Waterways and connects deeply with our values and how we design collectively on Country.",
  "Chris is a Dharug man from Western Sydney who is a descendant of the original clans that belong to this Country and have lived in balance with the environment for millennia.",
  "The RAP artwork Shared Waterways envisages modern practices of settlement formed around Aboriginal values and understanding of Country. The artwork represents the aspirations of many Aboriginal and non-Aboriginal people who work for the health and wellbeing of Country. It also represents the hope for future developments to begin to listen to Country first and work around or within these principles to keep her healthy.",
  "The RAP is NBRS’s commitment to a reconciliation journey. NBRS recognises the important role our industry plays in shaping the built environment and influencing social and cultural outcomes. We aim to embed reconciliation and wellbeing of place and Country into our design processes.",
];

const FALLBACK_DATA: RapPageData = {
  title: "Reflect Reconciliation Action Plan",
  publicationDate: "2026",
  author: "RAP Working Group (Andrew Duffin, Samantha Polkinghorne, Melanie Karaca, Mengling Fu)",
  endorsedBy: "Reconciliation Australia",
  readTime: "5 mins",
  hero: "/images/rap/reflect-hero.jpg",
  artwork: "/images/rap/reflect-artwork.png",
  bodyHtml: FALLBACK_BODY.map((paragraph) => `<p>${paragraph}</p>`).join("\n"),
  cta: {
    heading: "Download full reflect RAP",
    description: "For insight into the implementation of each action",
    buttonLabel: "Download reflect RAP",
    buttonUrl: "https://issuu.com/nbrsarchitecture/docs/nbrs_reflect_rap",
    background: "/images/rap/reflect-download-background.jpg",
  },
  cmsSeoTitle: null,
  seoDescription: "NBRS Reflect Reconciliation Action Plan",
  seoImage: null,
};

const RAP_SINGLE_QUERY = /* GraphQL */ `
  query RapSinglePage {
    entries(section: "rap", limit: 1) {
      title
      postDate @formatDateTime(format: "Y")
      ... on rap_Entry {
        heroImage: pageHeroImage {
          url
          width
          height
          title
          mobile: url @transform(width: 768, mode: "fit", format: "webp", quality: 80, immediately: true)
          tablet: url @transform(width: 1440, mode: "fit", format: "webp", quality: 82, immediately: true)
          desktop: url @transform(width: 1920, mode: "fit", format: "webp", quality: 85, immediately: true)
        }
        rapAuthor
        rapEndorsedBy
        rapReadTime
        artIssuuUrl
        rapPdfFile { url }
        seoPageTitle
        seoMetaDescription
        seoImage { url width height title }
        ctaSection {
          ctaSectionHeading
          ctaSectionDescription
          ctaSectionButtonLabel
          ctaSectionButtonUrl
          ctaSectionBackgroundImage {
            url
            width
            height
            title
            mobile: url @transform(width: 768, height: 900, position: "top-left", mode: "crop", format: "webp", quality: 80, immediately: true)
            tablet: url @transform(width: 1440, mode: "fit", format: "webp", quality: 82, immediately: true)
            desktop: url @transform(width: 2400, mode: "fit", format: "webp", quality: 85, immediately: true)
          }
        }
        artContent {
          ... on text_Entry { text }
          ... on image_Entry {
            image {
              url
              width
              height
              title
              mobile: url @transform(width: 768, mode: "fit", format: "webp", quality: 80, immediately: true)
              tablet: url @transform(width: 1440, mode: "fit", format: "webp", quality: 82, immediately: true)
              desktop: url @transform(width: 1920, mode: "fit", format: "webp", quality: 85, immediately: true)
            }
          }
        }
      }
    }
  }
`;

const RAP_NEWS_QUERY = /* GraphQL */ `
  query RapLegacyNewsPage {
    entries(section: "news", slug: ["reflect-reconciliation-action-plan"], limit: 1) {
      title
      postDate @formatDateTime(format: "Y")
      ... on news_Entry {
        heroImage: artHdrHeroImage {
          url
          width
          height
          title
          mobile: url @transform(width: 768, mode: "fit", format: "webp", quality: 80, immediately: true)
          tablet: url @transform(width: 1440, mode: "fit", format: "webp", quality: 82, immediately: true)
          desktop: url @transform(width: 1920, mode: "fit", format: "webp", quality: 85, immediately: true)
        }
        rapAuthor
        rapEndorsedBy
        rapReadTime
        artIssuuUrl
        rapDownloadBackground {
          url
          width
          height
          title
          mobile: url @transform(width: 768, height: 900, position: "top-left", mode: "crop", format: "webp", quality: 80, immediately: true)
          tablet: url @transform(width: 1440, mode: "fit", format: "webp", quality: 82, immediately: true)
          desktop: url @transform(width: 2400, mode: "fit", format: "webp", quality: 85, immediately: true)
        }
        seoPageTitle
        seoMetaDescription
        seoImage { url width height title }
        ctaSection {
          ctaSectionHeading
          ctaSectionDescription
          ctaSectionButtonLabel
          ctaSectionButtonUrl
          ctaSectionBackgroundImage {
            url
            width
            height
            title
            mobile: url @transform(width: 768, height: 900, position: "top-left", mode: "crop", format: "webp", quality: 80, immediately: true)
            tablet: url @transform(width: 1440, mode: "fit", format: "webp", quality: 82, immediately: true)
            desktop: url @transform(width: 2400, mode: "fit", format: "webp", quality: 85, immediately: true)
          }
        }
        artContent {
          ... on text_Entry { text }
          ... on image_Entry { image { url width height title } }
        }
      }
    }
  }
`;

function firstAsset(assets?: CraftAsset[] | null): CraftAsset | null {
  return assets?.[0] ?? null;
}

function normalizeBody(blocks?: CraftBlock[] | null): string | null {
  const text = blocks?.find((block) => typeof block.text === "string" && block.text.trim())?.text;
  return text?.trim() || null;
}

async function getRapPageFrom(query: string): Promise<RapPageData> {
  try {
    const data = await craftFetch<RapQueryData>(query);
    const entry = data.entries?.[0];
    if (!entry) return FALLBACK_DATA;

    return {
      title: entry.title || FALLBACK_DATA.title,
      publicationDate: entry.postDate || FALLBACK_DATA.publicationDate,
      author: entry.rapAuthor || FALLBACK_DATA.author,
      endorsedBy: entry.rapEndorsedBy || FALLBACK_DATA.endorsedBy,
      readTime: entry.rapReadTime || FALLBACK_DATA.readTime,
      hero: toImageSource(firstAsset(entry.heroImage)) || FALLBACK_DATA.hero,
      artwork: toImageSource(firstAsset(entry.artContent?.find((block) => block.image?.length)?.image)) || FALLBACK_DATA.artwork,
      bodyHtml: normalizeBody(entry.artContent) || FALLBACK_DATA.bodyHtml,
      cta: {
        heading: entry.ctaSection?.ctaSectionHeading || FALLBACK_DATA.cta.heading,
        description: entry.ctaSection?.ctaSectionDescription || FALLBACK_DATA.cta.description,
        buttonLabel: entry.ctaSection?.ctaSectionButtonLabel || FALLBACK_DATA.cta.buttonLabel,
        buttonUrl: firstAsset(entry.rapPdfFile)?.url || entry.artIssuuUrl || entry.ctaSection?.ctaSectionButtonUrl || FALLBACK_DATA.cta.buttonUrl,
        background: toImageSource(firstAsset(entry.ctaSection?.ctaSectionBackgroundImage))
          || toImageSource(firstAsset(entry.rapDownloadBackground))
          || FALLBACK_DATA.cta.background,
      },
      cmsSeoTitle: entry.seoPageTitle?.trim() || null,
      seoDescription: entry.seoMetaDescription?.trim() || FALLBACK_DATA.seoDescription,
      seoImage: toSeoImage(firstAsset(entry.seoImage)),
    };
  } catch {
    return FALLBACK_DATA;
  }
}

/** Dedicated RAP Single used by the canonical /rap route. */
export function getRapPage(): Promise<RapPageData> {
  return getRapPageFrom(RAP_SINGLE_QUERY);
}

/** Legacy News source retained for /news/reflect-reconciliation-action-plan. */
export function getRapNewsPage(): Promise<RapPageData> {
  return getRapPageFrom(RAP_NEWS_QUERY);
}
