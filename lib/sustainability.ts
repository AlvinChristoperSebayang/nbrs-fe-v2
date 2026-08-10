import { craftFetch } from "./craft";
import { toImageSource, type RawResponsiveAsset } from "./media";
import type { CtaContent, ImageSource } from "./types";

type SustainabilityAsset = RawResponsiveAsset & {
  title?: string | null;
  width?: number | null;
  height?: number | null;
};

type SustainabilityResponse = {
  entries?: Array<{
    title?: string | null;
    pageHeading?: string | null;
    pageSubheading?: string | null;
    pageHeroImage?: SustainabilityAsset[];
    blocks?: Array<
      | {
          __typename: "blocks_text_BlockType";
          sectionHeading?: string | null;
          text?: string | null;
          image?: SustainabilityAsset[];
        }
      | {
          __typename: "blocks_thumbnailGrid_BlockType";
          thumbnailGrid?: Array<{
            heading?: string | null;
            text?: string | null;
            sustainabilityBlockUrl?: string | null;
            image?: SustainabilityAsset[];
          }>;
        }
      | {
          __typename: "blocks_caseStudies_BlockType";
          caseStudies?: Array<{
            title?: string | null;
            uri?: string | null;
            thumbnail?: SustainabilityAsset[];
          }>;
        }
    >;
    ctaSection?: {
      ctaSectionBackgroundImage?: SustainabilityAsset[];
      ctaSectionHeading?: string | null;
      ctaSectionDescription?: string | null;
      ctaSectionButtonLabel?: string | null;
      ctaSectionButtonUrl?: string | null;
      ctaSectionSecondaryButtonLabel?: string | null;
      ctaSectionSecondaryButtonUrl?: string | null;
    } | null;
  }>;
};

export type SustainabilityFeature = {
  title: string;
  text: string;
  image: ImageSource;
  href?: string;
};

export type SustainabilityProject = {
  title: string;
  href: string;
  image: ImageSource | null;
};

export type SustainabilityPageData = {
  title: string;
  description: string;
  hero: ImageSource;
  intro: {
    heading: string;
    text: string;
    image: ImageSource;
  };
  greenStar: {
    heading: string;
    text: string;
    image: ImageSource;
  };
  features: SustainabilityFeature[];
  projects: SustainabilityProject[];
  cta: CtaContent;
};

const query = /* GraphQL */ `
  query SustainabilityPage($slug: [String]!) {
    entries(section: "pages", slug: $slug, limit: 1) {
      ... on pages_Entry {
        pageHeading
        pageSubheading
        pageHeroImage {
          mobile: url @transform(width: 600, height: 800, mode: "crop", format: "webp", quality: 80, immediately: true)
          tablet: url @transform(width: 1440, height: 1000, mode: "crop", format: "webp", quality: 82, immediately: true)
          desktop: url @transform(width: 2400, height: 1200, mode: "crop", format: "webp", quality: 85, immediately: true)
          title
        }
        blocks {
          __typename
          ... on blocks_text_BlockType {
            sectionHeading
            text
            image {
              mobile: url @transform(width: 600, format: "webp", quality: 80, immediately: true)
              tablet: url @transform(width: 900, format: "webp", quality: 80, immediately: true)
              desktop: url @transform(width: 1200, format: "webp", quality: 80, immediately: true)
              title
            }
          }
          ... on blocks_thumbnailGrid_BlockType {
            thumbnailGrid {
              ... on block_Entry {
                heading
                text
                sustainabilityBlockUrl
                image {
                  mobile: url @transform(width: 600, format: "webp", quality: 80, immediately: true)
                  tablet: url @transform(width: 900, format: "webp", quality: 80, immediately: true)
                  desktop: url @transform(width: 1200, format: "webp", quality: 80, immediately: true)
                  title
                }
              }
            }
          }
          ... on blocks_caseStudies_BlockType {
            caseStudies {
              ... on projects_Entry {
                title
                uri
                thumbnail {
                  mobile: url @transform(width: 600, height: 450, mode: "crop", format: "webp", quality: 80, immediately: true)
                  tablet: url @transform(width: 900, height: 675, mode: "crop", format: "webp", quality: 80, immediately: true)
                  desktop: url @transform(width: 1200, height: 900, mode: "crop", format: "webp", quality: 80, immediately: true)
                  title
                }
              }
            }
          }
        }
        ctaSection {
          ctaSectionBackgroundImage {
            mobile: url @transform(width: 600, height: 900, mode: "crop", format: "webp", quality: 80, immediately: true)
            tablet: url @transform(width: 1440, height: 900, mode: "crop", format: "webp", quality: 82, immediately: true)
            desktop: url @transform(width: 2400, height: 1000, mode: "crop", format: "webp", quality: 85, immediately: true)
            title
          }
          ctaSectionHeading
          ctaSectionDescription
          ctaSectionButtonLabel
          ctaSectionButtonUrl
          ctaSectionSecondaryButtonLabel
          ctaSectionSecondaryButtonUrl
        }
      }
    }
  }
`;

const fallbackHero = "/images/hero/hero-sustain.png";
const fallbackGreenStar = "/images/purpose/2e9a811597bffa70c8424f1ad2597538.png 1.png";

function plainText(value: string | null | undefined, heading?: string | null): string {
  const text = (value ?? "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();

  if (heading && text.startsWith(heading)) {
    return text.slice(heading.length).trim();
  }

  return text;
}

function imageFrom(assets?: SustainabilityAsset[], fallback?: ImageSource): ImageSource | null {
  return toImageSource(assets?.[0]) ?? fallback ?? null;
}

function normalizeSustainabilityHref(value: string | null | undefined): string | undefined {
  const href = value?.trim();
  if (!href) return undefined;

  // Preserve existing CMS URLs while making the known legacy typo route-safe.
  return href.replace(/^\/?projecs(?=\/|$)/, "/projects");
}

function fallbackPage(): SustainabilityPageData {
  return {
    title: "A Sustainable Future",
    description:
      "A regenerative, insight-driven approach foregrounds climate-responsive design and long term value.",
    hero: fallbackHero,
    intro: {
      heading: "Giving New Life to Existing Places",
      text: "We extend the life of meaningful buildings, reduce embodied carbon, and celebrate cultural heritage.",
      image: fallbackHero,
    },
    greenStar: {
      heading: "Green Star Accredited Professionals",
      text: "Our multidisciplinary team embeds GBCA principles to realise sustainable, holistic design outcomes.",
      image: fallbackGreenStar,
    },
    features: [
      {
        title: "ADAPTIVE REUSE",
        text: "We design life-changing environments that stand the test of time while extending the use of meaningful buildings through our heritage specialists and experienced design team.",
        image: "/images/home-about.png",
      },
      {
        title: "ADAPTIVE REUSE",
        text: "Successful adaptive reuse supports a positive embodied carbon strategy.",
        image: "/images/home-about.png",
      },
    ],
    projects: [],
    cta: {
      image: "/social-sustainability.png",
      title: "DESIGNING FOR GENERATIONS TO COME",
      description:
        "NBRS continues to evolve its practice through research, partnerships and a deepening commitment to ecological design.",
      buttonText: "DISCOVER NBRS RESEARCH",
      buttonHref: "/research",
      secondaryButtonText: "START A CONVERSATION",
      secondaryButtonHref: "/contact",
    },
  };
}

export async function getSustainabilityPage(): Promise<SustainabilityPageData> {
  try {
    const response = await craftFetch<SustainabilityResponse>(query, {
      slug: ["sustainability"],
    });
    const entry = response.entries?.[0];

    if (!entry) return fallbackPage();

    const textBlocks = (entry.blocks ?? []).filter(
      (block) => block.__typename === "blocks_text_BlockType"
    );
    const gridBlock = entry.blocks?.find(
      (block) => block.__typename === "blocks_thumbnailGrid_BlockType"
    );
    const caseStudiesBlock = entry.blocks?.find(
      (block) => block.__typename === "blocks_caseStudies_BlockType"
    );
    const introBlock = textBlocks[0];
    const greenStarBlock = textBlocks.find(
      (block) => block.sectionHeading === "Green Star Accredited Professionals"
    );
    const fallback = fallbackPage();
    const cta = entry.ctaSection;

    return {
      title: entry.pageHeading || entry.title || fallback.title,
      description: entry.pageSubheading || fallback.description,
      hero: imageFrom(entry.pageHeroImage, fallback.hero) ?? fallback.hero,
      intro: {
        heading: introBlock?.sectionHeading || fallback.intro.heading,
        text: plainText(introBlock?.text, introBlock?.sectionHeading) || fallback.intro.text,
        image: imageFrom(introBlock?.image, fallback.intro.image) ?? fallback.intro.image,
      },
      greenStar: {
        heading: greenStarBlock?.sectionHeading || fallback.greenStar.heading,
        text:
          plainText(greenStarBlock?.text, greenStarBlock?.sectionHeading) ||
          fallback.greenStar.text,
        image:
          imageFrom(greenStarBlock?.image, fallback.greenStar.image) ??
          fallback.greenStar.image,
      },
      features:
        (gridBlock?.__typename === "blocks_thumbnailGrid_BlockType"
          ? gridBlock.thumbnailGrid ?? []
          : []
        )
          .filter((feature) => feature.heading)
          .map((feature) => ({
            title: feature.heading as string,
            text: plainText(feature.text),
            image: imageFrom(feature.image, fallback.features[0].image) ?? fallback.features[0].image,
            href: normalizeSustainabilityHref(feature.sustainabilityBlockUrl),
          })),
      projects:
        (caseStudiesBlock?.__typename === "blocks_caseStudies_BlockType"
          ? caseStudiesBlock.caseStudies ?? []
          : []
        )
          .filter((project) => project.title)
          .map((project) => ({
            title: project.title as string,
            href: project.uri ? `/${project.uri.replace(/^\//, "")}` : "/projects",
            image: imageFrom(project.thumbnail),
          })),
      cta: {
        image:
          imageFrom(cta?.ctaSectionBackgroundImage, fallback.cta.image) ??
          fallback.cta.image,
        title: cta?.ctaSectionHeading || fallback.cta.title,
        description: cta?.ctaSectionDescription || fallback.cta.description,
        buttonText: cta?.ctaSectionButtonLabel || fallback.cta.buttonText,
        buttonHref: cta?.ctaSectionButtonUrl || fallback.cta.buttonHref,
        secondaryButtonText:
          cta?.ctaSectionSecondaryButtonLabel || fallback.cta.secondaryButtonText,
        secondaryButtonHref:
          cta?.ctaSectionSecondaryButtonUrl || fallback.cta.secondaryButtonHref,
      },
    };
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("[getSustainabilityPage] Craft query failed; using fallback data:", error);
    }
    return fallbackPage();
  }
}
