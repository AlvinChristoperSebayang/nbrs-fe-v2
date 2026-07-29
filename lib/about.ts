import { craftFetch } from "./craft";
import { mapCta } from "./cta";
import type { CtaContent, NewsItem } from "./types";

type Asset = { url: string };

type RawAboutEntry = {
  aboutHeroHeading: string | null;
  description2: string | null;
  heroTitle: string | null;
  aboutHeroImage: Asset[];
  aboutIntroHeading: string | null;
  aboutIntroText: string | null;
  aboutIntroImage: Asset[];
  aboutPracticeHeading: string | null;
  aboutPracticeText: string | null;
  aboutPracticeImages: Asset[];
  aboutTimelineHeading: string | null;
  timeline: Array<{ year: string | null; text: string | null }>;
  whatWeDoV2: Array<{ title: string | null; description2: string | null; image: Asset[] }>;
  ctaElement: {
    label: string | null;
    url_1: { url: string | null } | null;
  } | null;
  ctaSection: {
    ctaSectionBackgroundImage: Asset[];
    ctaSectionHeading: string | null;
    ctaSectionDescription: string | null;
    ctaSectionButtonLabel: string | null;
    ctaSectionButtonUrl: string | null;
  } | null;
};

type AboutResponse = { entries: RawAboutEntry[] };

export type AboutContent = {
  hero: { title: string; description: string; image: string };
  intro: { heading: string; description: string; image: string };
  approachHeading: string;
  approachItems: NewsItem[];
  viewAll: { label: string; href: string } | null;
  practice: { heading: string; description: string; images: [string, string, string, string] };
  timeline: { heading: string; items: Array<{ year: string; description: string }> };
  cta: CtaContent;
};

export const ABOUT_FALLBACK: AboutContent = {
  hero: {
    title: "Designing Environments That Influence Society",
    description: "NBRS approaches architecture and design as a social art, uplifting people, connecting communities, and shaping how we live.",
    image: "/images/hero/about-hero.png",
  },
  intro: {
    heading: "People-centred design for good",
    description: "We create environments that foster wellbeing, belonging and transformation. Design that responds directly to human needs.",
    image: "/images/about-us-about.png",
  },
  approachHeading: "What We Do",
  approachItems: [
    { title: "SOCIAL ARCHITECTURE", image: "/images/hero/about-hero.png", description: "People and community at the core." },
    { title: "REAL INSIGHT", image: "/images/about/real-insight.jpg", description: "We design for the people who will use the spaces we create." },
    { title: "CREATIVE PARTNERSHIPS", image: "/images/about/creative-partnership.jpg", description: "We collaborate with clients, communities and stakeholders to create spaces that matter." },
  ],
  viewAll: null,
  practice: {
    heading: "A Practice Built on Care, Joy and Collaboration",
    description: "Integrated design studios across Sydney and Melbourne, including architecture, interior design, landscape architecture and heritage advice. United by a mission to design for people, place and purpose.",
    images: ["/images/about/practice1.jpg", "/images/about/practice2.jpg", "/images/about/practice3.jpg", "/images/about/practice4.jpg"],
  },
  timeline: {
    heading: "Founded in 1968",
    items: [
      { year: "1968", description: "Founded by Noel Bell and Ridley Smith. First project Anglicare St Johns Village Glebe." },
      { year: "1976", description: "St Andrew's House - First high rise school." },
      { year: "1983", description: "NBRS receives Sulman Award for Parklea Correctional Centre." },
      { year: "1998", description: "Olympic Upgrade - City of Sydney George Street & Circular Quay." },
      { year: "2002", description: "Convention Centre, Hillsong Church & Vista built." },
      { year: "2022", description: "Studios open in Melbourne, expanding NBRS nationally." },
      { year: "2025", description: "Celebrating decades of designing for people, place and purpose." },
    ],
  },
  cta: {
    image: "/images/contact-bg.png",
    title: "Let's Shape What's Next-Together",
    description: "Whether it's a place to gather, to heal, to learn or to live - we're ready to collaborate. Let's shape spaces that matter, together.",
    buttonText: "Let's Shape What's Next-Together",
    buttonHref: "/contact",
  },
};

const ABOUT_QUERY = /* GraphQL */ `
  query AboutPage {
    entries(section: ["aboutUs"], limit: 1) {
      ... on aboutUs3_Entry {
        description2
        heroTitle
        aboutHeroHeading
        aboutHeroImage { url }
        aboutIntroHeading
        aboutIntroText
        aboutIntroImage { url }
        aboutPracticeHeading
        aboutPracticeText
        aboutPracticeImages { url }
        aboutTimelineHeading
        timeline { ... on slide2_Entry { year text } }
        whatWeDoV2 { ... on whatWeDoContent_Entry { title description2 image { url } } }
        ctaElement { label url_1 { url } }
        ctaSection {
          ctaSectionBackgroundImage { url }
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
  const data = await craftFetch<AboutResponse>(ABOUT_QUERY);
  const about = data.entries[0];

  if (!about) return ABOUT_FALLBACK;

  const approachItems = about.whatWeDoV2
    .filter((item) => item.title && item.image[0]?.url)
    .map((item) => ({
      title: item.title!.replace(/\n/g, " "),
      description: item.description2?.trim() || undefined,
      image: item.image[0].url,
    }));
  const ctaLabel = about.ctaElement?.label?.trim();
  const ctaUrl = about.ctaElement?.url_1?.url?.trim();

  return {
    hero: {
      title: about.aboutHeroHeading?.trim() || ABOUT_FALLBACK.hero.title,
      description: about.description2?.trim() || ABOUT_FALLBACK.hero.description,
      image: about.aboutHeroImage[0]?.url || ABOUT_FALLBACK.hero.image,
    },
    intro: {
      heading: about.aboutIntroHeading?.trim() || ABOUT_FALLBACK.intro.heading,
      description: about.aboutIntroText?.trim() || ABOUT_FALLBACK.intro.description,
      image: about.aboutIntroImage[0]?.url || ABOUT_FALLBACK.intro.image,
    },
    approachHeading: about.heroTitle?.trim() || ABOUT_FALLBACK.approachHeading,
    approachItems: approachItems.length ? approachItems : ABOUT_FALLBACK.approachItems,
    viewAll: ctaLabel && ctaUrl ? { label: ctaLabel, href: ctaUrl } : null,
    practice: {
      heading: about.aboutPracticeHeading?.trim() || ABOUT_FALLBACK.practice.heading,
      description: about.aboutPracticeText?.trim() || ABOUT_FALLBACK.practice.description,
      images: about.aboutPracticeImages.length === 4
        ? [about.aboutPracticeImages[0].url, about.aboutPracticeImages[1].url, about.aboutPracticeImages[2].url, about.aboutPracticeImages[3].url]
        : ABOUT_FALLBACK.practice.images,
    },
    timeline: {
      heading: about.aboutTimelineHeading?.trim() || ABOUT_FALLBACK.timeline.heading,
      items: about.timeline
        .filter((item) => item.year?.trim() && item.text?.trim())
        .map((item) => ({ year: item.year!.trim(), description: item.text!.trim() })),
    },
    cta: mapCta({ ctaSection: about.ctaSection }, ABOUT_FALLBACK.cta),
  };
}
