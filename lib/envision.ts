import { craftFetch } from "./craft";
import { toImageSource, toSeoImage, type RawResponsiveAsset, type RawSeoAsset, type SeoImage } from "./media";
import type { CtaContent, ImageSource } from "./types";
import type { AccordionItem } from "@/components/people/CareersAccordionSection";
import type { ArticleCardProps } from "@/components/ui/ArticleCard";

type RawEnvision = {
  envHeading: string | null;
  envSubheading: string | null;
  seoPageTitle: string | null;
  seoMetaDescription: string | null;
  seoImage: RawSeoAsset[];
  envHeroImage: Array<RawResponsiveAsset & RawSeoAsset>;
  envPastResearch: Array<{ id: string; title: string | null; slug: string | null; thumbnail: RawResponsiveAsset[] }>;
  envFaqsHeading: string | null;
  envFaqsText: string | null;
  envFaqs: Array<{ id: string; heading: string | null; text: string | null }>;
  envisionShowCta: boolean | null;
  ctaSection: {
    ctaSectionBackgroundImage: RawResponsiveAsset[];
    ctaSectionHeading: string | null;
    ctaSectionDescription: string | null;
    ctaSectionButtonLabel: string | null;
    ctaSectionButtonUrl: string | null;
  } | null;
};

export type EnvisionContent = {
  hero: { title: string; description?: string; image: ImageSource } | null;
  research: ArticleCardProps[];
  faqs: { title: string; introText?: string; items: AccordionItem[] } | null;
  cta: CtaContent | null;
  cmsSeoTitle: string | null;
  seoDescription: string | null;
  seoImage: SeoImage | null;
};

const heroImage = `mobile: url @transform(width: 600, height: 800, mode: "crop", format: "webp", quality: 80, immediately: true) tablet: url @transform(width: 1440, height: 1000, mode: "crop", format: "webp", quality: 82, immediately: true) desktop: url @transform(width: 2400, height: 1200, mode: "crop", format: "webp", quality: 85, immediately: true)`;
const cardImage = `mobile: url @transform(width: 600, height: 450, mode: "crop", format: "webp", quality: 80, immediately: true) tablet: url @transform(width: 900, height: 675, mode: "crop", format: "webp", quality: 82, immediately: true) desktop: url @transform(width: 1200, height: 900, mode: "crop", format: "webp", quality: 85, immediately: true)`;
const ctaImage = `mobile: url @transform(width: 600, height: 900, mode: "crop", format: "webp", quality: 80, immediately: true) tablet: url @transform(width: 1440, height: 900, mode: "crop", format: "webp", quality: 82, immediately: true) desktop: url @transform(width: 2400, height: 1000, mode: "crop", format: "webp", quality: 85, immediately: true)`;

const QUERY = /* GraphQL */ `
  query EnvisionPage {
    entries(section: ["envision"], limit: 1) {
      ... on envision_Entry {
        envHeading
        envSubheading
        seoPageTitle
        seoMetaDescription
        seoImage { url width height title }
        envHeroImage { url width height title ${heroImage} }
        envPastResearch {
          ... on research_Entry {
            id title slug thumbnail { ${cardImage} }
          }
        }
        envFaqsHeading
        envFaqsText
        envFaqs { ... on faq_Entry { id heading text } }
        envisionShowCta
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

const fallbackEnvision: EnvisionContent = {
  hero: {
    title: "ENVISION\nSTUDENT\nPROGRAM",
    description: "Empowering the next generation of architectural thinkers and designers.",
    image: "/images/hero/hero1.png",
  },
  research: [],
  faqs: null,
  cta: null,
  cmsSeoTitle: "Envision Student Program | NBRS Architecture",
  seoDescription: "Empowering the next generation of architectural thinkers and designers.",
  seoImage: null,
};

export async function getEnvisionContent(): Promise<EnvisionContent> {
  try {
    const data = await craftFetch<{ entries: RawEnvision[] }>(QUERY);
    const entry = data.entries?.[0];
    if (!entry) return fallbackEnvision;

    const hero = toImageSource(entry.envHeroImage?.[0]);
    const research = (entry.envPastResearch ?? []).flatMap((item, index) => {
      const image = toImageSource(item.thumbnail?.[0]);
      return item.title?.trim() && item.slug?.trim() && image
        ? [{ id: item.id, slug: item.slug, title: item.title, image, href: `/research/${item.slug}`, hoverColor: ["#F0C7BD", "#FDD4B6", "#EDE3F0"][index % 3] }]
        : [];
    });
    const faqItems = (entry.envFaqs ?? []).flatMap((item) => {
      const title = plainText(item.heading);
      const content = item.text?.trim() ?? "";
      return title && content ? [{ id: item.id, title, content }] : [];
    });
    const ctaImageSource = toImageSource(entry.ctaSection?.ctaSectionBackgroundImage?.[0]);

    const rawHeading = plainText(entry.envHeading);
    const formattedTitle = rawHeading.includes("\n")
      ? rawHeading
      : rawHeading.toUpperCase().includes("ENVISION")
      ? rawHeading.split(/\s+/).join("\n")
      : rawHeading;

    return {
      hero: hero && rawHeading
        ? {
            title: formattedTitle,
            description: plainText(entry.envSubheading) ? plainText(entry.envSubheading).replace(/\?\?\?/g, "’") : undefined,
            image: hero,
          }
        : fallbackEnvision.hero,
      research,
      faqs: plainText(entry.envFaqsHeading) && faqItems.length
        ? { title: plainText(entry.envFaqsHeading), introText: plainText(entry.envFaqsText) || undefined, items: faqItems }
        : null,
      cta: entry.envisionShowCta && ctaImageSource && plainText(entry.ctaSection?.ctaSectionHeading)
        ? {
            image: ctaImageSource,
            title: plainText(entry.ctaSection?.ctaSectionHeading),
            description: plainText(entry.ctaSection?.ctaSectionDescription) || undefined,
            buttonText: plainText(entry.ctaSection?.ctaSectionButtonLabel) || undefined,
            buttonHref: entry.ctaSection?.ctaSectionButtonUrl?.trim() || undefined,
          }
        : null,
      cmsSeoTitle: entry.seoPageTitle?.trim() || null,
      seoDescription: entry.seoMetaDescription?.trim() || plainText(entry.envSubheading) || null,
      seoImage: toSeoImage(entry.seoImage?.[0]) || toSeoImage(entry.envHeroImage?.[0]),
    };
  } catch (error) {
    console.warn("Failed to fetch Envision content from Craft, using fallback:", error);
    return fallbackEnvision;
  }
}
