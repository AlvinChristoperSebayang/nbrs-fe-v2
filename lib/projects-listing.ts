import { craftFetch } from "./craft";

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
  thumbnailUrl: string | null;
  sectors: ProjectCategory[];
  // Labelled "Practice" on the frontend, but this is the `discipline`
  // category group under the hood — see app/projects/result.md §5.
  practices: ProjectCategory[];
};

export type ProjectsListingResult = {
  pageHeading: string | null;
  pageSubheading: string | null;
  pageHeroImageUrl: string | null;
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
  url: string;
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
          url
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

  const data = await craftFetch<ProjectsListingResponse>(
    PROJECTS_LISTING_QUERY,
    { limit, offset, relatedToCategories }
  );

  const page = data.page?.[0];

  return {
    pageHeading: page?.pageHeading ?? null,
    pageSubheading: page?.pageSubheading ?? null,
    pageHeroImageUrl: page?.seoImage?.[0]?.url ?? null,
    sectors: data.sectors ?? [],
    practices: data.practices ?? [],
    projects: (data.projects ?? []).map((entry) => ({
      id: entry.id,
      slug: entry.slug,
      uri: entry.uri,
      postDate: entry.postDate,
      heading: entry.proHdrHeading,
      subheading: entry.proHdrSubheading,
      thumbnailUrl: entry.thumbnail?.[0]?.url ?? null,
      sectors: entry.catSector ?? [],
      practices: entry.catDiscipline ?? [],
    })),
    total: data.total ?? 0,
  };
}
