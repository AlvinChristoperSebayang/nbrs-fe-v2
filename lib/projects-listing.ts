import { craftFetch } from "./craft";
import { toImageSource, toSeoImage, type SeoImage } from "./media";
import type { ImageSource } from "./types";

export const PROJECTS_PAGE_SIZE = 9;

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

export type ProjectsSeoResult = {
  pageHeading: string | null;
  seoDescription: string | null;
  cmsSeoTitle: string | null;
  seoImage: SeoImage | null;
};

export type ProjectsShellResult = {
  pageHeading: string | null;
  pageSubheading: string | null;
  pageHeroImageUrl: ImageSource | null;
  sectors: ProjectCategory[];
  practices: ProjectCategory[];
};

export type ProjectsCardsResult = {
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
  id?: string;
  title?: string;
  slug?: string;
  pageHeading: string | null;
  pageSubheading: string | null;
  seoPageTitle?: string | null;
  seoMetaDescription?: string | null;
  seoImage: RawAsset[];
};

const PROJECTS_SEO_QUERY = /* GraphQL */ `
  query ProjectsSeo {
    page: entries(section: "latestProjects") {
      ... on latestProjects_Entry {
        pageHeading
        pageSubheading
        seoPageTitle
        seoMetaDescription
        seoImage {
          url
          width
          height
          title
        }
      }
    }
  }
`;

const PROJECTS_SHELL_QUERY = /* GraphQL */ `
  query ProjectsShell {
    page: entries(section: "latestProjects") {
      ... on latestProjects_Entry {
        pageHeading
        pageSubheading
        seoImage {
          url
          mobile: url @transform(width: 1440, mode: "fit", format: "webp", quality: 90, immediately: true)
          tablet: url @transform(width: 1440, mode: "fit", format: "webp", quality: 82, immediately: true)
          desktop: url @transform(width: 2400, mode: "fit", format: "webp", quality: 85, immediately: true)
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
  }
`;

const PROJECTS_CARDS_QUERY = /* GraphQL */ `
  query ProjectsCards(
    $limit: Int = 9
    $offset: Int = 0
    $relatedToCategories: [CategoryRelationCriteriaInput]
  ) {
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
          url
          mobile: url @transform(width: 900, mode: "fit", format: "webp", quality: 85)
          tablet: url @transform(width: 900, mode: "fit", format: "webp", quality: 82)
          desktop: url @transform(width: 1200, mode: "fit", format: "webp", quality: 85)
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

function filterHeritagePractices(practices: RawCategory[]): ProjectCategory[] {
  return practices.filter(
    (practice) =>
      practice.slug !== "heritage" && practice.title?.toLowerCase() !== "heritage"
  );
}

function mapProjectEntry(entry: RawProjectEntry): ProjectListItem {
  return {
    id: entry.id,
    slug: entry.slug,
    uri: entry.uri,
    postDate: entry.postDate,
    heading: entry.proHdrHeading,
    subheading: entry.proHdrSubheading,
    thumbnailUrl: toImageSource(entry.thumbnail?.[0]),
    sectors: entry.catSector ?? [],
    practices: entry.catDiscipline ?? [],
  };
}

export function parseProjectFilterSlugs(
  value: string | string[] | null | undefined
): string[] {
  if (!value) return [];
  const raw = Array.isArray(value) ? value.join(",") : value;
  return raw
    .split(",")
    .map((slug) => slug.trim())
    .filter(Boolean);
}

export async function getProjectsSeo(): Promise<ProjectsSeoResult> {
  try {
    const data = await craftFetch<{ page: RawPageEntry[] }>(PROJECTS_SEO_QUERY);
    const page = data.page?.[0];

    return {
      pageHeading: page?.pageHeading ?? null,
      cmsSeoTitle: page?.seoPageTitle?.trim() || null,
      seoDescription:
        page?.seoMetaDescription?.trim() ||
        page?.pageSubheading?.trim() ||
        null,
      seoImage: toSeoImage(page?.seoImage?.[0]),
    };
  } catch (error) {
    console.error("Failed to fetch projects SEO from Craft:", error);
    return {
      pageHeading: null,
      seoDescription: null,
      cmsSeoTitle: null,
      seoImage: null,
    };
  }
}

export async function getProjectsShell(): Promise<ProjectsShellResult> {
  try {
    const data = await craftFetch<{
      page: RawPageEntry[];
      sectors: RawCategory[];
      practices: RawCategory[];
    }>(PROJECTS_SHELL_QUERY);
    const page = data.page?.[0];

    return {
      pageHeading: page?.pageHeading ?? null,
      pageSubheading: page?.pageSubheading ?? null,
      pageHeroImageUrl: toImageSource(page?.seoImage?.[0]),
      sectors: data.sectors ?? [],
      practices: filterHeritagePractices(data.practices ?? []),
    };
  } catch (error) {
    console.error("Failed to fetch projects shell from Craft:", error);
    return {
      pageHeading: "PROJECTS",
      pageSubheading: null,
      pageHeroImageUrl: null,
      sectors: [],
      practices: [],
    };
  }
}

export async function getProjectsCards({
  limit = PROJECTS_PAGE_SIZE,
  offset = 0,
  sectorSlugs = [],
  practiceSlugs = [],
}: {
  limit?: number;
  offset?: number;
  sectorSlugs?: string[];
  practiceSlugs?: string[];
} = {}): Promise<ProjectsCardsResult> {
  const relatedToCategories = buildRelatedToCategories(
    sectorSlugs,
    practiceSlugs
  );

  try {
    const data = await craftFetch<{
      projects: RawProjectEntry[];
      total: number;
    }>(PROJECTS_CARDS_QUERY, { limit, offset, relatedToCategories });

    return {
      projects: (data.projects ?? []).map(mapProjectEntry),
      total: data.total ?? 0,
    };
  } catch (error) {
    console.error("Failed to fetch projects cards from Craft:", error);
    return {
      projects: [],
      total: 0,
    };
  }
}
