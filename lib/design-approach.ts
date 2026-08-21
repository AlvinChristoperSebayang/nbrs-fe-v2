import { craftFetch } from "./craft";
import { mapCta } from "./cta";
import { toImageSource } from "./media";
import type { CtaContent, ImageSource, NewsItem } from "./types";

type Asset = {
  mobile?: string;
  tablet?: string;
  desktop?: string;
};

type Entry = {
  designApproachHeroHeading: string | null;
  designApproachHeroDescription: string | null;
  designApproachHeroImage: Asset[];
  designApproachHeroCtaLabel: string | null;
  designApproachHeroCtaUrl: string | null;
  designApproachPillarsHeading: string | null;
  designApproachPillarsDescription: string | null;
  thumbnailGrid: Array<{ heading: string | null; text: string | null; image: Asset[] }>;
  designApproachCommunitiesHeading: string | null;
  designApproachCommunitiesDescription: string | null;
  gallery: Array<{ image: Asset[] }>;
  thumbnailImage: Asset[];
  quote: string | null;
  citation: string | null;
  jobRole: string | null;
  sectionHeading: string | null;
  text: string | null;
  image: Asset[];
  links: Array<{ linkText: string | null; linkUrl: string | null }>;
  ctaSection: {
    ctaSectionBackgroundImage: Asset[];
    ctaSectionHeading: string | null;
    ctaSectionDescription: string | null;
    ctaSectionButtonLabel: string | null;
    ctaSectionButtonUrl: string | null;
  } | null;
};

export type DesignApproachContent = {
  hero: {
    title: string;
    description: string;
    image: ImageSource;
    button: { text: string; href: string };
  };
  pillars: {
    title: string;
    description: string;
    items: NewsItem[];
  };
  communities: {
    heading: string;
    description: string;
    topImages: ImageSource[];
    galleryImages: ImageSource[];
  };
  quote: {
    image: ImageSource;
    quote: string;
    author: string;
    role: string;
  };
  project: {
    heading: string;
    description: string;
    image: ImageSource;
    buttonText: string;
    buttonHref: string;
  };
  cta: CtaContent;
};

export const DESIGN_APPROACH_FALLBACK: DesignApproachContent = {
  hero: {
    title: "From Insight to\nTransformative Design",
    description: "Every project begins with curiosity and ends with environments that enhance the way people live.",
    image: "/images/hero/hero-design-approach.png",
    button: { text: "See Our Sectors", href: "/projects" },
  },
  pillars: {
    title: "Three Pillars of Design",
    description:
      "Every NBRS project - whether a school, civic centre, hospital or secure space - follows a consistent methodology that adapts to context but never loses its foundation. We call it our Three Pillars:",
    items: [
      {
        title: "Site & Program",
        description: "Listening, research and immersion.",
        image: "/images/design-approach/pillar1.jpg",
      },
      {
        title: "Cultural Heritage",
        description: "Honouring place, country and culture.",
        image: "/images/design-approach/pillar2.jpg",
      },
      {
        title: "The Big Idea",
        description: "A unifying concept guiding decision making, which brings to life a balanced, joyful design.",
        image: "/images/design-approach/pillar3.jpg",
      },
    ],
  },
  communities: {
    heading: "Designing with Communities",
    description:
      "Through facilitated conversations and workshops, we uncover the social, cultural and emotional layers that inform meaningful, place-specific solutions.",
    topImages: [
      "/images/design-approach/communities1.jpg",
      "/images/design-approach/communities2.jpg",
    ],
    galleryImages: [
      "/images/design-approach/communities3.jpg",
      "/images/design-approach/communities4.png",
      "/images/design-approach/communities5.jpg",
    ],
  },
  quote: {
    image: "/images/design-approach/andrew-duffin.jpg",
    quote: "Architecture should never be imposed. It should emerge through dialogue.",
    author: "Andrew Duffin",
    role: "Director of Design",
  },
  project: {
    heading: "From Possibility to Place",
    description: "We follow through with discipline and detail to ensure every design achieves its intended impact.",
    image: "/images/design-approach/possibility.png",
    buttonText: "View Projects",
    buttonHref: "/projects",
  },
  cta: {
    image: "/images/contact-bg.png",
    title: "Get in touch",
    description:
      "Whether it's a place to gather, to heal, to learn or to live - we're ready to collaborate. Let's shape spaces that matter, together.",
    buttonText: "Contact Us",
    buttonHref: "/contact",
  },
};

const crop = (width: number, height: number, quality = 80) =>
  `url @transform(width: ${width}, height: ${height}, mode: "crop", format: "webp", quality: ${quality}, immediately: true)`;
const landscape = `mobile: ${crop(600, 450)} tablet: ${crop(900, 675)} desktop: ${crop(1200, 900)}`;
const hero = `mobile: ${crop(600, 800)} tablet: ${crop(1440, 1000, 82)} desktop: ${crop(2400, 1200, 85)}`;
const cta = `mobile: ${crop(600, 900)} tablet: ${crop(1440, 900, 82)} desktop: ${crop(2400, 1000, 85)}`;

const QUERY = /* GraphQL */ `
  query DesignApproachPage {
    entries(section: ["designApproach"], limit: 1) {
      ... on designApproach_Entry {
        designApproachHeroHeading
        designApproachHeroDescription
        designApproachHeroImage {
          ${hero}
        }
        designApproachHeroCtaLabel
        designApproachHeroCtaUrl
        designApproachPillarsHeading
        designApproachPillarsDescription
        thumbnailGrid {
          ... on block_Entry {
            heading
            text
            image {
              ${landscape}
            }
          }
        }
        designApproachCommunitiesHeading
        designApproachCommunitiesDescription
        gallery {
          ... on slide5_Entry {
            image {
              ${landscape}
            }
          }
        }
        thumbnailImage {
          mobile: ${crop(600, 750)}
          tablet: ${crop(900, 900)}
          desktop: ${crop(1200, 900)}
        }
        quote
        citation
        jobRole
        sectionHeading
        text
        image {
          ${landscape}
        }
        links {
          ... on links_Entry {
            linkText
            linkUrl
          }
        }
        ctaSection {
          ctaSectionBackgroundImage {
            ${cta}
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

function text(value: string | null): string | null {
  return value?.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim() || null;
}

function path(value: string | null): string | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    return /(^|\.)nbrs(-staging)?\.test$/.test(url.hostname) || /(^|\.)nbrs\.com\.au$/.test(url.hostname)
      ? `${url.pathname}${url.search}${url.hash}`
      : value;
  } catch {
    return value;
  }
}

export async function getDesignApproachContent(): Promise<DesignApproachContent> {
  try {
    const data = await craftFetch<{ entries: Entry[] }>(QUERY);
    const entry = data.entries?.[0];
    if (!entry) return DESIGN_APPROACH_FALLBACK;

    const items = entry.thumbnailGrid
      .filter((item) => item.heading?.trim() && toImageSource(item.image[0]))
      .map((item) => ({
        title: item.heading!.trim(),
        description: item.text?.trim() || undefined,
        image: toImageSource(item.image[0])!,
      }));

    const images = entry.gallery
      .map((item) => toImageSource(item.image[0]))
      .filter((image): image is ImageSource => Boolean(image));

    const link = entry.links[0];

    return {
      hero: {
        title: (entry.designApproachHeroHeading?.trim() || DESIGN_APPROACH_FALLBACK.hero.title).replace(
          "From Insight to Transformative Design",
          "From Insight to\nTransformative Design"
        ),
        description: entry.designApproachHeroDescription?.trim() || DESIGN_APPROACH_FALLBACK.hero.description,
        image: toImageSource(entry.designApproachHeroImage[0]) || DESIGN_APPROACH_FALLBACK.hero.image,
        button: {
          text: entry.designApproachHeroCtaLabel?.trim() || DESIGN_APPROACH_FALLBACK.hero.button.text,
          href: entry.designApproachHeroCtaUrl?.trim() || DESIGN_APPROACH_FALLBACK.hero.button.href,
        },
      },
      pillars: {
        title: entry.designApproachPillarsHeading?.trim() || DESIGN_APPROACH_FALLBACK.pillars.title,
        description: entry.designApproachPillarsDescription?.trim() || DESIGN_APPROACH_FALLBACK.pillars.description,
        items: items.length ? items : DESIGN_APPROACH_FALLBACK.pillars.items,
      },
      communities: {
        heading: entry.designApproachCommunitiesHeading?.trim() || DESIGN_APPROACH_FALLBACK.communities.heading,
        description:
          entry.designApproachCommunitiesDescription?.trim() || DESIGN_APPROACH_FALLBACK.communities.description,
        topImages: images.length >= 5 ? images.slice(0, 2) : DESIGN_APPROACH_FALLBACK.communities.topImages,
        galleryImages: images.length >= 5 ? images.slice(2, 5) : DESIGN_APPROACH_FALLBACK.communities.galleryImages,
      },
      quote: {
        image: toImageSource(entry.thumbnailImage[0]) || DESIGN_APPROACH_FALLBACK.quote.image,
        quote: entry.quote?.trim() || DESIGN_APPROACH_FALLBACK.quote.quote,
        author: entry.citation?.trim() || DESIGN_APPROACH_FALLBACK.quote.author,
        role: entry.jobRole?.trim() || DESIGN_APPROACH_FALLBACK.quote.role,
      },
      project: {
        heading: entry.sectionHeading?.trim() || DESIGN_APPROACH_FALLBACK.project.heading,
        description: text(entry.text) || DESIGN_APPROACH_FALLBACK.project.description,
        image: toImageSource(entry.image[0]) || DESIGN_APPROACH_FALLBACK.project.image,
        buttonText: link?.linkText?.trim() || DESIGN_APPROACH_FALLBACK.project.buttonText,
        buttonHref: path(link?.linkUrl) || DESIGN_APPROACH_FALLBACK.project.buttonHref,
      },
      cta: mapCta(entry, DESIGN_APPROACH_FALLBACK.cta),
    };
  } catch (error) {
    console.warn("Failed to fetch design approach from Craft, using fallback:", error);
    return DESIGN_APPROACH_FALLBACK;
  }
}

