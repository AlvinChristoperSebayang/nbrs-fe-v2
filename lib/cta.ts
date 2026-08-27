import { craftFetch } from "./craft";
import { toImageSource } from "./media";
import type { CtaContent } from "./types";

type RawCta = {
  ctaSection: {
    ctaSectionBackgroundImage: Array<{ mobile?: string; tablet?: string; desktop?: string }>;
    ctaSectionHeading: string | null;
    ctaSectionDescription: string | null;
    ctaSectionButtonLabel: string | null;
    ctaSectionButtonUrl: string | null;
    ctaSectionSecondaryButtonLabel?: string | null;
    ctaSectionSecondaryButtonUrl?: string | null;
  } | null;
};

type CtaResponse = { entries: RawCta[] };

const CTA_FIELDS = /* GraphQL */ `
  ctaSection {
    ctaSectionBackgroundImage { mobile: url @transform(width: 768, height: 900, position: "top-left", mode: "crop", format: "webp", quality: 80, immediately: true) tablet: url @transform(width: 1440, mode: "fit", format: "webp", quality: 82, immediately: true) desktop: url @transform(width: 2400, mode: "fit", format: "webp", quality: 85, immediately: true) }
    ctaSectionHeading
    ctaSectionDescription
    ctaSectionButtonLabel
    ctaSectionButtonUrl
    ctaSectionSecondaryButtonLabel
    ctaSectionSecondaryButtonUrl
  }
`;

const CTA_QUERY = /* GraphQL */ `
  query PageCta($section: [String!]!, $slug: [String]) {
    entries(section: $section, slug: $slug, limit: 1) {
      ... on homepage_Entry { ${CTA_FIELDS} }
      ... on aboutUs3_Entry { ${CTA_FIELDS} }
      ... on pages_Entry { ${CTA_FIELDS} }
      ... on latestResearch_Entry { ${CTA_FIELDS} }
    }
  }
`;

export function mapCta(raw: RawCta | undefined, fallback: CtaContent): CtaContent {
  const cta = raw?.ctaSection;

  const image = toImageSource(cta?.ctaSectionBackgroundImage[0]);
  if (!cta) {
    return fallback;
  }

  return {
    image: image ?? fallback.image,
    title: cta.ctaSectionHeading?.trim() || fallback.title,
    description: cta.ctaSectionDescription?.trim() || fallback.description,
    buttonText: cta.ctaSectionButtonLabel?.trim() || fallback.buttonText,
    buttonHref: cta.ctaSectionButtonUrl?.trim() || fallback.buttonHref,
    secondaryButtonText: cta.ctaSectionSecondaryButtonLabel?.trim() || fallback.secondaryButtonText,
    secondaryButtonHref: cta.ctaSectionSecondaryButtonUrl?.trim() || fallback.secondaryButtonHref,
  };
}

export async function getPageCta(
  section: string,
  fallback: CtaContent,
  slug?: string,
): Promise<CtaContent> {
  const data = await craftFetch<CtaResponse>(CTA_QUERY, {
    section: [section],
    slug: slug ? [slug] : undefined,
  });

  return mapCta(data.entries[0], fallback);
}
