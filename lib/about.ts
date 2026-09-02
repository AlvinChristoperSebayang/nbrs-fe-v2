import { craftFetch } from "./craft";
import { mapCta } from "./cta";
import { toImageSource, toSeoImage, type RawSeoAsset, type SeoImage } from "./media";
import type { CtaContent, ImageSource } from "./types";

type Asset = { mobile?: string; tablet?: string; desktop?: string };
type Entry = {
  seoPageTitle: string | null;
  seoMetaDescription: string | null;
  seoImage: RawSeoAsset[];
  aboutHeroHeading: string | null;
  description2: string | null;
  aboutHeroImage: Asset[];
  aboutIntroHeading: string | null;
  aboutIntroText: string | null;
  aboutIntroImage: Asset[];
  heroTitle: string | null;
  whatWeDoV2: Array<{ title: string | null; description2: string | null; image: Asset[] }>;
  ctaElement: { label: string | null; url_1: { url: string | null } | null } | null;
  aboutPracticeHeading: string | null;
  aboutPracticeText: string | null;
  aboutPracticeImages: Asset[];
  aboutTimelineHeading: string | null;
  timeline: Array<{ year: string | null; text: string | null }>;
  ctaSection: {
    ctaSectionBackgroundImage: Asset[];
    ctaSectionHeading: string | null;
    ctaSectionDescription: string | null;
    ctaSectionButtonLabel: string | null;
    ctaSectionButtonUrl: string | null;
  } | null;
};

type AboutResponse = { entries: Entry[] };

export type AboutContent = {
  cmsSeoTitle: string | null;
  seoDescription: string | null;
  seoImage: SeoImage | null;
  hero: { title: string; description: string; image: ImageSource };
  intro: { heading: string; description: string; image: ImageSource };
  approachHeading: string;
  approachItems: Array<{ title: string; description?: string; image: ImageSource }>;
  viewAll: { label: string; href: string } | null;
  practice: { heading: string; description: string; images: [ImageSource, ImageSource, ImageSource, ImageSource] };
  timeline: { heading: string; items: Array<{ year: string; description: string }> };
  cta: CtaContent;
};

export const ABOUT_FALLBACK: AboutContent = {
  cmsSeoTitle: null,
  seoDescription: null,
  seoImage: null,
  hero: {
    title: "Designing Environments\nThat Shape Lives",
    description:
      "Working collaboratively with clients and communities to create enduring, human centred places.",
    image: "/images/hero/about-hero.png",
  },
  intro: {
    heading: "WHO WE ARE",
    description:
      "NBRS is a purpose-led design practice working across Australia. For over 50 years, we have brought together architecture, interior design, landscape architecture and heritage expertise to create spaces that enhance wellbeing and transform communities.",
    image: "/images/about-us-about.png",
  },
  approachHeading: "WHAT WE DO",
  approachItems: [
    {
      title: "EDUCATION",
      description: "Innovative learning environments tailored to evolving pedagogies.",
      image: "/images/about/practice1.jpg",
    },
    {
      title: "HERITAGE",
      description: "Conservation and adaptive reuse breathing new life into history.",
      image: "/images/about/practice2.jpg",
    },
    {
      title: "WELLNESS",
      description: "Therapeutic healthcare design focused on human healing.",
      image: "/images/about/practice3.jpg",
    },
  ],
  viewAll: { label: "VIEW ALL SECTORS", href: "/sectors" },
  practice: {
    heading: "OUR INTEGRATED PRACTICE",
    description:
      "A combined methodology bridging architecture, interiors, landscape, and heritage conservation under one collaborative roof.",
    images: [
      "/images/about/practice1.jpg",
      "/images/about/practice2.jpg",
      "/images/about/practice3.jpg",
      "/images/about/practice4.jpg",
    ],
  },
  timeline: {
    heading: "OUR JOURNEY",
    items: [
      { year: "1968", description: "NBRS founded in Sydney with a vision for community architecture." },
      { year: "1995", description: "Expanded into specialist heritage conservation and educational masterplanning." },
      { year: "2010", description: "Integrated landscape architecture and interior design disciplines." },
      { year: "2024", description: "Established Melbourne and Brisbane studios to serve national projects." },
    ],
  },
  cta: {
    image: "/images/contact-bg.png",
    title: "LET'S SHAPE WHAT'S NEXT-TOGETHER",
    description:
      "Whether it's a place to gather, to heal, to learn or to live - we're ready to collaborate. Let's shape spaces that matter, together.",
    buttonText: "Contact Us",
    buttonHref: "/contact",
  },
};

const crop = (width: number, height: number, quality = 80) =>
  `url @transform(width: ${width}, height: ${height}, mode: "crop", format: "webp", quality: ${quality}, immediately: true)`;
const heroFit = (width: number, quality = 85) =>
  `url @transform(width: ${width}, mode: "fit", format: "webp", quality: ${quality}, immediately: true)`;
const hero = `mobile: ${heroFit(768, 80)} tablet: ${heroFit(1440, 82)} desktop: ${heroFit(2400, 85)}`;
const landscape = `mobile: ${crop(600, 450)} tablet: ${crop(900, 675)} desktop: ${crop(1200, 900)}`;
const cta = `mobile: ${crop(600, 900)} tablet: ${crop(1440, 900, 82)} desktop: ${crop(2400, 1000, 85)}`;

const CTA_QUERY = /* GraphQL */ `
  query AboutPage {
    entries(section: ["aboutUs"], limit: 1) {
      ... on aboutUs3_Entry {
        seoPageTitle
        seoMetaDescription
        seoImage { url width height title }
        aboutHeroHeading
        description2
      aboutHeroImage { ${hero} }
        aboutIntroHeading
        aboutIntroText
      aboutIntroImage { ${landscape} }
      heroTitle
      whatWeDoV2 {
        ... on whatWeDoContent_Entry {
          title
          description2
          image { ${landscape} }
          }
        }
        ctaElement {
        label
        url_1 { url }
      }
      aboutPracticeHeading
      aboutPracticeText
      aboutPracticeImages { ${landscape} }
      aboutTimelineHeading
      timeline {
        ... on slide2_Entry {
          year
          text
        }
      }
      ctaSection {
        ctaSectionBackgroundImage { ${cta} }
          ctaSectionHeading
          ctaSectionDescription
          ctaSectionButtonLabel
          ctaSectionButtonUrl
        }
      }
    }
  }
`;

export async function getAboutContent(): Promise<AboutContent> {
  try {
    const data = await craftFetch<AboutResponse>(CTA_QUERY);
    const about = data.entries?.[0];

    if (!about) return ABOUT_FALLBACK;

    const approachItems = (about.whatWeDoV2 ?? [])
      .filter((item) => item.title && toImageSource(item.image[0]))
      .map((item) => ({
        title: item.title!.replace(/\n/g, " "),
        description: item.description2?.trim() || undefined,
        image: toImageSource(item.image[0])!,
      }));
    const ctaLabel = about.ctaElement?.label?.trim();
    const ctaUrl = about.ctaElement?.url_1?.url?.trim();

    return {
      cmsSeoTitle: about.seoPageTitle?.trim() || null,
      seoDescription: about.seoMetaDescription?.trim() || null,
      seoImage: toSeoImage(about.seoImage?.[0]),
      hero: {
        title: (about.aboutHeroHeading?.trim() || ABOUT_FALLBACK.hero.title).includes("\n")
          ? (about.aboutHeroHeading?.trim() || ABOUT_FALLBACK.hero.title)
          : (about.aboutHeroHeading?.trim() || ABOUT_FALLBACK.hero.title).replace(/\s+(That|that)\s+/, "\n$1 "),
        description: about.description2?.trim() || ABOUT_FALLBACK.hero.description,
        image: toImageSource(about.aboutHeroImage?.[0]) || ABOUT_FALLBACK.hero.image,
      },
      intro: {
        heading: about.aboutIntroHeading?.trim() || ABOUT_FALLBACK.intro.heading,
        description: about.aboutIntroText?.trim() || ABOUT_FALLBACK.intro.description,
        image: toImageSource(about.aboutIntroImage?.[0]) || ABOUT_FALLBACK.intro.image,
      },
      approachHeading: about.heroTitle?.trim() || ABOUT_FALLBACK.approachHeading,
      approachItems: approachItems.length ? approachItems : ABOUT_FALLBACK.approachItems,
      viewAll: ctaLabel && ctaUrl ? { label: ctaLabel, href: ctaUrl } : null,
      practice: {
        heading: about.aboutPracticeHeading?.trim() || ABOUT_FALLBACK.practice.heading,
        description: about.aboutPracticeText?.trim() || ABOUT_FALLBACK.practice.description,
        images: about.aboutPracticeImages?.length === 4 && about.aboutPracticeImages.every(toImageSource)
          ? [toImageSource(about.aboutPracticeImages[0])!, toImageSource(about.aboutPracticeImages[1])!, toImageSource(about.aboutPracticeImages[2])!, toImageSource(about.aboutPracticeImages[3])!]
          : ABOUT_FALLBACK.practice.images,
      },
      timeline: {
        heading: about.aboutTimelineHeading?.trim() || ABOUT_FALLBACK.timeline.heading,
        items: (about.timeline ?? [])
          .filter((item) => item.year?.trim() && item.text?.trim())
          .map((item) => ({ year: item.year!.trim(), description: item.text!.trim() })),
      },
      cta: mapCta({ ctaSection: about.ctaSection }, ABOUT_FALLBACK.cta),
    };
  } catch (error) {
    console.warn("Failed to load About content from Craft, using fallback:", error);
    return ABOUT_FALLBACK;
  }
}
