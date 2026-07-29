import { craftFetch } from "./craft";
import { toImageSource } from "./media";
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

export type ResearchListingResult = {
  pageHeading: string | null;
  pageSubheading: string | null;
  pageHeroImageUrl: ImageSource | null;
  sectors: ResearchCategory[];
  practices: ResearchCategory[];
  articles: ResearchListItem[];
};

type RawAsset = { mobile?: string; tablet?: string; desktop?: string };
type RawCategory = ResearchCategory;

type ResearchListingResponse = {
  page: Array<{
    pageHeading: string | null;
    pageSubheading: string | null;
    seoImage: RawAsset[];
  }>;
  sectors: RawCategory[];
  practices: RawCategory[];
  articles: Array<{
    id: string;
    slug: string;
    artHdrHeading: string | null;
    thumbnail: RawAsset[];
    catSector: RawCategory[];
    catDiscipline: RawCategory[];
  }>;
};

const RESEARCH_LISTING_QUERY = /* GraphQL */ `
  query ResearchListing {
    page: entries(section: "latestResearch") {
      ... on latestResearch_Entry {
        pageHeading
        pageSubheading
        seoImage { mobile: url @transform(width: 600, height: 800, mode: "crop", format: "webp", quality: 80, immediately: true) tablet: url @transform(width: 1440, height: 1000, mode: "crop", format: "webp", quality: 82, immediately: true) desktop: url @transform(width: 2400, height: 1200, mode: "crop", format: "webp", quality: 85, immediately: true) }
      }
    }
    sectors: categories(group: "sector") {
      ... on sector_Category { id title slug accentColor }
    }
    practices: categories(group: "discipline") {
      ... on discipline_Category { id title slug accentColor }
    }
    articles: entries(section: "research", orderBy: "postDate DESC") {
      ... on research_Entry {
        id
        slug
        artHdrHeading
        thumbnail { mobile: url @transform(width: 600, height: 450, mode: "crop", format: "webp", quality: 80, immediately: true) tablet: url @transform(width: 900, height: 675, mode: "crop", format: "webp", quality: 80, immediately: true) desktop: url @transform(width: 1200, height: 900, mode: "crop", format: "webp", quality: 80, immediately: true) }
        catDiscipline {
          ... on discipline_Category { id title slug accentColor }
        }
        catSector {
          ... on sector_Category { id title slug accentColor }
        }
      }
    }
  }
`;

export async function getResearchListing(): Promise<ResearchListingResult> {
  const data = await craftFetch<ResearchListingResponse>(RESEARCH_LISTING_QUERY);
  const page = data.page?.[0];

  return {
    pageHeading: page?.pageHeading ?? null,
    pageSubheading: page?.pageSubheading ?? null,
    pageHeroImageUrl: toImageSource(page?.seoImage?.[0]),
    sectors: data.sectors ?? [],
    practices: data.practices ?? [],
    articles: (data.articles ?? []).map((article) => ({
      id: article.id,
      slug: article.slug,
      title: article.artHdrHeading ?? article.slug,
      thumbnailUrl: toImageSource(article.thumbnail?.[0]),
      sectors: article.catSector ?? [],
      practices: article.catDiscipline ?? [],
    })),
  };
}
