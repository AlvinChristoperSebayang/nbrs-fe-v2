import { cache } from "react";
import type { NewsContentBlock } from "./news-detail";
import { craftFetch } from "./craft";
import { toImageSource } from "./media";
import type { CtaContent, ImageSource, ResponsiveImage } from "./types";

type RawAsset = Partial<ResponsiveImage> & {
  url?: string;
  width?: number | null;
  height?: number | null;
  title?: string | null;
};

type RawCategory = {
  id?: string;
  title: string;
  slug: string;
  accentColor?: string | null;
};

type RawContentBlock = {
  __typename: "text_Entry" | "image_Entry" | "gallery_Entry" | "quote_Entry" | "embedcode_Entry";
  text?: string | null;
  image?: RawAsset[];
  gallery?: RawAsset[];
  quote?: string | null;
  citation?: string | null;
  embedCode?: string | null;
};

type RawAtAGlance = {
  __typename: "researchAtAGlance_Entry";
  researchAtAGlanceText: string | null;
  researchAtAGlancePreset: string | null;
  researchAtAGlanceAccentColor: string | null;
  researchAtAGlanceIcon: RawAsset[];
};

type RawRelatedResearch = {
  id: string;
  slug: string;
  title: string;
  artHdrHeading: string | null;
  thumbnail: RawAsset[];
  catSector: RawCategory[];
  catDiscipline: RawCategory[];
};

type RawCta = {
  ctaSectionBackgroundImage: RawAsset[];
  ctaSectionHeading: string | null;
  ctaSectionDescription: string | null;
  ctaSectionButtonLabel: string | null;
};

type ResearchDetailResponse = {
  entries: Array<{
    title: string;
    slug: string;
    seoPageTitle: string | null;
    seoMetaDescription: string | null;
    artType: RawCategory[];
    catSector: RawCategory[];
    catDiscipline: RawCategory[];
    artHdrHeading: string | null;
    artHdrSubheading: string | null;
    thumbnail: RawAsset[];
    artHdrHeroImage: RawAsset[];
    artHdrPortraitImage: RawAsset[];
    artIssuuUrl: string | null;
    artFileDownload: RawAsset[];
    ctaSection: RawCta | null;
    researchPublicationDate: string | null;
    researchAuthor: string | null;
    researchReadTime: string | null;
    researchReviewedByText: string | null;
    researchSponsoredByText: string | null;
    researchInsight: string | null;
    researchResultsImplications: string | null;
    researchKeyTakeawaysContent: string | null;
    researchAtAGlance: RawAtAGlance[];
    researchRelated: RawRelatedResearch[];
    artContent: RawContentBlock[];
  }>;
};

type RelatedResearchFallbackResponse = {
  entries: RawRelatedResearch[];
};

type CategoryRelationCriteriaInput = {
  group: "sector";
  slug: string[];
};

export type ResearchAtAGlanceItem = {
  accentColor: string;
  text: string;
  icon: ImageSource | null;
};

export type RelatedResearchItem = {
  id: string;
  slug: string;
  title: string;
  image: ImageSource | null;
  sector: string | null;
  practice: string | null;
};

export type ResearchDetail = {
  slug: string;
  title: string;
  subheading: string | null;
  publicationDate: string | null;
  category: string | null;
  categoryColor: string | null;
  sectors: string[];
  practices: string[];
  articleType: string | null;
  hero: ImageSource | null;
  featureImage: ImageSource | null;
  seoTitle: string | null;
  seoDescription: string | null;
  author: string | null;
  reviewedBy: string | null;
  sponsoredBy: string | null;
  readTime: string | null;
  insightHtml: string | null;
  resultsImplicationsHtml: string | null;
  keyTakeawaysHtml: string | null;
  atAGlance: ResearchAtAGlanceItem[];
  bodyContent: NewsContentBlock[];
  related: RelatedResearchItem[];
  issuuUrl: string | null;
  downloadUrl: string | null;
  downloadCta: CtaContent | null;
};

type AtAGlancePreset = {
  accentColor: string;
  icon: string;
};

const AT_A_GLANCE_PRESETS: Record<string, AtAGlancePreset> = {
  community: { accentColor: "#CFE9D7", icon: "/images/at-a-glance/community.svg" },
  insight: { accentColor: "#E4F1F6", icon: "/images/at-a-glance/insight.svg" },
  systems: { accentColor: "#EFC7BD", icon: "/images/at-a-glance/systems.svg" },
  outcomes: { accentColor: "#F3E8D8", icon: "/images/at-a-glance/outcomes.svg" },
};

const RESEARCH_DETAIL_QUERY = /* GraphQL */ `
  query ResearchDetail($slug: [String]!) {
    entries(section: "research", slug: $slug, limit: 1) {
      title
      slug
      ... on research_Entry {
        seoPageTitle
        seoMetaDescription
        artType { ... on articleType_Category { title slug } }
        catSector { ... on sector_Category { id title slug accentColor } }
        catDiscipline { ... on discipline_Category { id title slug accentColor } }
        artHdrHeading
        artHdrSubheading
        thumbnail {
          url
          mobile: url @transform(width: 768, immediately: true)
          tablet: url @transform(width: 1440, immediately: true)
          desktop: url @transform(width: 1920, immediately: true)
        }
        artHdrHeroImage {
          url
          mobile: url @transform(width: 768, immediately: true)
          tablet: url @transform(width: 1440, immediately: true)
          desktop: url @transform(width: 1920, immediately: true)
        }
        artHdrPortraitImage {
          url
          mobile: url @transform(width: 768, immediately: true)
          tablet: url @transform(width: 1440, immediately: true)
          desktop: url @transform(width: 1920, immediately: true)
        }
        artIssuuUrl
        artFileDownload { url }
        ctaSection {
          ctaSectionHeading
          ctaSectionDescription
          ctaSectionButtonLabel
          ctaSectionBackgroundImage {
            url
            mobile: url @transform(width: 768, immediately: true)
            tablet: url @transform(width: 1440, immediately: true)
            desktop: url @transform(width: 1920, immediately: true)
          }
        }
        researchPublicationDate
        researchAuthor
        researchReadTime
        researchReviewedByText
        researchSponsoredByText
        researchInsight
        researchResultsImplications
        researchKeyTakeawaysContent
        researchAtAGlance {
          __typename
          ... on researchAtAGlance_Entry {
            researchAtAGlanceText
            researchAtAGlancePreset
            researchAtAGlanceAccentColor
            researchAtAGlanceIcon {
              url
            }
          }
        }
        researchRelated {
          ... on research_Entry {
            id
            slug
            title
            artHdrHeading
            thumbnail {
              url
              mobile: url @transform(width: 600, immediately: true)
              tablet: url @transform(width: 900, immediately: true)
              desktop: url @transform(width: 1200, immediately: true)
            }
            catSector { ... on sector_Category { title slug accentColor } }
            catDiscipline { ... on discipline_Category { title slug accentColor } }
          }
        }
        artContent {
          __typename
          ... on text_Entry { text }
          ... on image_Entry {
            image {
              url
              mobile: url @transform(width: 768, immediately: true)
              tablet: url @transform(width: 1440, immediately: true)
              desktop: url @transform(width: 1920, immediately: true)
            }
          }
          ... on gallery_Entry {
            gallery {
              url
              mobile: url @transform(width: 768, immediately: true)
              tablet: url @transform(width: 1440, immediately: true)
              desktop: url @transform(width: 1920, immediately: true)
            }
          }
          ... on quote_Entry { quote citation }
          ... on embedcode_Entry { embedCode }
        }
      }
    }
  }
`;

const RELATED_RESEARCH_FALLBACK_QUERY = /* GraphQL */ `
  query RelatedResearchFallback($relatedToCategories: [CategoryRelationCriteriaInput]) {
    entries(
      section: "research"
      relatedToCategories: $relatedToCategories
      orderBy: "postDate DESC"
      limit: 4
    ) {
      ... on research_Entry {
        id
        slug
        title
        artHdrHeading
        thumbnail {
          url
          mobile: url @transform(width: 600, immediately: true)
          tablet: url @transform(width: 900, immediately: true)
          desktop: url @transform(width: 1200, immediately: true)
        }
        catSector { ... on sector_Category { title slug accentColor } }
        catDiscipline { ... on discipline_Category { title slug accentColor } }
      }
    }
  }
`;

function toContentBlocks(blocks: RawContentBlock[]): NewsContentBlock[] {
  return blocks.flatMap((block): NewsContentBlock[] => {
    if (block.__typename === "text_Entry" && block.text?.trim()) return [{ type: "text", html: block.text }];

    if (block.__typename === "image_Entry") {
      const image = toImageSource(block.image?.[0]);
      return image ? [{ type: "image", image }] : [];
    }

    if (block.__typename === "gallery_Entry") {
      const images = (block.gallery ?? []).flatMap((asset) => {
        const image = toImageSource(asset);
        return image ? [image] : [];
      });
      return images.length ? [{ type: "gallery", images }] : [];
    }

    if (block.__typename === "quote_Entry" && block.quote?.trim()) {
      return [{ type: "quote", quote: block.quote, citation: block.citation ?? null }];
    }

    if (block.__typename === "embedcode_Entry" && block.embedCode?.trim()) return [{ type: "embed", html: block.embedCode }];
    return [];
  });
}

function toRelatedResearchItems(entries: RawRelatedResearch[], currentSlug: string): RelatedResearchItem[] {
  return entries
    .filter((item) => item.slug !== currentSlug)
    .slice(0, 3)
    .map((item) => ({
      id: item.id,
      slug: item.slug,
      title: item.artHdrHeading?.trim() || item.title,
      image: toImageSource(item.thumbnail?.[0]),
      sector: item.catSector?.[0]?.title ?? null,
      practice: item.catDiscipline?.[0]?.title ?? null,
    }));
}

export const getResearchDetail = cache(async (slug: string): Promise<ResearchDetail | null> => {
  const data = await craftFetch<ResearchDetailResponse>(RESEARCH_DETAIL_QUERY, { slug: [slug] });
  const entry = data.entries?.[0];
  if (!entry) return null;

  const content = toContentBlocks(entry.artContent ?? []);
  const firstTextIndex = content.findIndex((block) => block.type === "text");
  const configuredInsight = entry.researchInsight?.trim() || null;
  const downloadUrl = entry.artFileDownload?.[0]?.url ?? null;
  const issuuUrl = entry.artIssuuUrl?.trim() || null;
  const downloadTarget = downloadUrl ?? issuuUrl;
  const cta = entry.ctaSection;
  const ctaImage = toImageSource(cta?.ctaSectionBackgroundImage?.[0]);
  const manualRelated = entry.researchRelated ?? [];
  const sectorSlugs = (entry.catSector ?? []).map((sector) => sector.slug).filter(Boolean);
  const fallbackRelated = manualRelated.length === 0 && sectorSlugs.length > 0
    ? (await craftFetch<RelatedResearchFallbackResponse>(RELATED_RESEARCH_FALLBACK_QUERY, {
        relatedToCategories: [{ group: "sector", slug: sectorSlugs }] satisfies CategoryRelationCriteriaInput[],
      })).entries ?? []
    : [];
  const downloadCta = cta && downloadTarget
    ? {
        image: ctaImage ?? "/images/contact-bg.png",
        title: cta.ctaSectionHeading?.trim() || (downloadUrl ? "DOWNLOAD THE FULL PAPER" : "READ THE FULL PAPER"),
        description: cta.ctaSectionDescription?.trim() || undefined,
        buttonText: cta.ctaSectionButtonLabel?.trim() || (downloadUrl ? "DOWNLOAD FULL PAPER" : "READ FULL PAPER"),
        buttonHref: downloadTarget,
      }
    : null;

  return {
    slug: entry.slug,
    title: entry.artHdrHeading?.trim() || entry.title,
    subheading: entry.artHdrSubheading?.trim() || null,
    publicationDate: entry.researchPublicationDate?.trim() || null,
    category: entry.catSector?.[0]?.title ?? entry.artType?.[0]?.title ?? null,
    categoryColor: entry.catSector?.[0]?.accentColor ?? null,
    sectors: (entry.catSector ?? []).map((category) => category.title),
    practices: (entry.catDiscipline ?? []).map((category) => category.title),
    articleType: entry.artType?.[0]?.title ?? null,
    // The detail banner accepts only the dedicated Hero Image. Thumbnail is intentionally
    // not a banner fallback because it can be a photographic card image rather than the
    // transparent artwork used over the Sector accent colour.
    hero: toImageSource(entry.artHdrHeroImage?.[0]),
    // The supporting image uses the dedicated portrait asset when supplied;
    // thumbnail remains a safe fallback for existing research entries.
    featureImage: toImageSource(entry.artHdrPortraitImage?.[0]) ?? toImageSource(entry.thumbnail?.[0]),
    seoTitle: entry.seoPageTitle,
    seoDescription: entry.seoMetaDescription,
    author: entry.researchAuthor?.trim() || null,
    reviewedBy: entry.researchReviewedByText?.trim() || null,
    sponsoredBy: entry.researchSponsoredByText?.trim() || null,
    readTime: entry.researchReadTime?.trim() || null,
    insightHtml: configuredInsight ?? (firstTextIndex >= 0 && content[firstTextIndex].type === "text" ? content[firstTextIndex].html : null),
    resultsImplicationsHtml: entry.researchResultsImplications?.trim() || null,
    keyTakeawaysHtml: entry.researchKeyTakeawaysContent?.trim() || null,
    atAGlance: (entry.researchAtAGlance ?? []).flatMap((item) =>
      item.researchAtAGlanceText?.trim()
        ? (() => {
            const preset = item.researchAtAGlancePreset ? AT_A_GLANCE_PRESETS[item.researchAtAGlancePreset] : null;
            return [{
              text: item.researchAtAGlanceText,
              accentColor: preset?.accentColor ?? (item.researchAtAGlanceAccentColor?.trim() || "#E5E5E5"),
              icon: preset?.icon ?? toImageSource(item.researchAtAGlanceIcon?.[0]),
            }];
          })()
        : [],
    ),
    bodyContent: configuredInsight || firstTextIndex < 0 ? content : content.filter((_, index) => index !== firstTextIndex),
    related: toRelatedResearchItems(manualRelated.length > 0 ? manualRelated : fallbackRelated, entry.slug),
    issuuUrl,
    downloadUrl,
    downloadCta,
  };
});
