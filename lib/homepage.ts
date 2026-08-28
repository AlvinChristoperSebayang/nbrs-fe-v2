import { craftFetch } from "./craft";
import type { HeroSlide } from "./hero";
import { toImageSource, toSeoImage, type RawSeoAsset, type SeoImage } from "./media";
import type {
  CtaContent,
  NewsItem,
  ResponsiveImageDimensions,
  Sector,
} from "./types";

type RawAsset = { mobile?: string; tablet?: string; desktop?: string };
type RawHeroBackgroundAsset = {
  backgroundMobile?: string;
  backgroundTablet?: string;
  backgroundDesktop?: string;
};
type RawNewsArticle = {
  slug: string;
  artHdrHeading: string | null;
  thumbnail: RawAsset[];
};

type RawHomepageCta = {
  ctaSectionBackgroundImage: RawAsset[];
  ctaSectionHeading: string | null;
  ctaSectionDescription: string | null;
  ctaSectionButtonLabel: string | null;
  ctaSectionButtonUrl: string | null;
};

const HERO_IMAGE_DIMENSIONS = {
  mobile: { width: 600, height: 800 },
  tablet: { width: 1440, height: 1000 },
  desktop: { width: 2400, height: 1200 },
} satisfies ResponsiveImageDimensions;

const HERO_FOREGROUND_DIMENSIONS = {
  mobile: { width: 600, height: 467 },
  tablet: { width: 1080, height: 840 },
  desktop: { width: 1600, height: 1245 },
} satisfies ResponsiveImageDimensions;

const ABOUT_IMAGE_DIMENSIONS = {
  mobile: { width: 600, height: 600 },
  tablet: { width: 900, height: 900 },
  desktop: { width: 1200, height: 1200 },
} satisfies ResponsiveImageDimensions;

const CARD_IMAGE_DIMENSIONS = {
  mobile: { width: 600, height: 450 },
  tablet: { width: 900, height: 675 },
  desktop: { width: 1200, height: 900 },
} satisfies ResponsiveImageDimensions;

const CTA_IMAGE_DIMENSIONS = {
  mobile: { width: 600, height: 900 },
  tablet: { width: 1440, height: 900 },
  desktop: { width: 2400, height: 1000 },
} satisfies ResponsiveImageDimensions;

type HomepageResponse = {
  entries: Array<{
    heroBannerCarousel: Array<{
      heading: string | null;
      subheading: string | null;
      linkText: string | null;
      linkUrl: string | null;
      image: RawHeroBackgroundAsset[];
      foregroundImage?: RawAsset[];
    }>;
    whatWeDo: Array<{
      heading: string | null;
      subheading: string | null;
      descriptionHtml: string | null;
      buttonText: string | null;
      buttonUrl: string | null;
    }>;
    homepageAboutImage: RawAsset[];
    homepageSectorsHeading: string | null;
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
    ctaSection: RawHomepageCta | null;
    seoPageTitle: string | null;
    seoMetaDescription: string | null;
    seoImage: RawSeoAsset[];
  }>;
  articles: RawNewsArticle[];
};

export type HomepageContent = {
  slides: HeroSlide[];
  about: {
    heading: string | null;
    description: string | null;
    button: { text: string; href: string } | null;
    image: import("./types").ImageSource | null;
  } | null;
  sectors: Sector[];
  sectorsHeading: string | null;
  latestNewsHeading: string | null;
  latestNews: NewsItem[];
  cta: CtaContent | null;
  cmsSeoTitle: string | null;
  seoDescription: string | null;
  seoImage: SeoImage | null;
};

function path(value: string | null | undefined): string | null {
  if (!value) return null;

  try {
    const url = new URL(value);
    if (
      url.hostname === "127.0.0.1" ||
      url.hostname === "localhost" ||
      /(^|\.)nbrs(-staging)?\.test$/.test(url.hostname) ||
      /(^|\.)nbrs\.com\.au$/.test(url.hostname)
    ) {
      const pathname = url.pathname === "/who-we-are" ? "/about" : url.pathname;
      return `${pathname}${url.search}${url.hash}`;
    }
  } catch {
    return value;
  }

  return value;
}

function homepageCta(cta: RawHomepageCta | null): CtaContent | null {
  const fallback: CtaContent = {
    image: "/images/contact-bg.png",
    title: "GET IN TOUCH",
    buttonText: "Contact Us",
    buttonHref: "/contact",
  };
  const image = toImageSource(
    cta?.ctaSectionBackgroundImage?.[0],
    CTA_IMAGE_DIMENSIONS,
  );

  if (!image) return null;

  return {
    image,
    title: cta?.ctaSectionHeading?.trim() || fallback.title,
    description: cta?.ctaSectionDescription?.trim() || fallback.description,
    buttonText: cta?.ctaSectionButtonLabel?.trim() || fallback.buttonText,
    buttonHref: path(cta?.ctaSectionButtonUrl) || fallback.buttonHref,
  };
}

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
              backgroundMobile: url @transform(width: 768, mode: "fit", format: "webp", quality: 80, immediately: true)
              backgroundTablet: url @transform(width: 1440, mode: "fit", format: "webp", quality: 82, immediately: true)
              backgroundDesktop: url @transform(width: 2400, mode: "fit", format: "webp", quality: 85, immediately: true)
            }
            foregroundImage {
              mobile: url @transform(width: 768, mode: "fit", format: "webp", quality: 80, immediately: true)
              tablet: url @transform(width: 1440, mode: "fit", format: "webp", quality: 82, immediately: true)
              desktop: url @transform(width: 2400, mode: "fit", format: "webp", quality: 85, immediately: true)
            }
          }
        }
        whatWeDo {
          ... on whatWeDo_Entry {
            heading
            subheading
            descriptionHtml: text
            buttonText
            buttonUrl
          }
        }
        homepageAboutImage { mobile: url @transform(width: 600, height: 600, mode: "crop", format: "webp", quality: 80, immediately: true) tablet: url @transform(width: 900, height: 900, mode: "crop", format: "webp", quality: 82, immediately: true) desktop: url @transform(width: 1200, height: 1200, mode: "crop", format: "webp", quality: 85, immediately: true) }
        homepageSectorsHeading
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
        seoPageTitle
        seoMetaDescription
        seoImage { url width height title }
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

function mapNewsArticles(articles: RawNewsArticle[]): NewsItem[] {
  return articles
    .filter(
      (article) =>
        article.artHdrHeading &&
        toImageSource(article.thumbnail[0], CARD_IMAGE_DIMENSIONS),
    )
    .map((article) => ({
      title: article.artHdrHeading as string,
      href: `/news/${article.slug}`,
      image: toImageSource(article.thumbnail[0], CARD_IMAGE_DIMENSIONS)!,
    }));
}

export async function getHomepageContent(): Promise<HomepageContent> {
  const emptyFallback: HomepageContent = {
    slides: [],
    about: null,
    sectors: [],
    sectorsHeading: null,
    latestNewsHeading: null,
    latestNews: [],
    cta: null,
    cmsSeoTitle: null,
    seoDescription: null,
    seoImage: null,
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
        .filter(
          (slide) =>
            slide.heading &&
            toImageSource(
              {
                mobile: slide.image[0]?.backgroundMobile,
                tablet: slide.image[0]?.backgroundTablet,
                desktop: slide.image[0]?.backgroundDesktop,
              },
              HERO_IMAGE_DIMENSIONS,
            ) &&
            toImageSource(
              {
                mobile: slide.foregroundImage?.[0]?.mobile ?? slide.image[0]?.backgroundMobile,
                tablet: slide.foregroundImage?.[0]?.tablet ?? slide.image[0]?.backgroundTablet,
                desktop: slide.foregroundImage?.[0]?.desktop ?? slide.image[0]?.backgroundDesktop,
              },
              HERO_FOREGROUND_DIMENSIONS,
            ),
        )
        .map((slide) => {
          const asset = slide.image[0];

          return {
            title: slide.heading as string,
            headline: slide.subheading ?? "",
            backgroundImage: toImageSource(
              {
                mobile: asset.backgroundMobile,
                tablet: asset.backgroundTablet,
                desktop: asset.backgroundDesktop,
              },
              HERO_IMAGE_DIMENSIONS,
            )!,
            foregroundImage: toImageSource(
              {
                mobile: slide.foregroundImage?.[0]?.mobile ?? asset.backgroundMobile,
                tablet: slide.foregroundImage?.[0]?.tablet ?? asset.backgroundTablet,
                desktop: slide.foregroundImage?.[0]?.desktop ?? asset.backgroundDesktop,
              },
              HERO_FOREGROUND_DIMENSIONS,
            )!,
          };
        }),
      about: homepage.whatWeDo?.[0]
        ? {
            heading: homepage.whatWeDo[0].heading,
            description:
              homepage.whatWeDo[0].descriptionHtml?.trim() ||
              homepage.whatWeDo[0].subheading?.trim() ||
              null,
            button:
              homepage.whatWeDo[0].buttonText && homepage.whatWeDo[0].buttonUrl
                ? {
                    text: homepage.whatWeDo[0].buttonText,
                    href: path(homepage.whatWeDo[0].buttonUrl) || "/about",
                  }
                : null,
            image: toImageSource(
              homepage.homepageAboutImage?.[0],
              ABOUT_IMAGE_DIMENSIONS,
            ),
          }
        : null,
      sectors: (homepage.homepageFeaturedSectors ?? [])
        .filter((sector) =>
          toImageSource(sector.thumbnail[0], CARD_IMAGE_DIMENSIONS),
        )
        .map((sector) => ({
          label: sector.title,
          image: toImageSource(sector.thumbnail[0], CARD_IMAGE_DIMENSIONS)!,
          href: `/sectors/${sector.slug}`,
          description: sector.tagline ?? "",
          hoverColor: sector.accentColor ?? "#E0EFF4",
        })),
      sectorsHeading: homepage.homepageSectorsHeading,
      latestNewsHeading: homepage.sectionHeading,
      latestNews,
      cta: homepageCta(homepage.ctaSection),
      cmsSeoTitle: homepage.seoPageTitle?.trim() || null,
      seoDescription: homepage.seoMetaDescription?.trim() || null,
      seoImage: toSeoImage(homepage.seoImage?.[0]),
    };
  } catch (error) {
    console.warn("Failed to load Homepage content from Craft, using fallback:", error);
    return emptyFallback;
  }
}
