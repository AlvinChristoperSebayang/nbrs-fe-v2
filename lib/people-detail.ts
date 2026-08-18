import { cache } from "react";
import { craftFetch } from "./craft";
import { toImageSource } from "./media";
import type { ImageSource, ResponsiveImage } from "./types";

type RawAsset = Partial<ResponsiveImage> & {
  width: number | null;
  height: number | null;
  title: string | null;
};

type PeopleDetailResponse = {
  entries: Array<{
    title: string;
    slug: string;
    seoPageTitle: string | null;
    seoMetaDescription: string | null;
    seoImage: RawAsset[];
    PplName: string | null;
    pplRegistrationNumber: string | null;
    pplRole: string | null;
    pplStudioLocation: Array<{ title: string; slug: string }>;
    pplProfileImage: RawAsset[];
    pplShortBiography: string | null;
    pplBiography: string | null;
    pplquote: string | null;
  }>;
};

export type PeopleDetail = {
  name: string;
  slug: string;
  role: string | null;
  registration: string | null;
  location: string | null;
  hero: ImageSource | null;
  biographyHtml: string | null;
  quote: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
  seoImage: RawAsset | null;
};

const PEOPLE_DETAIL_QUERY = /* GraphQL */ `
  query PeopleTeamDetail($slug: [String]!) {
    entries(section: "people", slug: $slug, limit: 1) {
      ... on people_Entry {
        title
        slug
        seoPageTitle
        seoMetaDescription
        seoImage { url width height title }
        PplName
        pplRegistrationNumber
        pplRole
        pplStudioLocation {
          ... on studio_Category { title slug }
        }
        pplProfileImage {
          url
          mobile: url @transform(width: 768, immediately: true)
          tablet: url @transform(width: 1440, immediately: true)
          desktop: url @transform(width: 1920, immediately: true)
          width
          height
          title
        }
        pplShortBiography
        pplBiography
        pplquote
      }
    }
  }
`;

function splitName(value: string | null, fallback: string) {
  const [name, registration] = (value?.trim() || fallback).split("|").map((part) => part.trim());
  return { name: name || fallback, registration: registration || null };
}

function cleanLegacyPunctuation(value: string | null) {
  return value?.replaceAll("???", "").trim() || null;
}

function plainText(value: string | null) {
  return cleanLegacyPunctuation(value)?.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim() || null;
}

function formatStudio(value: string | undefined) {
  if (!value) return null;
  return /(?:office|studio)$/i.test(value) ? value : `${value} Office`;
}

export const getPeopleDetail = cache(async (slug: string): Promise<PeopleDetail | null> => {
  const data = await craftFetch<PeopleDetailResponse>(PEOPLE_DETAIL_QUERY, { slug: [slug] });
  const entry = data.entries[0];
  if (!entry) return null;

  const parsedName = splitName(entry.PplName, entry.title);

  return {
    name: parsedName.name,
    slug: entry.slug,
    role: entry.pplRole?.trim() || null,
    registration: entry.pplRegistrationNumber?.trim() || parsedName.registration,
    location: formatStudio(entry.pplStudioLocation[0]?.title),
    hero: toImageSource(entry.pplProfileImage[0]),
    biographyHtml: cleanLegacyPunctuation(entry.pplBiography) ?? entry.pplShortBiography?.trim() ?? null,
    quote: cleanLegacyPunctuation(entry.pplquote),
    seoTitle: entry.seoPageTitle,
    seoDescription: entry.seoMetaDescription?.trim() || plainText(entry.pplShortBiography),
    seoImage: entry.seoImage?.[0] ?? entry.pplProfileImage?.[0] ?? null,
  };
});
