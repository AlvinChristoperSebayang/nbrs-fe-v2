import { craftFetch } from "./craft";
import { toImageSource } from "./media";
import type { ImageSource, ResponsiveImage } from "./types";

export const NEWS_PAGE_SIZE = 12;

export type NewsListItem = {
  id: string;
  slug: string;
  title: string;
  image: ImageSource;
};

export type NewsListingResult = {
  pageHeading: string | null;
  pageSubheading: string | null;
  pageHeroImage: ImageSource | null;
  articles: NewsListItem[];
  total: number;
};

type RawAsset = Partial<ResponsiveImage> & {
  url?: string;
  width: number | null;
  height: number | null;
  title: string | null;
};

type NewsListingResponse = {
  page: Array<{
    pageHeading: string | null;
    pageSubheading: string | null;
    pageHeroImage: RawAsset[];
  }>;
  articles: Array<{
    id: string;
    slug: string;
    artHdrHeading: string | null;
    thumbnail: RawAsset[];
  }>;
  total: number;
};

const NEWS_LISTING_QUERY = /* GraphQL */ `
  query NewsListing($limit: Int = 12, $offset: Int = 0) {
    page: entries(section: "latestNews") {
      ... on latestNews_Entry {
        pageHeading
        pageSubheading
        pageHeroImage {
          mobile: url @transform(width: 768, immediately: true)
          tablet: url @transform(width: 1440, immediately: true)
          desktop: url @transform(width: 1920, immediately: true)
          width
          height
          title
        }
      }
    }
    articles: entries(
      section: "news"
      limit: $limit
      offset: $offset
      orderBy: "postDate DESC, id DESC"
    ) {
      ... on news_Entry {
        id
        slug
        artHdrHeading
        thumbnail {
          mobile: url @transform(width: 600, immediately: true)
          tablet: url @transform(width: 900, immediately: true)
          desktop: url @transform(width: 1200, immediately: true)
          width
          height
          title
        }
      }
    }
    total: entryCount(section: "news")
  }
`;

export async function getNewsListing({
  limit = NEWS_PAGE_SIZE,
  offset = 0,
}: {
  limit?: number;
  offset?: number;
} = {}): Promise<NewsListingResult> {
  const data = await craftFetch<NewsListingResponse>(NEWS_LISTING_QUERY, {
    limit,
    offset,
  });
  const page = data.page?.[0];

  return {
    pageHeading: page?.pageHeading ?? null,
    pageSubheading: page?.pageSubheading ?? null,
    pageHeroImage: toImageSource(page?.pageHeroImage?.[0]),
    articles: (data.articles ?? []).map((article) => ({
      id: article.id,
      slug: article.slug,
      title: article.artHdrHeading ?? article.slug,
      image: toImageSource(article.thumbnail?.[0]) ?? "/images/placeholder-project.png",
    })),
    total: data.total ?? 0,
  };
}
