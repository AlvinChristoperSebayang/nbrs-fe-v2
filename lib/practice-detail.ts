import type { ProjectTableRow } from "@/components/sectors/ProjectListTableSection";
import { mapCta } from "./cta";
import { craftFetch } from "./craft";
import { toImageSource } from "./media";
import { PRACTICES_DATA, type PracticeDetail } from "./practices-data";
import { SECTORS_DATA } from "./sectors-data";
import type { CtaContent, ImageSource, Sector } from "./types";

type Asset = { url?: string; mobile?: string; tablet?: string; desktop?: string; width?: number | null; height?: number | null; title?: string | null };
type Project = {
  id: string;
  title: string;
  slug: string;
  uri: string | null;
  proHdrHeading: string | null;
  catStatus: Array<{ title: string }>;
  catSector: Array<{ title: string }>;
};
type FeaturedSector = {
  title: string;
  slug: string;
  tagline: string | null;
  accentColor: string | null;
  thumbnail: Asset[];
};
type RawCta = {
  ctaSectionBackgroundImage: Asset[];
  ctaSectionHeading: string | null;
  ctaSectionDescription: string | null;
  ctaSectionButtonLabel: string | null;
  ctaSectionButtonUrl: string | null;
  ctaSectionSecondaryButtonLabel: string | null;
  ctaSectionSecondaryButtonUrl: string | null;
};
type Category = {
  title: string;
  seoPageTitle: string | null;
  seoMetaDescription: string | null;
  seoImage: Asset[];
  catHdrHeading: string | null;
  catHdrSubheading: string | null;
  catHdrImage: Asset[];
  catOvrText: string | null;
  catOvrGallery: Asset[];
  catSelectedProjects: Project[];
  ctaSection: RawCta | null;
  practiceFeaturedSectors: FeaturedSector[];
};
type Response = { category: Category[]; fallbackProjects: Project[] };

export type PracticeDetailContent = {
  title: string;
  description: string;
  image: ImageSource;
  introImage: ImageSource;
  introText: string;
  tableProjects: ProjectTableRow[];
  sectors: Sector[];
  cta: CtaContent;
  cmsSeoTitle: string | null;
  seoDescription: string;
  seoImage: Asset | null;
};

const CATEGORY_SLUGS: Record<string, string> = {
  architecture: "architecture",
  "interior-design": "interiors",
  "landscape-architecture": "landscape",
};

const fit = (width: number, quality = 80) =>
  `url @transform(width: ${width}, mode: "fit", format: "webp", quality: ${quality}, immediately: true)`;
const heroFit = (width: number, quality = 85) =>
  `url @transform(width: ${width}, mode: "fit", format: "webp", quality: ${quality}, immediately: true)`;
const heroImage = `mobile: ${heroFit(768, 80)} tablet: ${heroFit(1440, 82)} desktop: ${heroFit(2400, 85)}`;
const introImage = `mobile: ${fit(768, 80)} tablet: ${fit(1440, 82)} desktop: ${fit(1920, 85)}`;
const sectorCardImage = `mobile: ${fit(600, 80)} tablet: ${fit(900, 82)} desktop: ${fit(1200, 85)}`;
const ctaImage = `mobile: url @transform(width: 768, height: 900, position: "top-left", mode: "crop", format: "webp", quality: 80, immediately: true) tablet: ${heroFit(1440, 82)} desktop: ${heroFit(2400, 85)}`;

const PROJECT_FIELDS = /* GraphQL */ `
  id
  title
  slug
  uri
  proHdrHeading
  catStatus { ... on status_Category { title } }
  catSector { ... on sector_Category { title } }
`;

const QUERY = /* GraphQL */ `
query PracticeDetail($categorySlug: [String]!) {
  category: categories(group: "discipline", slug: $categorySlug, limit: 1) {
    ... on discipline_Category {
      title
      seoPageTitle
      seoMetaDescription
      seoImage { url width height title }
      catHdrHeading
      catHdrSubheading
      catHdrImage { url width height title ${heroImage} }
      catOvrText
      catOvrGallery { url width height title ${introImage} }
      catSelectedProjects { ... on projects_Entry { ${PROJECT_FIELDS} } }
      practiceFeaturedSectors {
        ... on sector_Category {
          title
          slug
          tagline
          accentColor
          thumbnail { ${sectorCardImage} }
        }
      }
      ctaSection {
        ctaSectionBackgroundImage { ${ctaImage} }
        ctaSectionHeading
        ctaSectionDescription
        ctaSectionButtonLabel
        ctaSectionButtonUrl
        ctaSectionSecondaryButtonLabel
        ctaSectionSecondaryButtonUrl
      }
    }
  }
  fallbackProjects: entries(
    section: ["projects"]
    relatedToCategories: [{ group: "discipline", slug: $categorySlug }]
    orderBy: "postDate DESC"
    limit: 3
  ) {
    ... on projects_Entry { ${PROJECT_FIELDS} }
  }
}
`;

function cleanHtml(value: string | null | undefined): string {
  return value
    ?.replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim() ?? "";
}

function projectHref(project: Pick<Project, "uri" | "slug">): string {
  return project.uri ? `/${project.uri.replace(/^\/+/, "")}` : `/projects/${project.slug}`;
}

function mapProjects(projects: Project[]): ProjectTableRow[] {
  return projects.map((project) => ({
    id: project.id,
    project: project.proHdrHeading?.trim() || project.title,
    practices: project.catSector.map((sector) => sector.title).join(", ") || "—",
    status: project.catStatus[0]?.title ?? "—",
    href: projectHref(project),
  }));
}

function ctaFor(title: string): CtaContent {
  return {
    image: "/images/contact-bg.png",
    title: "GET IN TOUCH",
    description: `Interested in our ${title.toLowerCase()} projects or have any questions?`,
    buttonText: "CONTACT US",
    buttonHref: "/contact",
  };
}

function mapPracticeCta(category: Pick<Category, "ctaSection">, fallback: CtaContent): CtaContent {
  const cta = category.ctaSection;
  const hasContent = Boolean(
    cta && (
      cta.ctaSectionBackgroundImage.length ||
      cta.ctaSectionHeading?.trim() ||
      cta.ctaSectionDescription?.trim() ||
      cta.ctaSectionButtonLabel?.trim() ||
      cta.ctaSectionButtonUrl?.trim() ||
      cta.ctaSectionSecondaryButtonLabel?.trim() ||
      cta.ctaSectionSecondaryButtonUrl?.trim()
    )
  );

  return hasContent ? mapCta(category, fallback) : fallback;
}

const FALLBACK_SECTORS: Sector[] = SECTORS_DATA.map(({ label, image, href, description, hoverColor }) => ({
  label,
  image,
  href,
  description,
  hoverColor,
}));

function mapFeaturedSectors(sectors: FeaturedSector[]): Sector[] {
  const mapped = sectors.map((sector) => {
    const fallback = FALLBACK_SECTORS.find((item) => item.href === `/sectors/${sector.slug}`);
    if (!fallback) return null;

    return {
      label: sector.title.trim() || fallback.label,
      image: toImageSource(sector.thumbnail[0]) ?? fallback.image,
      href: `/sectors/${sector.slug}`,
      description: sector.tagline?.trim() || fallback.description,
      hoverColor: sector.accentColor?.trim() || fallback.hoverColor,
    };
  }).filter((sector): sector is Sector => Boolean(sector));

  return mapped.length ? mapped : FALLBACK_SECTORS;
}

function buildFallback(fallback: PracticeDetail): PracticeDetailContent {
  return {
    title: fallback.title,
    description: fallback.description,
    image: fallback.heroImage,
    introImage: fallback.introImage,
    introText: fallback.introQuote,
    tableProjects: fallback.tableProjects.map((project) => ({
      id: project.id,
      project: project.title,
      practices: project.sector,
      status: project.status,
      href: project.href,
    })),
    sectors: FALLBACK_SECTORS,
    cta: ctaFor(fallback.title),
    cmsSeoTitle: null,
    seoDescription: fallback.description,
    seoImage: null,
  };
}

export async function getPracticeDetailContent(routeSlug: string): Promise<PracticeDetailContent | null> {
  const fallback = PRACTICES_DATA.find((practice) => practice.slug === routeSlug);
  const categorySlug = CATEGORY_SLUGS[routeSlug];
  if (!fallback || !categorySlug) return null;

  try {
    const data = await craftFetch<Response>(QUERY, { categorySlug: [categorySlug] });
    const category = data.category[0];
    if (!category) return buildFallback(fallback);

    const title = category.catHdrHeading?.trim() || category.title || fallback.title;
    const selectedProjects = category.catSelectedProjects.length
      ? category.catSelectedProjects
      : data.fallbackProjects;

    return {
      title,
      description: category.catHdrSubheading?.trim() || fallback.description,
      image: toImageSource(category.catHdrImage[0]) ?? fallback.heroImage,
      introImage: toImageSource(category.catOvrGallery[0]) ?? fallback.introImage,
      introText: cleanHtml(category.catOvrText) || fallback.introQuote,
      tableProjects: mapProjects(selectedProjects),
      sectors: mapFeaturedSectors(category.practiceFeaturedSectors),
      cta: mapPracticeCta(category, ctaFor(title)),
      cmsSeoTitle: category.seoPageTitle?.trim() || null,
      seoDescription: cleanHtml(category.seoMetaDescription) || category.catHdrSubheading?.trim() || fallback.description,
      seoImage: category.seoImage?.[0] ?? category.catHdrImage?.[0] ?? null,
    };
  } catch (error) {
    console.warn(`Failed to fetch practice detail for ${routeSlug}, using local fallback:`, error);
    return buildFallback(fallback);
  }
}
