import { craftFetch } from "./craft";
import { mapCta } from "./cta";
import type { HeroSlide } from "./hero";
import type { CtaContent, NewsItem, Sector } from "./types";

type RawAsset = { url: string };
type RawNewsArticle = {
  slug: string;
  artHdrHeading: string | null;
  thumbnail: RawAsset[];
};

type HomepageResponse = {
  entries: Array<{
    heroBannerCarousel: Array<{
      heading: string | null;
      subheading: string | null;
      linkText: string | null;
      linkUrl: string | null;
      image: RawAsset[];
    }>;
    whatWeDo: Array<{
      heading: string | null;
      subheading: string | null;
      text: string | null;
      buttonText: string | null;
      buttonUrl: string | null;
    }>;
    homepageFeaturedSectors: Array<{
      title: string;
      slug: string;
      uri: string | null;
      tagline: string | null;
      accentColor: string | null;
      thumbnail: RawAsset[];
    }>;
    sectionHeading: string | null;
    homepageNewsSource: string | null;
    homepageFeaturedNews: RawNewsArticle[];
    ctaSection: {
      ctaSectionBackgroundImage: RawAsset[];
      ctaSectionHeading: string | null;
      ctaSectionDescription: string | null;
      ctaSectionButtonLabel: string | null;
      ctaSectionButtonUrl: string | null;
    } | null;
  }>;
  articles: RawNewsArticle[];
};

export type HomepageContent = {
  slides: HeroSlide[];
  about: {
    heading: string | null;
    description: string | null;
  } | null;
  sectors: Sector[];
  latestNewsHeading: string | null;
  latestNews: NewsItem[];
  cta: CtaContent | null;
};

const HOMEPAGE_QUERY = /* GraphQL */ `
  query HomepageContent {
    entries: entries(section: "homepage") {
      ... on homepage_Entry {
        heroBannerCarousel {
          ... on slide_Entry {
            heading
            subheading
            linkText
            linkUrl
            image { url: url @transform(width: 2400, format: "webp", quality: 85, immediately: true) }
          }
        }
        whatWeDo {
          ... on whatWeDo_Entry {
            heading
            subheading
            text
            buttonText
            buttonUrl
          }
        }
        homepageFeaturedSectors {
          ... on sector_Category {
            title
            slug
            uri
            tagline
            accentColor
            thumbnail { url: url @transform(width: 1200, format: "webp", quality: 80, immediately: true) }
          }
        }
        sectionHeading
        homepageNewsSource
        homepageFeaturedNews {
          ... on news_Entry {
            slug
            artHdrHeading
            thumbnail { url: url @transform(width: 1200, format: "webp", quality: 80, immediately: true) }
          }
        }
        ctaSection {
          ctaSectionBackgroundImage { url: url @transform(width: 2400, format: "webp", quality: 85, immediately: true) }
          ctaSectionHeading
          ctaSectionDescription
          ctaSectionButtonLabel
          ctaSectionButtonUrl
        }
      }
    }
    articles: entries(section: "news", orderBy: "postDate DESC", limit: 6) {
      ... on news_Entry {
        slug
        artHdrHeading
        thumbnail { url: url @transform(width: 1200, format: "webp", quality: 80, immediately: true) }
      }
    }
  }
`;

function plainText(value: string | null): string | null {
  if (!value) return null;

  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim() || null;
}

function mapNewsArticles(articles: RawNewsArticle[]): NewsItem[] {
  return articles
    .filter((article) => article.artHdrHeading && article.thumbnail[0]?.url)
    .map((article) => ({
      title: article.artHdrHeading as string,
      href: `/blog/${article.slug}`,
      image: article.thumbnail[0].url,
    }));
}

export async function getHomepageContent(): Promise<HomepageContent> {
  const data = await craftFetch<HomepageResponse>(HOMEPAGE_QUERY);
  const homepage = data.entries[0];

  if (!homepage) {
    return {
      slides: [],
      about: null,
      sectors: [],
      latestNewsHeading: null,
      latestNews: [],
      cta: null,
    };
  }

  const automaticNews = mapNewsArticles(data.articles ?? []).slice(0, 3);
  const selectedNews = mapNewsArticles(homepage.homepageFeaturedNews ?? []);
  const latestNews =
    homepage.homepageNewsSource === "manual" && selectedNews.length
      ? selectedNews
      : automaticNews;

  return {
    slides: (homepage.heroBannerCarousel ?? [])
      .filter((slide) => slide.heading && slide.image[0]?.url)
      .map((slide) => ({
        title: slide.heading as string,
        headline: slide.subheading ?? "",
        image: slide.image[0].url,
      })),
    about: homepage.whatWeDo[0]
      ? {
          heading: homepage.whatWeDo[0].heading,
          description:
            plainText(homepage.whatWeDo[0].subheading) ??
            plainText(homepage.whatWeDo[0].text),
        }
      : null,
    sectors: (homepage.homepageFeaturedSectors ?? [])
      .filter((sector) => sector.thumbnail[0]?.url)
      .map((sector) => ({
        label: sector.title,
        image: sector.thumbnail[0].url,
        href: `/${sector.uri ?? `sector/${sector.slug}`}`,
        description: sector.tagline ?? "",
        hoverColor: sector.accentColor ?? "#E0EFF4",
      })),
    latestNewsHeading: homepage.sectionHeading,
    // Manual order comes directly from Craft's Entries relation.
    // Fetch extra automatic records so missing thumbnails do not leave empty cards.
    latestNews,
    cta: homepage.ctaSection
      ? mapCta({ ctaSection: homepage.ctaSection }, {
          image: "",
          title: "",
        })
      : null,
  };
}
