import { craftFetch } from "./craft";
import { toImageSource, toSeoImage, type SeoImage } from "./media";
import type { ImageSource } from "./types";

export type ProjectCategory = {
  id: string;
  title: string;
  slug: string;
  accentColor: string | null;
};

export type ProjectListItem = {
  id: string;
  slug: string;
  uri: string;
  postDate: string | null;
  heading: string;
  subheading: string | null;
  thumbnailUrl: ImageSource | null;
  sectors: ProjectCategory[];
  practices: ProjectCategory[];
};

export type ProjectsListingResult = {
  pageHeading: string | null;
  pageSubheading: string | null;
  pageHeroImageUrl: ImageSource | null;
  cmsSeoTitle: string | null;
  seoDescription: string | null;
  seoImage: SeoImage | null;
  sectors: ProjectCategory[];
  practices: ProjectCategory[];
  projects: ProjectListItem[];
  total: number;
};

type CategoryRelationCriteriaInput = {
  group: "sector" | "discipline";
  slug: string[];
};

type RawCategory = {
  id: string;
  title: string;
  slug: string;
  accentColor: string | null;
};

type RawAsset = {
  url?: string;
  mobile?: string;
  tablet?: string;
  desktop?: string;
  width: number | null;
  height: number | null;
  title: string | null;
};

type RawProjectEntry = {
  id: string;
  slug: string;
  uri: string;
  postDate: string | null;
  proHdrHeading: string;
  proHdrSubheading: string | null;
  thumbnail: RawAsset[];
  catSector: RawCategory[];
  catDiscipline: RawCategory[];
};

type RawPageEntry = {
  id: string;
  title: string;
  slug: string;
  pageHeading: string | null;
  pageSubheading: string | null;
  seoPageTitle: string | null;
  seoMetaDescription: string | null;
  seoImage: RawAsset[];
};

type ProjectsListingResponse = {
  page: RawPageEntry[];
  sectors: RawCategory[];
  practices: RawCategory[];
  projects: RawProjectEntry[];
  total: number;
};

const PROJECTS_LISTING_QUERY = /* GraphQL */ `
  query ProjectsListing(
    $limit: Int = 9
    $offset: Int = 0
    $relatedToCategories: [CategoryRelationCriteriaInput]
  ) {
    page: entries(section: "latestProjects") {
      ... on latestProjects_Entry {
        id
        title
        slug
        pageHeading
        pageSubheading
        seoPageTitle
        seoMetaDescription
        seoImage {
          url
          mobile: url @transform(width: 600, height: 800, mode: "crop", format: "webp", quality: 80, immediately: true)
          tablet: url @transform(width: 1440, height: 1000, mode: "crop", format: "webp", quality: 82, immediately: true)
          desktop: url @transform(width: 2400, height: 1200, mode: "crop", format: "webp", quality: 85, immediately: true)
          width
          height
          title
        }
      }
    }

    sectors: categories(group: "sector") {
      ... on sector_Category {
        id
        title
        slug
        accentColor
      }
    }

    practices: categories(group: "discipline") {
      ... on discipline_Category {
        id
        title
        slug
        accentColor
      }
    }

    projects: entries(
      section: "projects"
      relatedToCategories: $relatedToCategories
      limit: $limit
      offset: $offset
      orderBy: "postDate DESC"
    ) {
      ... on projects_Entry {
        id
        slug
        uri
        postDate
        proHdrHeading
        proHdrSubheading
        thumbnail {
          mobile: url @transform(width: 600, height: 450, mode: "crop", format: "webp", quality: 80, immediately: true)
          tablet: url @transform(width: 900, height: 675, mode: "crop", format: "webp", quality: 80, immediately: true)
          desktop: url @transform(width: 1200, height: 900, mode: "crop", format: "webp", quality: 80, immediately: true)
          width
          height
          title
        }
        catSector {
          ... on sector_Category {
            id
            title
            slug
            accentColor
          }
        }
        catDiscipline {
          ... on discipline_Category {
            id
            title
            slug
            accentColor
          }
        }
      }
    }

    total: entryCount(
      section: "projects"
      relatedToCategories: $relatedToCategories
    )
  }
`;

function buildRelatedToCategories(
  sectorSlugs: string[],
  practiceSlugs: string[]
): CategoryRelationCriteriaInput[] | null {
  const criteria: CategoryRelationCriteriaInput[] = [];

  if (sectorSlugs.length > 0) {
    criteria.push({ group: "sector", slug: sectorSlugs });
  }
  if (practiceSlugs.length > 0) {
    criteria.push({ group: "discipline", slug: practiceSlugs });
  }

  return criteria.length > 0 ? criteria : null;
}

export async function getProjectsListing({
  limit,
  offset = 0,
  sectorSlugs = [],
  practiceSlugs = [],
}: {
  limit: number;
  offset?: number;
  sectorSlugs?: string[];
  practiceSlugs?: string[];
}): Promise<ProjectsListingResult> {
  const relatedToCategories = buildRelatedToCategories(
    sectorSlugs,
    practiceSlugs
  );

  try {
    const data = await craftFetch<ProjectsListingResponse>(
      PROJECTS_LISTING_QUERY,
      { limit, offset, relatedToCategories }
    );

    const page = data.page?.[0];

    return {
      pageHeading: page?.pageHeading ?? null,
      pageSubheading: page?.pageSubheading ?? null,
      pageHeroImageUrl: toImageSource(page?.seoImage?.[0]),
      cmsSeoTitle: page?.seoPageTitle?.trim() || null,
      seoDescription: page?.seoMetaDescription?.trim() || page?.pageSubheading?.trim() || null,
      seoImage: toSeoImage(page?.seoImage?.[0]),
      sectors: data.sectors ?? [],
      practices: (data.practices ?? []).filter(
        (p) => p.slug !== "heritage" && p.title?.toLowerCase() !== "heritage"
      ),
      projects: (data.projects ?? []).map((entry) => ({
        id: entry.id,
        slug: entry.slug,
        uri: entry.uri,
        postDate: entry.postDate,
        heading: entry.proHdrHeading,
        subheading: entry.proHdrSubheading,
        thumbnailUrl: toImageSource(entry.thumbnail?.[0]),
        sectors: entry.catSector ?? [],
        practices: entry.catDiscipline ?? [],
      })),
      total: data.total ?? 0,
    };
  } catch (error) {
    console.error("Failed to fetch projects listing from Craft:", error);
    return {
      pageHeading: "PROJECTS",
      pageSubheading: null,
      pageHeroImageUrl: null,
      cmsSeoTitle: null,
      seoDescription: null,
      seoImage: null,
      sectors: [],
      practices: [],
      projects: [],
      total: 0,
    };
  }
}
