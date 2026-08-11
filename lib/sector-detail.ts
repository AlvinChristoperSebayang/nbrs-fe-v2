import type { FeatureItem } from "@/components/sectors/SectorFeaturesSliderSection";
import type { KeyProjectItem } from "@/components/sectors/KeyProjectsSection";
import type { ProjectTableRow } from "@/components/sectors/ProjectListTableSection";
import type { CtaContent, ImageSource } from "./types";
import { mapCta } from "./cta";
import { craftFetch } from "./craft";
import { toImageSource } from "./media";
import { SECTORS_DATA, SectorItem } from "./sectors-data";

type Asset = { mobile?: string; tablet?: string; desktop?: string };
type Project = { id: string; title: string; slug: string; uri: string | null; proHdrHeading: string | null; thumbnail?: Asset[]; catStatus: Array<{ title: string }>; catDiscipline: Array<{ title: string }> };
type FeatureBlock = { image: Asset[]; leftColumnHeading: string | null; leftColumnText: string | null; rightColumnHeading: string | null; rightColumnText: string | null };
type SectorFeature = { sectorFeatureHeading: string | null; sectorFeatureText: string | null; sectorFeatureImage: Asset[] };
type QuoteBlock = { quote: string | null; person: Array<{ title: string; PplName: string | null; pplProfileImage: Asset[] }> };
type Category = { id: string; title: string; slug: string; accentColor: string | null; seoPageTitle: string | null; seoMetaDescription: string | null; catHdrHeading: string | null; catHdrSubheading: string | null; sectorServicesIntro: string | null; sectorHeritageAdvisoryServices: string | null; sectorHeritageConservationServices: string | null; catHdrImage: Asset[]; catOvrHeading: string | null; catOvrText: string | null; catOverImageText: FeatureBlock[]; sectorFeatures: SectorFeature[]; catFeaturedProjects: Project[]; catSelectedProjects: Project[]; catPclPerson: QuoteBlock[]; ctaSection: { ctaSectionBackgroundImage: Asset[]; ctaSectionHeading: string | null; ctaSectionDescription: string | null; ctaSectionButtonLabel: string | null; ctaSectionButtonUrl: string | null } | null };
type Response = { category: Category[] };

export type SectorDetailContent = {
  title: string; description: string; image: ImageSource; principlesTitle: string; principlesDescription: string; principlesImages: ImageSource[]; features: FeatureItem[]; backgroundColor: string; heritageServices?: { intro: string; advisory: string[]; conservation: string[] }; keyProjects: KeyProjectItem[]; tableProjects: ProjectTableRow[]; quote?: { image: ImageSource; text: string; author: string }; cta: CtaContent; seoTitle: string; seoDescription: string;
};

const crop = (width: number, height: number, quality = 80) => `url @transform(width: ${width}, height: ${height}, mode: "crop", format: "webp", quality: ${quality}, immediately: true)`;
const heroImage = `mobile: ${crop(600, 800)} tablet: ${crop(1440, 1000, 82)} desktop: ${crop(2400, 1200, 85)}`;
const landscapeImage = `mobile: ${crop(600, 480)} tablet: ${crop(1200, 760, 82)} desktop: ${crop(1800, 1100, 85)}`;
const cardImage = `mobile: ${crop(600, 480)} tablet: ${crop(900, 720, 82)} desktop: ${crop(1200, 960, 85)}`;
const portraitImage = `mobile: ${crop(600, 760)} tablet: ${crop(900, 960, 82)} desktop: ${crop(1200, 1200, 85)}`;
const ctaImage = `mobile: ${crop(600, 900)} tablet: ${crop(1440, 900, 82)} desktop: ${crop(2400, 1000, 85)}`;

const QUERY = /* GraphQL */ `
query SectorDetail($slug: [String]!) {
  category: categories(group: "sector", slug: $slug, limit: 1) {
    ... on sector_Category {
      id title slug accentColor seoPageTitle seoMetaDescription catHdrHeading catHdrSubheading sectorServicesIntro sectorHeritageAdvisoryServices sectorHeritageConservationServices
      catHdrImage { ${heroImage} }
      catOvrHeading catOvrText
      catOverImageText { ... on block3_Entry { image { ${landscapeImage} } leftColumnHeading leftColumnText rightColumnHeading rightColumnText } }
      sectorFeatures { ... on sectorFeature_Entry { sectorFeatureHeading sectorFeatureText sectorFeatureImage { ${landscapeImage} } } }
      catFeaturedProjects { ... on projects_Entry { id title slug uri proHdrHeading thumbnail { ${cardImage} } } }
      catSelectedProjects { ... on projects_Entry { id title slug uri proHdrHeading catStatus { ... on status_Category { title } } catDiscipline { ... on discipline_Category { title } } } }
      catPclPerson { ... on block2_Entry { quote person { ... on people_Entry { title PplName pplProfileImage { ${portraitImage} } } } } }
      ctaSection { ctaSectionBackgroundImage { ${ctaImage} } ctaSectionHeading ctaSectionDescription ctaSectionButtonLabel ctaSectionButtonUrl }
    }
  }
}`;

const FALLBACK_CTA: CtaContent = {
  image: "/images/contact-bg.png", title: "LET’S SHAPE WHAT’S NEXT-TOGETHER",
  description: "Whether it’s a place to gather, to heal, to learn or to live - we’re ready to collaborate. Let’s shape spaces that matter, together.",
  buttonText: "Contact Us", buttonHref: "/contact",
};

function cleanHtml(value: string | null | undefined): string {
  return value?.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim() ?? "";
}

function projectHref(project: Pick<Project, "uri" | "slug">): string {
  return project.uri ? `/${project.uri.replace(/^\/+/, "")}` : `/projects/${project.slug}`;
}

function buildFallback(fallback: SectorItem): SectorDetailContent {
  return {
    title: fallback.label,
    description: fallback.heroSubtitle,
    image: fallback.heroImage,
    principlesTitle: fallback.principlesTitle,
    principlesDescription: fallback.principlesDescription,
    principlesImages: fallback.principlesImages,
    features: fallback.features,
    backgroundColor: fallback.hoverColor,
    keyProjects: fallback.keyProjects,
    tableProjects: fallback.tableProjects,
    quote: fallback.quote,
    cta: FALLBACK_CTA,
    seoTitle: fallback.label,
    seoDescription: fallback.heroSubtitle,
  };
}

export async function getSectorDetailContent(slug: string): Promise<SectorDetailContent | null> {
  const fallback = SECTORS_DATA.find((sector) => sector.slug === slug);
  if (!fallback) return null;

  try {
    const data = await craftFetch<Response>(QUERY, { slug: [slug] });
    const category = data.category?.[0];
    if (!category) return buildFallback(fallback);

    const features = category.sectorFeatures.flatMap((feature) => {
      const image = toImageSource(feature.sectorFeatureImage[0]);
      const title = feature.sectorFeatureHeading?.trim();
      return image && title ? [{ title, description: feature.sectorFeatureText?.trim() ?? "", image }] : [];
    });

    const principlesImages = category.catOverImageText
    .map((block) => toImageSource(block.image[0]))
    .filter((image): image is ImageSource => Boolean(image));

    const keyProjects = category.catFeaturedProjects.slice(0, 3).map((project, index) => ({ id: project.id, title: project.proHdrHeading?.trim() || project.title, image: toImageSource(project.thumbnail?.[0]) ?? fallback.keyProjects[index]?.image ?? fallback.image, href: projectHref(project) }));
    const tableProjects = category.catSelectedProjects.map((project) => ({ id: project.id, project: project.proHdrHeading?.trim() || project.title, practices: project.catDiscipline.map((discipline) => discipline.title).join(", ") || "—", status: project.catStatus[0]?.title ?? "—", href: projectHref(project) }));
    const quoteBlock = category.catPclPerson.find((block) => block.quote && block.person[0]?.pplProfileImage[0]);
    const person = quoteBlock?.person[0];
    const quoteImage = toImageSource(person?.pplProfileImage[0]);

    const heritageServices = category.slug === "heritage" && category.sectorHeritageAdvisoryServices?.trim()
      ? {
        intro: cleanHtml(category.sectorServicesIntro),
        advisory: category.sectorHeritageAdvisoryServices.split(/\r?\n/).map((item) => item.trim()).filter(Boolean),
        conservation: (category.sectorHeritageConservationServices ?? "").split(/\r?\n/).map((item) => item.trim()).filter(Boolean),
      }
      : undefined;

    return {
      title: category.catHdrHeading?.trim() || category.title || fallback.label,
      description: category.catHdrSubheading?.trim() || fallback.heroSubtitle,
      image: toImageSource(category.catHdrImage[0]) ?? fallback.heroImage,
      principlesTitle: `${category.catOvrHeading?.trim() || "PRINCIPLES"}: ${category.title}`,
      principlesDescription: cleanHtml(category.catOvrText) || fallback.principlesDescription,
      principlesImages: principlesImages.length > 0 ? principlesImages : fallback.principlesImages,
      features: features.length ? features : fallback.features,
      backgroundColor: category.accentColor?.trim() || fallback.hoverColor,
      heritageServices,
      keyProjects: keyProjects.length ? keyProjects : fallback.keyProjects,
      tableProjects: tableProjects.length ? tableProjects : fallback.tableProjects,
      quote: quoteBlock && person && quoteImage ? { image: quoteImage, text: quoteBlock.quote!.trim(), author: person.PplName?.trim() || person.title } : fallback.quote,
      cta: mapCta(category, FALLBACK_CTA),
      seoTitle: category.seoPageTitle?.trim() || category.title,
      seoDescription: category.seoMetaDescription?.trim() || category.catHdrSubheading?.trim() || fallback.heroSubtitle,
    };
  } catch (error) {
    console.warn(`Failed to fetch sector detail for ${slug}, using local fallback:`, error);
    return buildFallback(fallback);
  }
}
