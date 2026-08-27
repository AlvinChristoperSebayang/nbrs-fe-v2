import { craftFetch } from "./craft";
import { toImageSource, toSeoImage, type RawSeoAsset, type SeoImage } from "./media";
import type { PracticeCardItem } from "@/components/practices/PracticesHoverSection";
import type { ImageSource } from "./types";

type Asset = { mobile?: string; tablet?: string; desktop?: string };
type PracticeCategory = {
  id: string;
  title: string;
  slug: string;
  tagline: string | null;
  thumbnail: Asset[];
};
type Entry = {
  seoPageTitle: string | null;
  seoMetaDescription: string | null;
  seoImage: RawSeoAsset[];
  practicesHeroHeading: string | null;
  practicesHeroDescription: string | null;
  practicesHeroImage: Asset[];
  practicesIntroHeading: string | null;
  practicesIntroDescription: string | null;
  practicesIntroImage: Asset[];
  practiceFeatured: PracticeCategory[];
};

export type PracticesPageContent = {
  cmsSeoTitle: string | null;
  seoDescription: string | null;
  seoImage: SeoImage | null;
  hero: { title: string; description: string; image: ImageSource };
  intro: { heading: string; description: string; image: ImageSource };
  practices: PracticeCardItem[];
};

const FALLBACK: PracticesPageContent = {
  cmsSeoTitle: null,
  seoDescription: null,
  seoImage: null,
  hero: {
    title: "EXPLORING\nOUR PRACTICES ?",
    description: "Design for purpose, responding to people.",
    image: "/images/hero/hero2.png",
  },
  intro: {
    heading: "OUR PRACTICES AT A GLANCE",
    description: "Our practice integrates Architecture, Interior Design, and Landscape Architecture to create thoughtful, people-centred environments.",
    image: "/images/about-us-about.png",
  },
  practices: [
    { id: "architecture", title: "ARCHITECTURE", description: "Design for purpose, responding to people.", image: "/images/hero/hero1.png", bgImage: "/images/hero/hero1.png", href: "/practices/architecture" },
    { id: "interiors", title: "INTERIOR DESIGN", description: "Creating intuitive, sensory-rich interior environments.", image: "/images/hero/hero3.png", bgImage: "/images/hero/hero3.png", href: "/practices/interior-design" },
    { id: "landscape", title: "LANDSCAPE ARCHITECTURE", description: "Connecting built environments with natural landscapes.", image: "/images/hero/hero4.png", bgImage: "/images/hero/hero4.png", href: "/practices/landscape-architecture" },
  ],
};

const routeByCategorySlug: Record<string, string> = {
  architecture: "/practices/architecture",
  interiors: "/practices/interior-design",
  landscape: "/practices/landscape-architecture",
};

const crop = (width: number, height: number, quality = 80) =>
  `url @transform(width: ${width}, height: ${height}, mode: "crop", format: "webp", quality: ${quality}, immediately: true)`;
const heroFit = (width: number, quality = 85) =>
  `url @transform(width: ${width}, mode: "fit", format: "webp", quality: ${quality}, immediately: true)`;
const heroImage = `mobile: ${heroFit(768, 80)} tablet: ${heroFit(1440, 82)} desktop: ${heroFit(2400, 85)}`;
const introImage = `mobile: ${crop(600, 500)} tablet: ${crop(1440, 900, 82)} desktop: ${crop(1540, 1200, 85)}`;
const cardImage = `mobile: ${crop(600, 480)} tablet: ${crop(900, 720, 82)} desktop: ${crop(1200, 960, 85)}`;

const QUERY = /* GraphQL */ `
query PracticesPage {
  entries(section: ["practices"], limit: 1) {
    ... on practices_Entry {
      seoPageTitle
      seoMetaDescription
      seoImage { url width height title }
      practicesHeroHeading
      practicesHeroDescription
      practicesHeroImage { url ${heroImage} }
      practicesIntroHeading
      practicesIntroDescription
      practicesIntroImage { url ${introImage} }
      practiceFeatured {
        ... on discipline_Category {
          id
          title
          slug
          tagline
          thumbnail { ${cardImage} }
        }
      }
    }
  }
}`;

export async function getPracticesPageContent(): Promise<PracticesPageContent> {
  try {
    const data = await craftFetch<{ entries: Entry[] }>(QUERY);
    const entry = data.entries?.[0];
    if (!entry) return FALLBACK;

    const practices = entry.practiceFeatured
      ?.flatMap((practice) => {
        const href = routeByCategorySlug[practice.slug];
        const image = toImageSource(practice.thumbnail?.[0]);
        if (!href || !image) return [];
        return [{
          id: practice.id,
          title: practice.title.trim() || "PRACTICE",
          description: practice.tagline?.trim() || "",
          image,
          bgImage: image,
          href,
        }];
      });

    return {
      cmsSeoTitle: entry.seoPageTitle?.trim() || null,
      seoDescription: entry.seoMetaDescription?.trim() || null,
      seoImage: toSeoImage(entry.seoImage?.[0]),
      hero: {
        title: entry.practicesHeroHeading?.trim() || FALLBACK.hero.title,
        description: entry.practicesHeroDescription?.trim() || FALLBACK.hero.description,
        image: toImageSource(entry.practicesHeroImage?.[0]) || FALLBACK.hero.image,
      },
      intro: {
        heading: entry.practicesIntroHeading?.trim() || FALLBACK.intro.heading,
        description: entry.practicesIntroDescription?.trim() || FALLBACK.intro.description,
        image: toImageSource(entry.practicesIntroImage?.[0]) || FALLBACK.intro.image,
      },
      practices: practices?.length ? practices : FALLBACK.practices,
    };
  } catch (error) {
    console.warn("Failed to fetch practices page from Craft, using fallback:", error);
    return FALLBACK;
  }
}
