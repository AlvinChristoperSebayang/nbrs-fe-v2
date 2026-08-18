import { craftFetch } from "./craft";
import { toImageSource, toSeoImage, type RawResponsiveAsset, type RawSeoAsset, type SeoImage } from "./media";
import type { CtaContent, ImageSource } from "./types";
import type { FastFact } from "@/components/people/FastFactsSection";
import type { SubMenuCard } from "@/components/people/PeopleNavigationGrid";

type RawTextBlock = {
  __typename: "blocks_text_BlockType";
  sectionHeading: string | null;
  text: string | null;
  image: RawResponsiveAsset[];
};
type RawNavigationBlock = { __typename: "blocks_peopleNavigation_BlockType"; peopleNavigationCards: Array<{ peopleNavigationCardTitle: string | null; peopleNavigationCardDescription: string | null; peopleNavigationCardAction: string | null; peopleNavigationCardUrl: string | null; peopleNavigationCardImage: RawResponsiveAsset[] }> };
type RawFactsBlock = { __typename: "blocks_fastFacts_BlockType"; sectionHeading: string | null; fastFacts: Array<{ fastFactValue: string | null; fastFactLabel: string | null }> };

type RawPage = {
  pageHeading: string | null;
  pageSubheading: string | null;
  seoPageTitle: string | null;
  seoMetaDescription: string | null;
  seoImage: RawSeoAsset[];
  pageHeroImage: Array<RawResponsiveAsset & RawSeoAsset>;
  blocks: Array<RawTextBlock | RawNavigationBlock | RawFactsBlock>;
  ctaSection: {
    ctaSectionBackgroundImage: RawResponsiveAsset[];
    ctaSectionHeading: string | null;
    ctaSectionDescription: string | null;
    ctaSectionButtonLabel: string | null;
    ctaSectionButtonUrl: string | null;
    ctaSectionSecondaryButtonLabel: string | null;
    ctaSectionSecondaryButtonUrl: string | null;
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
  navigationCards: SubMenuCard[];
  fastFacts: { heading: string; items: FastFact[] };
  cmsSeoTitle: string | null;
  seoDescription: string;
  seoImage: SeoImage | null;
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
    title: "LOOKING TO PARTNER OR FOR A NEW CAREER CHAPTER?",
    description: "Let's start a conversation",
    buttonText: "CONTACT NBRS",
    buttonHref: "/contact",
    secondaryButtonText: "LATEST INSIGHTS",
    secondaryButtonHref: "/news",
  },
  navigationCards: [],
  fastFacts: { heading: "", items: [] },
  cmsSeoTitle: null,
  seoDescription: "A collective of visionary leaders, architects, interior designers, and researchers.",
  seoImage: null,
};

const DESIGNING_FOR_PEOPLE_QUERY = /* GraphQL */ `
  query DesigningForPeoplePage {
    page: entries(section: ["pages"], slug: ["designing-for-people"], limit: 1) {
      ... on pages_Entry {
        pageHeading
        pageSubheading
        seoPageTitle
        seoMetaDescription
        seoImage { url width height title }
        pageHeroImage {
          url
          width
          height
          title
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
          ... on blocks_peopleNavigation_BlockType { peopleNavigationCards { ... on peopleNavigationCard_Entry { peopleNavigationCardTitle peopleNavigationCardDescription peopleNavigationCardAction peopleNavigationCardUrl peopleNavigationCardImage { mobile: url @transform(width: 600, height: 450, mode: "crop", format: "webp", quality: 80, immediately: true) tablet: url @transform(width: 900, height: 675, mode: "crop", format: "webp", quality: 82, immediately: true) desktop: url @transform(width: 1200, height: 900, mode: "crop", format: "webp", quality: 85, immediately: true) } } } }
          ... on blocks_fastFacts_BlockType { sectionHeading fastFacts { ... on fastFact_Entry { fastFactValue fastFactLabel } } }
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
          ctaSectionSecondaryButtonLabel
          ctaSectionSecondaryButtonUrl
        }
      }
    }
  }
`;

function clean(value: string | null | undefined): string {
  if (!value) return "";
  return value
    .replace(/<[^>]+>/g, "")
    .replace(/Let\?\?\?s/gi, "Let's")
    .replace(/\?\?\?/g, "'")
    .trim();
}

export async function getDesigningForPeoplePage(): Promise<DesigningForPeoplePageContent> {
  try {
    const data = await craftFetch<DesigningForPeopleResponse>(DESIGNING_FOR_PEOPLE_QUERY);
    const entry = data.page[0];

    if (!entry) return FALLBACK;

    const intro = entry.blocks.find((block): block is RawTextBlock => block.__typename === "blocks_text_BlockType");
    const navigation = entry.blocks.find((block): block is RawNavigationBlock => block.__typename === "blocks_peopleNavigation_BlockType");
    const facts = entry.blocks.find((block): block is RawFactsBlock => block.__typename === "blocks_fastFacts_BlockType");
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
        secondaryButtonText: clean(cta?.ctaSectionSecondaryButtonLabel) || FALLBACK.cta.secondaryButtonText,
        secondaryButtonHref: clean(cta?.ctaSectionSecondaryButtonUrl) || FALLBACK.cta.secondaryButtonHref,
      },
      navigationCards: (navigation?.peopleNavigationCards ?? []).flatMap((card, index) => {
        const image = toImageSource(card.peopleNavigationCardImage[0]);
        const title = clean(card.peopleNavigationCardTitle);
        const href = clean(card.peopleNavigationCardUrl);
        if (!image || !title || !href) return [];
        return [{ id: `card-${index}`, title, description: clean(card.peopleNavigationCardDescription), actionText: clean(card.peopleNavigationCardAction), href, image }];
      }),
      fastFacts: { heading: clean(facts?.sectionHeading), items: (facts?.fastFacts ?? []).flatMap((fact) => { const number = clean(fact.fastFactValue); const label = clean(fact.fastFactLabel); return number && label ? [{ number, label }] : []; }) },
      cmsSeoTitle: entry.seoPageTitle?.trim() || null,
      seoDescription: entry.seoMetaDescription?.trim() || clean(entry.pageSubheading) || FALLBACK.seoDescription,
      seoImage: toSeoImage(entry.seoImage?.[0]) || toSeoImage(entry.pageHeroImage?.[0]),
    };
  } catch {
    return FALLBACK;
  }
}
