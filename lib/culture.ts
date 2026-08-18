import { craftFetch } from "./craft";
import { toImageSource } from "./media";
import type { CtaContent, ImageSource } from "./types";
import type { InitiativeItem } from "@/components/people/InitiativesSection";

type Asset = { mobile?: string; tablet?: string; desktop?: string };
type Entry = {
  pageHeading: string | null;
  pageSubheading: string | null;
  pageHeroImage: Asset[];
  cultureValuesHeading: string | null;
  cultureValuesDescription: string | null;
  cultureValuesImage: Asset[];
  cultureInitiativesHeading: string | null;
  cultureInitiatives: Array<{ id: string; title: string; description2: string | null; image: Asset[] }>;
  cultureShowCta: boolean | null;
  ctaSection: {
    ctaSectionBackgroundImage: Asset[];
    ctaSectionHeading: string | null;
    ctaSectionDescription: string | null;
    ctaSectionButtonLabel: string | null;
    ctaSectionButtonUrl: string | null;
  } | null;
};

export type CultureContent = {
  hero: { title: string; description: string; image: ImageSource } | null;
  values: { heading: string; description: string; image: ImageSource } | null;
  initiatives: { heading: string; items: InitiativeItem[] } | null;
  cta: CtaContent | null;
};

const heroImage = `mobile: url @transform(width: 600, height: 800, mode: "crop", format: "webp", quality: 80, immediately: true) tablet: url @transform(width: 1440, height: 1000, mode: "crop", format: "webp", quality: 82, immediately: true) desktop: url @transform(width: 2400, height: 1200, mode: "crop", format: "webp", quality: 85, immediately: true)`;
const contentImage = `mobile: url @transform(width: 600, height: 450, mode: "crop", format: "webp", quality: 80, immediately: true) tablet: url @transform(width: 900, height: 675, mode: "crop", format: "webp", quality: 82, immediately: true) desktop: url @transform(width: 1200, height: 900, mode: "crop", format: "webp", quality: 85, immediately: true)`;
const valuesDiagramImage = `mobile: url @transform(width: 600, mode: "fit", format: "webp", quality: 85, immediately: true) tablet: url @transform(width: 900, mode: "fit", format: "webp", quality: 85, immediately: true) desktop: url @transform(width: 1200, mode: "fit", format: "webp", quality: 85, immediately: true)`;
const ctaImage = `mobile: url @transform(width: 600, height: 900, mode: "crop", format: "webp", quality: 80, immediately: true) tablet: url @transform(width: 1440, height: 900, mode: "crop", format: "webp", quality: 82, immediately: true) desktop: url @transform(width: 2400, height: 1000, mode: "crop", format: "webp", quality: 85, immediately: true)`;

const valuesImage = `
  mobile: url @transform(width: 600, quality: 80, immediately: true)
  tablet: url @transform(width: 900, quality: 82, immediately: true)
  desktop: url @transform(width: 1200, quality: 85, immediately: true)
`;

// Deliberately excludes the legacy images and cultureImages fields.
const QUERY = /* GraphQL */ `
  query CulturePage {
    entries(section: ["culture"], limit: 1) {
      ... on culture_Entry {
        pageHeading
        pageSubheading
        pageHeroImage { ${heroImage} }
        cultureValuesHeading
        cultureValuesDescription
        cultureValuesImage { ${valuesDiagramImage} }
        cultureInitiativesHeading
        cultureInitiatives {
          ... on cultureInitiative_Entry {
            id title description2 image { ${valuesImage} }
          }
        }
        cultureShowCta
        ctaSection {
          ctaSectionBackgroundImage { ${ctaImage} }
          ctaSectionHeading
          ctaSectionDescription
          ctaSectionButtonLabel
          ctaSectionButtonUrl
        }
      }
    }
  }
`;

export async function getCultureContent(): Promise<CultureContent> {
  try {
    const data = await craftFetch<{ entries: Entry[] }>(QUERY);
    const entry = data.entries[0];
    if (!entry) return { hero: null, values: null, initiatives: null, cta: null };

    const hero = toImageSource(entry.pageHeroImage[0]);
    const valuesImage = toImageSource(entry.cultureValuesImage[0]);
    const items = entry.cultureInitiatives.flatMap((item, index) => {
      const image = toImageSource(item.image[0]);
      if (!item.title?.trim() || !item.description2?.trim() || !image) return [];
      return [{ id: item.id, title: item.title, description: item.description2, image, reverse: index % 2 === 1 }];
    });
    const ctaImageSource = toImageSource(entry.ctaSection?.ctaSectionBackgroundImage[0]);

    return {
      hero: hero && entry.pageHeading?.trim() && entry.pageSubheading?.trim() ? { title: entry.pageHeading, description: entry.pageSubheading, image: hero } : null,
      values: valuesImage && entry.cultureValuesHeading?.trim() && entry.cultureValuesDescription?.trim() ? { heading: entry.cultureValuesHeading, description: entry.cultureValuesDescription, image: valuesImage } : null,
      initiatives: entry.cultureInitiativesHeading?.trim() && items.length ? { heading: entry.cultureInitiativesHeading, items } : null,
      cta: entry.cultureShowCta && ctaImageSource && entry.ctaSection?.ctaSectionHeading ? {
        image: ctaImageSource,
        title: entry.ctaSection.ctaSectionHeading,
        description: entry.ctaSection.ctaSectionDescription?.trim() || undefined,
        buttonText: entry.ctaSection.ctaSectionButtonLabel?.trim() || undefined,
        buttonHref: entry.ctaSection.ctaSectionButtonUrl?.trim() || undefined,
      } : null,
    };
  } catch (error) {
    console.warn("Failed to load culture content from Craft:", error);
    return { hero: null, values: null, initiatives: null, cta: null };
  }
}
