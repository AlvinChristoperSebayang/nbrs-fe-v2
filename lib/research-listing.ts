import { craftFetch } from "./craft";

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
  thumbnailUrl: string | null;
  sectors: ResearchCategory[];
  practices: ResearchCategory[];
};

export type ResearchListingResult = {
  pageHeading: string | null;
  pageSubheading: string | null;
  pageHeroImageUrl: string | null;
  sectors: ResearchCategory[];
  practices: ResearchCategory[];
  articles: ResearchListItem[];
};

type RawAsset = { url: string };
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
        seoImage { url: url @transform(width: 2400, format: "webp", quality: 85, immediately: true) }
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
        thumbnail { url: url @transform(width: 1200, format: "webp", quality: 80, immediately: true) }
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
    pageHeroImageUrl: page?.seoImage?.[0]?.url ?? null,
    sectors: data.sectors ?? [],
    practices: data.practices ?? [],
    articles: (data.articles ?? []).map((article) => ({
      id: article.id,
      slug: article.slug,
      title: article.artHdrHeading ?? article.slug,
      thumbnailUrl: article.thumbnail?.[0]?.url ?? null,
      sectors: article.catSector ?? [],
      practices: article.catDiscipline ?? [],
    })),
  };
}
