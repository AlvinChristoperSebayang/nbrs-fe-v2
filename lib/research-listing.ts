import { craftFetch } from "./craft";
import { toImageSource, toSeoImage, type RawSeoAsset, type SeoImage } from "./media";
import type { ImageSource } from "./types";

export type ResearchCategory = {
  id: string;
  title: string;
  slug: string;
  accentColor: string | null;
};

export type ResearchListItem = {
  id: string;
  slug: string;
  title: string;
  thumbnailUrl: ImageSource | null;
  sectors: ResearchCategory[];
  practices: ResearchCategory[];
};

export type SecondaryResearchItem = {
  id: string;
  slug: string;
  title: string;
};

export type ResearchListingResult = {
  pageHeading: string | null;
  pageSubheading: string | null;
  researchGridHeading: string | null;
  researchGridDescription: string | null;
  pageHeroImageUrl: ImageSource | null;
  cmsSeoTitle: string | null;
  seoDescription: string | null;
  seoImage: SeoImage | null;
  sectors: ResearchCategory[];
  practices: ResearchCategory[];
  articles: ResearchListItem[];
  secondaryResearch: SecondaryResearchItem[];
};

type RawAsset = { url?: string; mobile?: string; tablet?: string; desktop?: string; width?: number | null; height?: number | null; title?: string | null };
type RawCategory = ResearchCategory;

type ResearchListingResponse = {
  page: Array<{
    pageHeading: string | null;
    pageSubheading: string | null;
    researchGridHeading: string | null;
    researchGridDescription: string | null;
    pageHeroImage: RawAsset[];
    seoPageTitle: string | null;
    seoMetaDescription: string | null;
    seoImage: RawSeoAsset[];
    primaryResearch: RawResearch[];
    secondaryResearch: RawResearch[];
  }>;
  sectors: RawCategory[];
  practices: RawCategory[];
};

type RawResearch = {
  id: string;
  slug: string;
  title: string;
  artHdrHeading: string | null;
  thumbnail: RawAsset[];
  catSector: RawCategory[];
  catDiscipline: RawCategory[];
};

const RESEARCH_LISTING_QUERY = /* GraphQL */ `
  query ResearchListing {
    page: entries(section: "latestResearch") {
      ... on latestResearch_Entry {
        pageHeading
        pageSubheading
        researchGridHeading
        researchGridDescription
        seoPageTitle
        seoMetaDescription
        pageHeroImage {
          url
          width
          height
          title
          mobile: url @transform(width: 768, immediately: true)
          tablet: url @transform(width: 1440, immediately: true)
          desktop: url @transform(width: 1920, immediately: true)
        }
        seoImage {
          url
          width
          height
          title
          mobile: url @transform(width: 768, immediately: true)
          tablet: url @transform(width: 1440, immediately: true)
          desktop: url @transform(width: 1920, immediately: true)
        }
        primaryResearch {
          ... on research_Entry {
            id
            slug
            title
            artHdrHeading
            thumbnail {
              url
              mobile: url @transform(width: 600, immediately: true)
              tablet: url @transform(width: 900, immediately: true)
              desktop: url @transform(width: 1200, immediately: true)
            }
            catDiscipline {
              ... on discipline_Category { id title slug accentColor }
            }
            catSector {
              ... on sector_Category { id title slug accentColor }
            }
          }
        }
        secondaryResearch {
          ... on research_Entry {
            id
            slug
            title
            artHdrHeading
          }
        }
      }
    }
    sectors: categories(group: "sector") {
      ... on sector_Category { id title slug accentColor }
    }
    practices: categories(group: "discipline") {
      ... on discipline_Category { id title slug accentColor }
    }
  }
`;

export async function getResearchListing(): Promise<ResearchListingResult> {
  const data = await craftFetch<ResearchListingResponse>(RESEARCH_LISTING_QUERY);
  const page = data.page?.[0];
  const articles = (page?.primaryResearch ?? []).map((article) => ({
    id: article.id,
    slug: article.slug,
    title: article.artHdrHeading ?? article.title ?? article.slug,
    thumbnailUrl: toImageSource(article.thumbnail?.[0]),
    sectors: article.catSector ?? [],
    practices: article.catDiscipline ?? [],
  }));

  return {
    pageHeading: page?.pageHeading ?? null,
    pageSubheading: page?.pageSubheading ?? null,
    researchGridHeading: page?.researchGridHeading ?? null,
    researchGridDescription: page?.researchGridDescription ?? null,
    pageHeroImageUrl: toImageSource(page?.pageHeroImage?.[0]) ?? toSeoImage(page?.seoImage?.[0])?.url ?? null,
    cmsSeoTitle: page?.seoPageTitle?.trim() || null,
    seoDescription: page?.seoMetaDescription?.trim() || page?.pageSubheading?.trim() || null,
    seoImage: toSeoImage(page?.seoImage?.[0]) || toSeoImage(page?.pageHeroImage?.[0]),
    sectors: data.sectors ?? [],
    // Heritage is currently treated as a Sector in the public filter UI.
    // Keep the CMS relation on each research item intact; hide only the
    // legacy Practice option until the taxonomy migration is complete.
    practices: (data.practices ?? []).filter(
      (practice) =>
        practice.slug !== "heritage" &&
        practice.title?.toLowerCase() !== "heritage",
    ),
    articles,
    secondaryResearch: (page?.secondaryResearch ?? []).map((article) => ({
      id: article.id,
      slug: article.slug,
      title: article.title ?? article.artHdrHeading ?? article.slug,
    })),
  };
}
