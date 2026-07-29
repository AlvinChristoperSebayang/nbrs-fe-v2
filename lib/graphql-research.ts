export const RESEARCH_LISTING_QUERY = `
query ResearchListing(
  $limit: Int = 9
  $offset: Int = 0
  $relatedToCategories: [CategoryRelationCriteriaInput]
) {
  page: entries(section: "latestResearch", limit: 1) {
    __typename
    id
    title
    slug
    uri

    ... on latestResearch_Entry {
      pageHeading
      pageSubheading

      seoPageTitle
      seoMetaDescription

      seoImage {
        url
        url2: url @transform(width: 360, immediately: true)
        width
        height
        title
      }
    }
  }

  sectors: categories(group: "sector", orderBy: "title ASC") {
    __typename

    ... on sector_Category {
      id
      title
      slug
      uri
      accentColor
    }
  }

  practices: categories(group: "discipline", orderBy: "title ASC") {
    __typename

    ... on discipline_Category {
      id
      title
      slug
      uri
      accentColor
    }
  }

  research: entries(
    section: "research"
    relatedToCategories: $relatedToCategories
    limit: $limit
    offset: $offset
    orderBy: "postDate DESC"
  ) {
    __typename
    id
    title
    slug
    uri
    url
    postDate

    ... on research_Entry {
      artHdrHeading

      artType {
        __typename
        id
        title
        slug
        uri
      }

      thumbnail {
        url
        url2: url @transform(width: 360, immediately: true)
        width
        height
        title
      }

      catSector {
        __typename

        ... on sector_Category {
          id
          title
          slug
          uri
          accentColor
        }
      }

      catDiscipline {
        __typename

        ... on discipline_Category {
          id
          title
          slug
          uri
          accentColor
        }
      }

      entryAuthor {
        __typename
        id
        title
        slug
        uri
      }
    }
  }

  total: entryCount(
    section: "research"
    relatedToCategories: $relatedToCategories
  )
}
`;

export type CategoryFilterCriteria = {
  group: string;
  slug: string[];
};

export type GraphQLCategoryNode = {
  id: string;
  title: string;
  slug: string;
  accentColor?: string;
};

export type GraphQLResearchEntry = {
  id: string;
  title: string;
  slug: string;
  url?: string;
  postDate?: string;
  artHdrHeading?: string;
  thumbnail?: Array<{
    url?: string;
    url2?: string;
  }>;
  catSector?: GraphQLCategoryNode[];
  catDiscipline?: GraphQLCategoryNode[];
};

export type GraphQLResearchResponseData = {
  page?: Array<{
    pageHeading?: string;
    pageSubheading?: string;
  }>;
  sectors?: GraphQLCategoryNode[];
  practices?: GraphQLCategoryNode[];
  research?: GraphQLResearchEntry[];
  total?: number;
};

export async function fetchResearchListing({
  limit = 9,
  offset = 0,
  selectedSectors = [],
  selectedPractices = [],
}: {
  limit?: number;
  offset?: number;
  selectedSectors?: string[];
  selectedPractices?: string[];
}): Promise<GraphQLResearchResponseData | null> {
  const endpoint =
    process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || "http://nbrs-update.test/api";

  const relatedToCategories: CategoryFilterCriteria[] = [];

  if (selectedSectors.length > 0) {
    relatedToCategories.push({
      group: "sector",
      slug: selectedSectors,
    });
  }

  if (selectedPractices.length > 0) {
    relatedToCategories.push({
      group: "discipline",
      slug: selectedPractices,
    });
  }

  const variables = {
    limit,
    offset,
    relatedToCategories:
      relatedToCategories.length > 0 ? relatedToCategories : null,
  };

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: RESEARCH_LISTING_QUERY,
        variables,
      }),
      signal: controller.signal,
      cache: "no-store",
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      return null;
    }

    const json = await res.json();
    if (json.errors) {
      console.warn("GraphQL Errors:", json.errors);
    }
    return json.data || null;
  } catch (error) {
    console.warn("GraphQL fetch failed, using fallback:", error);
    return null;
  }
}
