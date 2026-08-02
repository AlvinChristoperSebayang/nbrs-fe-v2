import { craftFetch } from "./craft";
import { toImageSource, type RawResponsiveAsset } from "./media";
import type { CtaContent, ImageSource } from "./types";

type RawTextBlock = {
  __typename: "blocks_text_BlockType";
  sectionHeading: string | null;
  text: string | null;
  image: RawResponsiveAsset[];
};

type RawPage = {
  pageHeading: string | null;
  pageSubheading: string | null;
  pageHeroImage: RawResponsiveAsset[];
  blocks: RawTextBlock[];
  ctaSection: {
    ctaSectionBackgroundImage: RawResponsiveAsset[];
    ctaSectionHeading: string | null;
    ctaSectionDescription: string | null;
    ctaSectionButtonLabel: string | null;
    ctaSectionButtonUrl: string | null;
  } | null;
};

type DesigningForPeopleResponse = {
  page: RawPage[];
};

export type DesigningForPeoplePageContent = {
  hero: {
    title: string;
    description: string;
    image: ImageSource;
  };
  intro: {
    heading: string;
    description: string;
    image: ImageSource;
  };
  cta: CtaContent;
};

const FALLBACK: DesigningForPeoplePageContent = {
  hero: {
    title: "DESIGNING FOR PEOPLE",
    description: "A collective of visionary leaders, architects, interior designers, and researchers.",
    image: "/images/hero/about-hero.png",
  },
  intro: {
    heading: "Diverse expertise united by design purpose",
    description: "Our multidisciplinary practice brings together passionate leaders and creative specialists to craft human-centric places across Australia and beyond.",
    image: "/images/about-us-about.png",
  },
  cta: {
    image: "/images/contact-bg.png",
    title: "GET IN TOUCH",
    description: "Want to join our collective or collaborate on a project? Reach out to our leadership team.",
    buttonText: "CONTACT US",
    buttonHref: "/contact",
  },
};

const DESIGNING_FOR_PEOPLE_QUERY = /* GraphQL */ `
  query DesigningForPeoplePage {
    page: entries(section: ["pages"], slug: ["designing-for-people"], limit: 1) {
      ... on pages_Entry {
        pageHeading
        pageSubheading
        pageHeroImage {
          mobile: url @transform(width: 600, height: 800, mode: "crop", format: "webp", quality: 80, immediately: true)
          tablet: url @transform(width: 1440, height: 1000, mode: "crop", format: "webp", quality: 82, immediately: true)
          desktop: url @transform(width: 2400, height: 1200, mode: "crop", format: "webp", quality: 85, immediately: true)
        }
        blocks {
          __typename
          ... on blocks_text_BlockType {
            sectionHeading
            text
            image {
              mobile: url @transform(width: 600, height: 450, mode: "crop", format: "webp", quality: 80, immediately: true)
              tablet: url @transform(width: 900, height: 675, mode: "crop", format: "webp", quality: 82, immediately: true)
              desktop: url @transform(width: 1200, height: 900, mode: "crop", format: "webp", quality: 85, immediately: true)
            }
          }
        }
        ctaSection {
          ctaSectionBackgroundImage {
            mobile: url @transform(width: 600, height: 900, mode: "crop", format: "webp", quality: 80, immediately: true)
            tablet: url @transform(width: 1440, height: 900, mode: "crop", format: "webp", quality: 82, immediately: true)
            desktop: url @transform(width: 2400, height: 1000, mode: "crop", format: "webp", quality: 85, immediately: true)
          }
          ctaSectionHeading
          ctaSectionDescription
          ctaSectionButtonLabel
          ctaSectionButtonUrl
        }
      }
    }
  }
`;

function clean(value: string | null | undefined): string {
  return value?.replace(/<[^>]+>/g, "").trim() ?? "";
}

export async function getDesigningForPeoplePage(): Promise<DesigningForPeoplePageContent> {
  try {
    const data = await craftFetch<DesigningForPeopleResponse>(DESIGNING_FOR_PEOPLE_QUERY);
    const entry = data.page[0];

    if (!entry) return FALLBACK;

    const intro = entry.blocks.find((block) => block.__typename === "blocks_text_BlockType");
    const cta = entry.ctaSection;

    return {
      hero: {
        ...FALLBACK.hero,
        title: clean(entry.pageHeading) || FALLBACK.hero.title,
        description: clean(entry.pageSubheading) || FALLBACK.hero.description,
        image: toImageSource(entry.pageHeroImage[0]) || FALLBACK.hero.image,
      },
      intro: {
        heading: clean(intro?.sectionHeading) || FALLBACK.intro.heading,
        description: clean(intro?.text) || FALLBACK.intro.description,
        image: toImageSource(intro?.image?.[0]) || FALLBACK.intro.image,
      },
      cta: {
        image: toImageSource(cta?.ctaSectionBackgroundImage?.[0]) || FALLBACK.cta.image,
        title: clean(cta?.ctaSectionHeading) || FALLBACK.cta.title,
        description: clean(cta?.ctaSectionDescription) || FALLBACK.cta.description,
        buttonText: clean(cta?.ctaSectionButtonLabel) || FALLBACK.cta.buttonText,
        buttonHref: clean(cta?.ctaSectionButtonUrl) || FALLBACK.cta.buttonHref,
      },
    };
  } catch {
    return FALLBACK;
  }
}
