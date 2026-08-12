import { craftFetch } from "./craft";
import { toImageSource } from "./media";
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
};

const image = `mobile: url @transform(width: 600, height: 800, mode: "crop", format: "webp", quality: 80, immediately: true) tablet: url @transform(width: 1440, height: 1000, mode: "crop", format: "webp", quality: 82, immediately: true) desktop: url @transform(width: 2400, height: 1200, mode: "crop", format: "webp", quality: 85, immediately: true)`;
const cardImage = `mobile: url @transform(width: 600, height: 480, mode: "crop", format: "webp", quality: 80, immediately: true) tablet: url @transform(width: 900, height: 720, mode: "crop", format: "webp", quality: 82, immediately: true) desktop: url @transform(width: 1200, height: 960, mode: "crop", format: "webp", quality: 85, immediately: true)`;
const ctaImage = `mobile: url @transform(width: 600, height: 900, mode: "crop", format: "webp", quality: 80, immediately: true) tablet: url @transform(width: 1440, height: 900, mode: "crop", format: "webp", quality: 82, immediately: true) desktop: url @transform(width: 2400, height: 1000, mode: "crop", format: "webp", quality: 85, immediately: true)`;

const QUERY = /* GraphQL */ `
  query OurPeoplePage {
    entries(section: ["ourPeople"], limit: 1) {
      ... on ourPeople_Entry {
        pageHeading
        pageSubheading
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
    if (!entry) return { hero: null, people: [], cta: null };

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
    };
  } catch (error) {
    console.error("Failed to load Our People content from Craft:", error);
    return { hero: null, people: [], cta: null };
  }
}
