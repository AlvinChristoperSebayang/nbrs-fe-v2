import { craftFetch } from "./craft";
import { toImageSource } from "./media";
import type { ProjectCategory } from "./projects-listing";
import type { ImageSource } from "./types";

export type ProjectSplashSlide = {
  imageUrl: ImageSource | null;
  imageCropping: string | null;
  portraitImageUrl: ImageSource | null;
  portraitImageCropping: string | null;
};

export type ProjectGallerySlide = {
  imageUrl: ImageSource | null;
  heading: string | null;
  text: string | null;
};

export type ProjectAward = {
  award: string | null;
  awardedBy: string | null;
  year: number | null;
  awardUrl: string | null;
};

export type ProjectRelatedEntry = {
  title: string;
  slug: string;
  uri: string | null;
};

export type ProjectRelatedProject = {
  title: string;
  slug: string;
  uri: string | null;
  heading: string | null;
  subheading: string | null;
  thumbnailUrl: ImageSource | null;
  sectorLabel?: string | null;
  practiceLabel?: string | null;
};

export type ProjectV2Block =
  | {
      type: "intro";
      heading: string | null;
      textHtml: string | null;
      image: ImageSource | null;
    }
  | {
      type: "copy";
      heading: string | null;
      textHtml: string | null;
      alignment: "left" | "right";
    }
  | {
      type: "media";
      image: ImageSource | null;
      treatment: "contained" | "fullBleed";
    }
  | {
      type: "feature";
      heading: string | null;
      textHtml: string | null;
      image: ImageSource | null;
      imagePosition: "left" | "right";
    };

export type ProjectDetail = {
  id: string;
  title: string;
  slug: string;
  uri: string | null;
  postDate: string | null;
  heading: string;
  subheading: string | null;
  thumbnailUrl: ImageSource | null;
  popupGalleryUrls: ImageSource[];
  splash: ProjectSplashSlide[];
  useV2Body: boolean;
  v2Content: ProjectV2Block[];
  impactText: string | null;
  impactMediaUrls: ImageSource[];
  impactNumber: string | null;
  impactLabel: string | null;
  storyText: string | null;
  photoCredits: string | null;
  detailSize: number | null;
  detailStatus: string | null;
  detailBudget: number | null;
  insightsHeroImageUrl: ImageSource | null;
  insightsText: string | null;
  insightsGallery: ProjectGallerySlide[];
  awards: ProjectAward[];
  team: ProjectRelatedEntry[];
  conclusionText: string | null;
  conclusionPeople: ProjectRelatedEntry[];
  relatedProjects: ProjectRelatedProject[];
  sectors: ProjectCategory[];
  practices: ProjectCategory[];
  status: ProjectCategory[];
  clients: ProjectCategory[];
  collaborators: ProjectCategory[];
  locations: ProjectCategory[];
  seoPageTitle: string | null;
  seoMetaDescription: string | null;
  seoImageUrl: ImageSource | null;
};

type RawAsset = {
  url?: string;
  mobile?: string;
  tablet?: string;
  desktop?: string;
  width: number | null;
  height: number | null;
  title: string | null;
};

type RawCategory = {
  id: string;
  title: string;
  slug: string;
  accentColor?: string | null;
};

function toProjectCategories(categories: RawCategory[] | undefined): ProjectCategory[] {
  return (categories ?? []).map((c) => ({
    id: c.id,
    title: c.title,
    slug: c.slug,
    accentColor: c.accentColor ?? null,
  }));
}

type RawSplashSlide = {
  image: RawAsset[];
  imageCropping: string | null;
  optionalPortraitImage: RawAsset[];
  portraitImageCropping: string | null;
};

type RawGallerySlide = {
  image: RawAsset[];
  heading: string | null;
  text: string | null;
};

type RawProjectV2Block = {
  __typename: string;
  proV2Heading?: string | null;
  proV2Text?: string | null;
  proV2Image?: RawAsset[];
  proV2CopyAlignment?: string | null;
  proV2MediaTreatment?: string | null;
  proV2ImagePosition?: string | null;
};

type RawAward = {
  award: string | null;
  awarded: string | null;
  year: number | null;
  awardURL: string | null;
};

type RawRelatedEntry = {
  title: string;
  slug: string;
  uri: string | null;
};

type RawRelatedProject = {
  title: string;
  slug: string;
  uri: string | null;
  proHdrHeading: string | null;
  proHdrSubheading: string | null;
  thumbnail: RawAsset[];
  catSector?: RawCategory[];
  catDiscipline?: RawCategory[];
};

type RawProjectEntry = {
  id: string;
  title: string;
  slug: string;
  uri: string | null;
  postDate: string | null;
  proHdrHeading: string;
  proHdrSubheading: string | null;
  thumbnail: RawAsset[];
  proHdrPopupGallery: RawAsset[];
  proHdrSplash: RawSplashSlide[];
  proV2Enabled: boolean | null;
  proV2Content: RawProjectV2Block[];
  proImpText: string | null;
  proImpMedia: RawAsset[];
  proImpNumber: string | null;
  proImpLabel: string | null;
  proStoryText: string | null;
  proPhotoCredits: string | null;
  proDetSize: number | null;
  proDetStatus: string | null;
  proDetBudget: number | null;
  proInsHeroImage: RawAsset[];
  proInsText: string | null;
  proInsGallery: RawGallerySlide[];
  proAwdTable: RawAward[];
  proTeam: RawRelatedEntry[];
  proConText: string | null;
  proConPeople: RawRelatedEntry[];
  proRelated: RawRelatedProject[];
  catSector: RawCategory[];
  catDiscipline: RawCategory[];
  catStatus: RawCategory[];
  catClient: RawCategory[];
  catCollaborators: RawCategory[];
  catLocation: RawCategory[];
  seoPageTitle: string | null;
  seoMetaDescription: string | null;
  seoImage: RawAsset[];
};

type ProjectDetailResponse = {
  entry: RawProjectEntry[];
};

const PROJECT_DETAIL_QUERY = /* GraphQL */ `
  query ProjectDetail($slug: [String]) {
    entry: entries(section: "projects", slug: $slug) {
      ... on projects_Entry {
        id
        title
        slug
        uri
        postDate
        proHdrHeading
        proHdrSubheading
        thumbnail {
          mobile: url @transform(width: 600, height: 750, mode: "crop", format: "webp", quality: 80, immediately: true)
          tablet: url @transform(width: 1440, height: 900, mode: "crop", format: "webp", quality: 82, immediately: true)
          desktop: url @transform(width: 2400, height: 1500, mode: "crop", format: "webp", quality: 85, immediately: true)
          width
          height
          title
        }
        proHdrPopupGallery {
          url: url @transform(width: 1600, format: "webp", quality: 82, immediately: true)
          width
          height
          title
        }
        proHdrSplash {
          ... on slide4_Entry {
            image {
              url: url @transform(width: 2400, format: "webp", quality: 85, immediately: true)
              width
              height
              title
            }
            imageCropping
            optionalPortraitImage {
              url: url @transform(width: 1200, format: "webp", quality: 80, immediately: true)
              width
              height
              title
            }
            portraitImageCropping
          }
        }
        proV2Enabled
        proV2Content {
          __typename
          ... on projectV2Intro_Entry {
            proV2Heading
            proV2Text
            proV2Image {
              mobile: url @transform(width: 600, height: 450, mode: "crop", format: "webp", quality: 80, immediately: true)
              tablet: url @transform(width: 1200, height: 675, mode: "crop", format: "webp", quality: 82, immediately: true)
              desktop: url @transform(width: 2400, height: 1350, mode: "crop", format: "webp", quality: 85, immediately: true)
              width
              height
              title
            }
          }
          ... on projectV2Copy_Entry {
            proV2Heading
            proV2Text
            proV2CopyAlignment
          }
          ... on projectV2Media_Entry {
            proV2MediaTreatment
            proV2Image {
              mobile: url @transform(width: 600, height: 450, mode: "crop", format: "webp", quality: 80, immediately: true)
              tablet: url @transform(width: 1440, height: 810, mode: "crop", format: "webp", quality: 82, immediately: true)
              desktop: url @transform(width: 2400, height: 1350, mode: "crop", format: "webp", quality: 85, immediately: true)
              width
              height
              title
            }
          }
          ... on projectV2Feature_Entry {
            proV2Heading
            proV2Text
            proV2Image {
              mobile: url @transform(width: 600, height: 316, mode: "crop", format: "webp", quality: 80, immediately: true)
              tablet: url @transform(width: 900, height: 474, mode: "crop", format: "webp", quality: 82, immediately: true)
              desktop: url @transform(width: 1200, height: 632, mode: "crop", format: "webp", quality: 85, immediately: true)
              width
              height
              title
            }
            proV2ImagePosition
          }
        }
        proImpText
        proImpMedia {
          url: url @transform(width: 1600, format: "webp", quality: 82, immediately: true)
          width
          height
          title
        }
        proImpNumber
        proImpLabel
        proStoryText
        proPhotoCredits
        proDetSize
        proDetStatus
        proDetBudget
        proInsHeroImage {
          url: url @transform(width: 1600, format: "webp", quality: 82, immediately: true)
          width
          height
          title
        }
        proInsText
        proInsGallery {
          ... on slide3_Entry {
            image {
              url: url @transform(width: 1600, format: "webp", quality: 82, immediately: true)
              width
              height
              title
            }
            heading
            text
          }
        }
        proAwdTable {
          ... on award2_Entry {
            award
            awarded
            year
            awardURL
          }
        }
        proTeam {
          title
          slug
          uri
        }
        proConText
        proConPeople {
          title
          slug
          uri
        }
        proRelated {
          ... on projects_Entry {
            title
            slug
            uri
            proHdrHeading
            proHdrSubheading
            thumbnail {
              url: url @transform(width: 1200, format: "webp", quality: 80, immediately: true)
              width
              height
              title
            }
            catSector {
              ... on sector_Category {
                id
                title
                slug
                accentColor
              }
            }
            catDiscipline {
              ... on discipline_Category {
                id
                title
                slug
                accentColor
              }
            }
          }
        }
        catSector {
          ... on sector_Category {
            id
            title
            slug
            accentColor
          }
        }
        catDiscipline {
          ... on discipline_Category {
            id
            title
            slug
            accentColor
          }
        }
        catStatus {
          id
          title
          slug
        }
        catClient {
          id
          title
          slug
        }
        catCollaborators {
          id
          title
          slug
        }
        catLocation {
          id
          title
          slug
        }
        seoPageTitle
        seoMetaDescription
        seoImage {
          url: url @transform(width: 2400, format: "webp", quality: 85, immediately: true)
          width
          height
          title
        }
      }
    }
  }
`;

export async function getProjectDetail(
  slug: string
): Promise<ProjectDetail | null> {
  const data = await craftFetch<ProjectDetailResponse>(PROJECT_DETAIL_QUERY, {
    slug: [slug],
  });

  // console.log("[getProjectDetail] raw entry for slug:", slug, data.entry);

  const entry = data.entry?.[0];
  if (!entry) return null;

  const v2Content = (entry.proV2Content ?? []).flatMap(
    (block): ProjectV2Block[] => {
      const image = toImageSource(block.proV2Image?.[0]);

      switch (block.__typename) {
        case "projectV2Intro_Entry":
          return [{ type: "intro", heading: block.proV2Heading ?? null, textHtml: block.proV2Text ?? null, image }];
        case "projectV2Copy_Entry":
          return [{
            type: "copy",
            heading: block.proV2Heading ?? null,
            textHtml: block.proV2Text ?? null,
            alignment: block.proV2CopyAlignment === "right" ? "right" : "left",
          }];
        case "projectV2Media_Entry":
          return [{
            type: "media",
            image,
            treatment: block.proV2MediaTreatment === "fullBleed" ? "fullBleed" : "contained",
          }];
        case "projectV2Feature_Entry":
          return [{
            type: "feature",
            heading: block.proV2Heading ?? null,
            textHtml: block.proV2Text ?? null,
            image,
            imagePosition: block.proV2ImagePosition === "left" ? "left" : "right",
          }];
        default:
          return [];
      }
    }
  );

  return {
    id: entry.id,
    title: entry.title,
    slug: entry.slug,
    uri: entry.uri,
    postDate: entry.postDate,
    heading: entry.proHdrHeading,
    subheading: entry.proHdrSubheading,
    thumbnailUrl: toImageSource(entry.thumbnail?.[0]),
    popupGalleryUrls: (entry.proHdrPopupGallery ?? []).map(toImageSource).filter((image): image is ImageSource => Boolean(image)),
    splash: (entry.proHdrSplash ?? []).map((slide) => ({
      imageUrl: toImageSource(slide.image?.[0]),
      imageCropping: slide.imageCropping,
      portraitImageUrl: toImageSource(slide.optionalPortraitImage?.[0]),
      portraitImageCropping: slide.portraitImageCropping,
    })),
    useV2Body: entry.proV2Enabled === true,
    v2Content,
    impactText: entry.proImpText,
    impactMediaUrls: (entry.proImpMedia ?? []).map(toImageSource).filter((image): image is ImageSource => Boolean(image)),
    impactNumber: entry.proImpNumber,
    impactLabel: entry.proImpLabel,
    storyText: entry.proStoryText,
    photoCredits: entry.proPhotoCredits,
    detailSize: entry.proDetSize,
    detailStatus: entry.proDetStatus,
    detailBudget: entry.proDetBudget,
    insightsHeroImageUrl: toImageSource(entry.proInsHeroImage?.[0]),
    insightsText: entry.proInsText,
    insightsGallery: (entry.proInsGallery ?? []).map((slide) => ({
      imageUrl: toImageSource(slide.image?.[0]),
      heading: slide.heading,
      text: slide.text,
    })),
    awards: (entry.proAwdTable ?? []).map((award) => ({
      award: award.award,
      awardedBy: award.awarded,
      year: award.year,
      awardUrl: award.awardURL,
    })),
    team: entry.proTeam ?? [],
    conclusionText: entry.proConText,
    conclusionPeople: entry.proConPeople ?? [],
    relatedProjects: (entry.proRelated ?? [])
      .filter((project) => Boolean(project && (project.slug || project.title)))
      .map((project) => ({
        title: project.title ?? project.proHdrHeading ?? "Project",
        slug: project.slug,
        uri: project.uri ?? null,
        heading: project.proHdrHeading ?? null,
        subheading: project.proHdrSubheading ?? null,
        thumbnailUrl: toImageSource(project.thumbnail?.[0]),
        sectorLabel: (project.catSector ?? []).map((s) => s.title).join(", ") || null,
        practiceLabel: (project.catDiscipline ?? []).map((d) => d.title).join(", ") || null,
      })),
    sectors: toProjectCategories(entry.catSector),
    practices: toProjectCategories(entry.catDiscipline),
    status: toProjectCategories(entry.catStatus),
    clients: toProjectCategories(entry.catClient),
    collaborators: toProjectCategories(entry.catCollaborators),
    locations: toProjectCategories(entry.catLocation),
    seoPageTitle: entry.seoPageTitle,
    seoMetaDescription: entry.seoMetaDescription,
    seoImageUrl: toImageSource(entry.seoImage?.[0]),
  };
}

type KeyProjectsFallbackResponse = {
  bySector?: RawRelatedProject[];
  byDiscipline?: RawRelatedProject[];
  latest?: RawRelatedProject[];
};

const KEY_PROJECTS_FALLBACK_QUERY = /* GraphQL */ `
  query KeyProjectsFallback(
    $excludeId: [QueryArgument]
    $sectorFilter: [CategoryRelationCriteriaInput]
    $disciplineFilter: [CategoryRelationCriteriaInput]
  ) {
    bySector: entries(
      section: "projects"
      limit: 3
      orderBy: "postDate DESC"
      relatedToCategories: $sectorFilter
      id: $excludeId
    ) {
      ... on projects_Entry {
        id
        title
        slug
        uri
        proHdrHeading
        proHdrSubheading
        thumbnail {
          url: url @transform(width: 1200, format: "webp", quality: 80, immediately: true)
          width
          height
          title
        }
        catSector {
          ... on sector_Category {
            id
            title
            slug
            accentColor
          }
        }
        catDiscipline {
          ... on discipline_Category {
            id
            title
            slug
            accentColor
          }
        }
      }
    }

    byDiscipline: entries(
      section: "projects"
      limit: 3
      orderBy: "postDate DESC"
      relatedToCategories: $disciplineFilter
      id: $excludeId
    ) {
      ... on projects_Entry {
        id
        title
        slug
        uri
        proHdrHeading
        proHdrSubheading
        thumbnail {
          url: url @transform(width: 1200, format: "webp", quality: 80, immediately: true)
          width
          height
          title
        }
        catSector {
          ... on sector_Category {
            id
            title
            slug
            accentColor
          }
        }
        catDiscipline {
          ... on discipline_Category {
            id
            title
            slug
            accentColor
          }
        }
      }
    }

    latest: entries(
      section: "projects"
      limit: 3
      orderBy: "postDate DESC"
      id: $excludeId
    ) {
      ... on projects_Entry {
        id
        title
        slug
        uri
        proHdrHeading
        proHdrSubheading
        thumbnail {
          url: url @transform(width: 1200, format: "webp", quality: 80, immediately: true)
          width
          height
          title
        }
        catSector {
          ... on sector_Category {
            id
            title
            slug
            accentColor
          }
        }
        catDiscipline {
          ... on discipline_Category {
            id
            title
            slug
            accentColor
          }
        }
      }
    }
  }
`;

export async function getKeyProjectsForDetail(
  project: ProjectDetail
): Promise<ProjectRelatedProject[]> {
  // 1. Manual / Curated inputs from proRelated
  const curated = (project.relatedProjects ?? []).filter(
    (p) => Boolean(p && (p.slug || p.title))
  );

  if (curated.length >= 3) {
    return curated.slice(0, 3);
  }

  // 2. Fallback query (Sector -> Discipline -> Latest)
  try {
    const sectorSlugs = project.sectors.map((s) => s.slug).filter(Boolean);
    const disciplineSlugs = project.practices.map((p) => p.slug).filter(Boolean);

    const sectorFilter =
      sectorSlugs.length > 0
        ? [{ group: "sector", slug: sectorSlugs }]
        : null;
    const disciplineFilter =
      disciplineSlugs.length > 0
        ? [{ group: "discipline", slug: disciplineSlugs }]
        : null;
    const excludeId = project.id ? ["not", project.id] : undefined;

    const data = await craftFetch<KeyProjectsFallbackResponse>(
      KEY_PROJECTS_FALLBACK_QUERY,
      {
        excludeId,
        sectorFilter,
        disciplineFilter,
      }
    );

    const mapItem = (raw: RawRelatedProject): ProjectRelatedProject => ({
      title: raw.title ?? raw.proHdrHeading ?? "Project",
      slug: raw.slug,
      uri: raw.uri ?? null,
      heading: raw.proHdrHeading ?? null,
      subheading: raw.proHdrSubheading ?? null,
      thumbnailUrl: toImageSource(raw.thumbnail?.[0]),
      sectorLabel: (raw.catSector ?? []).map((s) => s.title).join(", ") || null,
      practiceLabel: (raw.catDiscipline ?? []).map((d) => d.title).join(", ") || null,
    });

    const sectorItems = (data.bySector ?? []).map(mapItem).filter((p) => Boolean(p.slug));
    const disciplineItems = (data.byDiscipline ?? []).map(mapItem).filter((p) => Boolean(p.slug));
    const latestItems = (data.latest ?? []).map(mapItem).filter((p) => Boolean(p.slug));

    const result: ProjectRelatedProject[] = [...curated];

    const addUnique = (items: ProjectRelatedProject[]) => {
      for (const item of items) {
        if (result.length >= 3) break;
        if (!result.some((r) => r.slug === item.slug)) {
          result.push(item);
        }
      }
    };

    // Priority 1: Sector
    addUnique(sectorItems);
    // Priority 2: Discipline / Practice
    addUnique(disciplineItems);
    // Priority 3: Latest
    addUnique(latestItems);

    return result.slice(0, 3);
  } catch (error) {
    console.error("[getKeyProjectsForDetail] Fallback query failed:", error);
    return curated;
  }
}
