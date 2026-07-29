import { craftFetch } from "./craft";
import type { CtaContent } from "./types";

type RawCta = {
  ctaSection: {
    ctaSectionBackgroundImage: Array<{ url: string }>;
    ctaSectionHeading: string | null;
    ctaSectionDescription: string | null;
    ctaSectionButtonLabel: string | null;
    ctaSectionButtonUrl: string | null;
  } | null;
};

type CtaResponse = { entries: RawCta[] };

const CTA_FIELDS = /* GraphQL */ `
  ctaSection {
    ctaSectionBackgroundImage { url: url @transform(width: 2400, format: "webp", quality: 85, immediately: true) }
    ctaSectionHeading
    ctaSectionDescription
    ctaSectionButtonLabel
    ctaSectionButtonUrl
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

  if (!cta?.ctaSectionBackgroundImage[0]?.url || !cta.ctaSectionHeading) {
    return fallback;
  }

  return {
    image: cta.ctaSectionBackgroundImage[0].url,
    title: cta.ctaSectionHeading,
    description: cta.ctaSectionDescription?.trim() || undefined,
    buttonText: cta.ctaSectionButtonLabel?.trim() || undefined,
    buttonHref: cta.ctaSectionButtonUrl?.trim() || undefined,
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
