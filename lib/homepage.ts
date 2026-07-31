import { craftFetch } from "./craft";
import { mapCta } from "./cta";
import type { HeroSlide } from "./hero";
import { toImageSource } from "./media";
import type { CtaContent, NewsItem, Sector } from "./types";

type RawAsset = { mobile?: string; tablet?: string; desktop?: string };
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
            image {
              mobile: url @transform(width: 600, height: 800, mode: "crop", format: "webp", quality: 80, immediately: true)
              tablet: url @transform(width: 1440, height: 1000, mode: "crop", format: "webp", quality: 82, immediately: true)
              desktop: url @transform(width: 2400, height: 1200, mode: "crop", format: "webp", quality: 85, immediately: true)
            }
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
            thumbnail { mobile: url @transform(width: 600, height: 450, mode: "crop", format: "webp", quality: 80, immediately: true) tablet: url @transform(width: 900, height: 675, mode: "crop", format: "webp", quality: 80, immediately: true) desktop: url @transform(width: 1200, height: 900, mode: "crop", format: "webp", quality: 80, immediately: true) }
          }
        }
        sectionHeading
        homepageNewsSource
        homepageFeaturedNews {
          ... on news_Entry {
            slug
            artHdrHeading
            thumbnail { mobile: url @transform(width: 600, height: 450, mode: "crop", format: "webp", quality: 80, immediately: true) tablet: url @transform(width: 900, height: 675, mode: "crop", format: "webp", quality: 80, immediately: true) desktop: url @transform(width: 1200, height: 900, mode: "crop", format: "webp", quality: 80, immediately: true) }
          }
        }
        ctaSection {
          ctaSectionBackgroundImage { mobile: url @transform(width: 600, height: 900, mode: "crop", format: "webp", quality: 80, immediately: true) tablet: url @transform(width: 1440, height: 900, mode: "crop", format: "webp", quality: 82, immediately: true) desktop: url @transform(width: 2400, height: 1000, mode: "crop", format: "webp", quality: 85, immediately: true) }
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
        thumbnail { mobile: url @transform(width: 600, height: 450, mode: "crop", format: "webp", quality: 80, immediately: true) tablet: url @transform(width: 900, height: 675, mode: "crop", format: "webp", quality: 80, immediately: true) desktop: url @transform(width: 1200, height: 900, mode: "crop", format: "webp", quality: 80, immediately: true) }
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
    .filter((article) => article.artHdrHeading && toImageSource(article.thumbnail[0]))
    .map((article) => ({
      title: article.artHdrHeading as string,
      href: `/blog/${article.slug}`,
      image: toImageSource(article.thumbnail[0])!,
    }));
}

export async function getHomepageContent(): Promise<HomepageContent> {
  const emptyFallback: HomepageContent = {
    slides: [],
    about: null,
    sectors: [],
    latestNewsHeading: null,
    latestNews: [],
    cta: null,
  };

  try {
    const data = await craftFetch<HomepageResponse>(HOMEPAGE_QUERY);
    const homepage = data.entries?.[0];

    if (!homepage) return emptyFallback;

    const automaticNews = mapNewsArticles(data.articles ?? []).slice(0, 3);
    const selectedNews = mapNewsArticles(homepage.homepageFeaturedNews ?? []);
    const latestNews =
      homepage.homepageNewsSource === "manual" && selectedNews.length
        ? selectedNews
        : automaticNews;

    return {
      slides: (homepage.heroBannerCarousel ?? [])
        .filter((slide) => slide.heading && toImageSource(slide.image[0]))
        .map((slide) => ({
          title: slide.heading as string,
          headline: slide.subheading ?? "",
          image: toImageSource(slide.image[0])!,
        })),
      about: homepage.whatWeDo?.[0]
        ? {
            heading: homepage.whatWeDo[0].heading,
            description:
              plainText(homepage.whatWeDo[0].subheading) ??
              plainText(homepage.whatWeDo[0].text),
          }
        : null,
      sectors: (homepage.homepageFeaturedSectors ?? [])
        .filter((sector) => toImageSource(sector.thumbnail[0]))
        .map((sector) => ({
          label: sector.title,
          image: toImageSource(sector.thumbnail[0])!,
          href: `/${sector.uri ?? `sector/${sector.slug}`}`,
          description: sector.tagline ?? "",
          hoverColor: sector.accentColor ?? "#E0EFF4",
        })),
      latestNewsHeading: homepage.sectionHeading,
      latestNews,
      cta: homepage.ctaSection
        ? mapCta({ ctaSection: homepage.ctaSection }, {
            image: "",
            title: "",
          })
        : null,
    };
  } catch (error) {
    console.warn("Failed to load Homepage content from Craft, using fallback:", error);
    return emptyFallback;
  }
}
