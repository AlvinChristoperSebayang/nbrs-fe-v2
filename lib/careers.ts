import { craftFetch } from "./craft";
import { toImageSource, toSeoImage, type RawResponsiveAsset, type RawSeoAsset, type SeoImage } from "./media";
import type { CtaContent, ImageSource } from "./types";
import type { AccordionItem } from "@/components/people/CareersAccordionSection";

type RawFaqBlock = {
  __typename: "blocks_faqs_BlockType";
  envFaqsHeading: string | null;
  envFaqsText: string | null;
  envFaqs: Array<{ id: string; heading: string | null; text: string | null }>;
};

type RawCareersPage = {
  pageHeading: string | null;
  pageSubheading: string | null;
  seoPageTitle: string | null;
  seoMetaDescription: string | null;
  seoImage: RawSeoAsset[];
  pageHeroImage: Array<RawResponsiveAsset & RawSeoAsset>;
  blocks: RawFaqBlock[];
  ctaSection: {
    ctaSectionBackgroundImage: RawResponsiveAsset[];
    ctaSectionHeading: string | null;
    ctaSectionDescription: string | null;
    ctaSectionButtonLabel: string | null;
    ctaSectionButtonUrl: string | null;
  } | null;
};

export type CareersContent = {
  hero: { title: string; description?: string; image: ImageSource } | null;
  accordion: { title: string; introText?: string; items: AccordionItem[] } | null;
  cta: CtaContent | null;
  cmsSeoTitle: string | null;
  seoDescription: string | null;
  seoImage: SeoImage | null;
};

const heroImage = `mobile: url @transform(width: 600, height: 800, mode: "crop", format: "webp", quality: 80, immediately: true) tablet: url @transform(width: 1440, height: 1000, mode: "crop", format: "webp", quality: 82, immediately: true) desktop: url @transform(width: 2400, height: 1200, mode: "crop", format: "webp", quality: 85, immediately: true)`;
const ctaImage = `mobile: url @transform(width: 600, height: 900, mode: "crop", format: "webp", quality: 80, immediately: true) tablet: url @transform(width: 1440, height: 900, mode: "crop", format: "webp", quality: 82, immediately: true) desktop: url @transform(width: 2400, height: 1000, mode: "crop", format: "webp", quality: 85, immediately: true)`;

// The query intentionally requests only the dedicated Careers FAQ block, hero, and CTA fields.
const QUERY = /* GraphQL */ `
  query CareersPage {
    entries(section: ["pages"], slug: ["careers"], limit: 1) {
      ... on pages_Entry {
        pageHeading
        pageSubheading
        seoPageTitle
        seoMetaDescription
        seoImage { url width height title }
        pageHeroImage { url width height title ${heroImage} }
        blocks {
          __typename
          ... on blocks_faqs_BlockType {
            envFaqsHeading
            envFaqsText
            envFaqs {
              ... on faq_Entry { id heading text }
            }
          }
        }
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

function plainText(value: string | null | undefined): string {
  return (value ?? "")
    .replace(/<\/(?:p|div|h[1-6])>\s*/gi, "\n\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .trim();
}

export async function getCareersContent(): Promise<CareersContent> {
  try {
    const data = await craftFetch<{ entries: RawCareersPage[] }>(QUERY);
    const entry = data.entries?.[0];
    if (!entry) return { hero: null, accordion: null, cta: null, cmsSeoTitle: null, seoDescription: null, seoImage: null };

    const heroImageSource = toImageSource(entry.pageHeroImage[0]);
    const faq = entry.blocks.find((block) => block.__typename === "blocks_faqs_BlockType");
    const items = (faq?.envFaqs ?? []).flatMap((item) => {
      const title = plainText(item.heading);
      const content = item.text?.trim() ?? "";
      return title && content ? [{ id: item.id, title, content }] : [];
    });
    const ctaImageSource = toImageSource(entry.ctaSection?.ctaSectionBackgroundImage[0]);

    return {
      hero: heroImageSource && plainText(entry.pageHeading)
        ? { title: plainText(entry.pageHeading), description: plainText(entry.pageSubheading) || undefined, image: heroImageSource }
        : null,
      accordion: faq && plainText(faq.envFaqsHeading) && items.length
        ? { title: plainText(faq.envFaqsHeading), introText: plainText(faq.envFaqsText) || undefined, items }
        : null,
      cta: ctaImageSource && plainText(entry.ctaSection?.ctaSectionHeading)
        ? {
            image: ctaImageSource,
            title: plainText(entry.ctaSection?.ctaSectionHeading),
            description: plainText(entry.ctaSection?.ctaSectionDescription) || undefined,
            buttonText: plainText(entry.ctaSection?.ctaSectionButtonLabel) || undefined,
            buttonHref: entry.ctaSection?.ctaSectionButtonUrl?.trim() || undefined,
        }
        : null,
      cmsSeoTitle: entry.seoPageTitle?.trim() || null,
      seoDescription: entry.seoMetaDescription?.trim() || plainText(entry.pageSubheading) || null,
      seoImage: toSeoImage(entry.seoImage?.[0]) || toSeoImage(entry.pageHeroImage?.[0]),
    };
  } catch (error) {
    console.error("Failed to fetch careers content from Craft:", error);
    return { hero: null, accordion: null, cta: null, cmsSeoTitle: null, seoDescription: null, seoImage: null };
  }
}
