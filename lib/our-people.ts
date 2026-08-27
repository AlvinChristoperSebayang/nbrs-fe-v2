import { craftFetch } from "./craft";
import { toImageSource, toSeoImage, type RawSeoAsset, type SeoImage } from "./media";
import type { CtaContent, ImageSource } from "./types";
import type { TeamMember } from "@/components/people/TeamListSection";

type Asset = { mobile?: string; tablet?: string; desktop?: string };
type RawPerson = {
  id: string;
  slug: string;
  title: string;
  PplName: string | null;
  pplRegistrationNumber: string | null;
  pplRole: string | null;
  pplProfileImage: Asset[];
  pplDiscipline: Array<{ title: string; slug: string }>;
};

type Entry = {
  pageHeading: string | null;
  pageSubheading: string | null;
  seoPageTitle: string | null;
  seoMetaDescription: string | null;
  seoImage: RawSeoAsset[];
  pageHeroImage: Asset[];
  ourPeopleShowCta: boolean | null;
  ctaSection: {
    ctaSectionBackgroundImage: Asset[];
    ctaSectionHeading: string | null;
    ctaSectionDescription: string | null;
    ctaSectionButtonLabel: string | null;
    ctaSectionButtonUrl: string | null;
  } | null;
  people: RawPerson[];
};

export type OurPeopleContent = {
  hero: { title: string; description: string; image: ImageSource } | null;
  people: TeamMember[];
  cta: CtaContent | null;
  cmsSeoTitle: string | null;
  seoDescription: string | null;
  seoImage: SeoImage | null;
};

const image = `mobile: url @transform(width: 768, mode: "fit", format: "webp", quality: 80, immediately: true) tablet: url @transform(width: 1440, mode: "fit", format: "webp", quality: 82, immediately: true) desktop: url @transform(width: 2400, mode: "fit", format: "webp", quality: 85, immediately: true)`;
const cardImage = `mobile: url @transform(width: 600, mode: "fit", format: "webp", quality: 80, immediately: true) tablet: url @transform(width: 900, mode: "fit", format: "webp", quality: 82, immediately: true) desktop: url @transform(width: 1200, mode: "fit", format: "webp", quality: 85, immediately: true)`;
const ctaImage = `mobile: url @transform(width: 768, height: 900, position: "top-left", mode: "crop", format: "webp", quality: 80, immediately: true) tablet: url @transform(width: 1440, mode: "fit", format: "webp", quality: 82, immediately: true) desktop: url @transform(width: 2400, mode: "fit", format: "webp", quality: 85, immediately: true)`;

const QUERY = /* GraphQL */ `
  query OurPeoplePage {
    entries(section: ["ourPeople"], limit: 1) {
      ... on ourPeople_Entry {
        pageHeading
        pageSubheading
        seoPageTitle
        seoMetaDescription
        seoImage { url width height title }
        pageHeroImage { ${image} }
        ourPeopleShowCta
        ctaSection {
          ctaSectionBackgroundImage { ${ctaImage} }
          ctaSectionHeading
          ctaSectionDescription
          ctaSectionButtonLabel
          ctaSectionButtonUrl
        }
        people {
          ... on people_Entry {
            id slug title PplName pplRegistrationNumber pplRole
            pplProfileImage { ${cardImage} }
            pplDiscipline { ... on discipline_Category { title slug } }
          }
        }
      }
    }
  }
`;

function splitName(value: string | null, fallback: string, directRegistration?: string | null): { name: string; registration?: string } {
  const [name, registration] = (value?.trim() || fallback).split("|").map((part) => part.trim());
  return { name: name || fallback, registration: directRegistration?.trim() || registration || undefined };
}

export async function getOurPeopleContent(): Promise<OurPeopleContent> {
  try {
    const data = await craftFetch<{ entries: Entry[] }>(QUERY);
    const entry = data.entries?.[0];
    if (!entry) return { hero: null, people: [], cta: null, cmsSeoTitle: null, seoDescription: null, seoImage: null };

    const people = entry.people.flatMap((person) => {
      const photo = toImageSource(person.pplProfileImage[0]);
      if (!photo) return [];
      const { name, registration } = splitName(person.PplName, person.title, person.pplRegistrationNumber);
      return [{
        id: person.slug,
        name,
        role: person.pplRole?.trim() || "",
        registration,
        practices: person.pplDiscipline.map((discipline) => discipline.title).filter(Boolean),
        image: photo,
      }];
    });

    const heroImage = toImageSource(entry.pageHeroImage[0]);
    const ctaImageSource = toImageSource(entry.ctaSection?.ctaSectionBackgroundImage[0]);
    const cta = entry.ourPeopleShowCta && ctaImageSource && entry.ctaSection?.ctaSectionHeading
      ? {
          image: ctaImageSource,
          title: entry.ctaSection.ctaSectionHeading,
          description: entry.ctaSection.ctaSectionDescription?.trim() || undefined,
          buttonText: entry.ctaSection.ctaSectionButtonLabel?.trim() || undefined,
          buttonHref: entry.ctaSection.ctaSectionButtonUrl?.trim() || undefined,
        }
      : null;

    return {
      hero: heroImage && entry.pageHeading?.trim() && entry.pageSubheading?.trim()
        ? { title: entry.pageHeading, description: entry.pageSubheading, image: heroImage }
        : null,
      people,
      cta,
      cmsSeoTitle: entry.seoPageTitle?.trim() || null,
      seoDescription: entry.seoMetaDescription?.trim() || entry.pageSubheading?.trim() || null,
      seoImage: toSeoImage(entry.seoImage?.[0]),
    };
  } catch (error) {
    console.error("Failed to load Our People content from Craft:", error);
    return { hero: null, people: [], cta: null, cmsSeoTitle: null, seoDescription: null, seoImage: null };
  }
}
