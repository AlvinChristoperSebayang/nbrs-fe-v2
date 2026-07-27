import { craftFetch } from "./craft";
import type { ProjectCategory } from "./projects-listing";

export type ProjectSplashSlide = {
  imageUrl: string | null;
  imageCropping: string | null;
  portraitImageUrl: string | null;
  portraitImageCropping: string | null;
};

export type ProjectGallerySlide = {
  imageUrl: string | null;
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
  thumbnailUrl: string | null;
};

export type ProjectDetail = {
  id: string;
  title: string;
  slug: string;
  uri: string | null;
  postDate: string | null;
  heading: string;
  subheading: string | null;
  thumbnailUrl: string | null;
  popupGalleryUrls: string[];
  splash: ProjectSplashSlide[];
  impactText: string | null;
  impactMediaUrls: string[];
  impactNumber: string | null;
  impactLabel: string | null;
  storyText: string | null;
  photoCredits: string | null;
  detailSize: number | null;
  detailStatus: string | null;
  detailBudget: number | null;
  insightsHeroImageUrl: string | null;
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
  seoImageUrl: string | null;
};

type RawAsset = {
  url: string;
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
          url
          width
          height
          title
        }
        proHdrPopupGallery {
          url
          width
          height
          title
        }
        proHdrSplash {
          ... on slide4_Entry {
            image {
              url
              width
              height
              title
            }
            imageCropping
            optionalPortraitImage {
              url
              width
              height
              title
            }
            portraitImageCropping
          }
        }
        proImpText
        proImpMedia {
          url
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
          url
          width
          height
          title
        }
        proInsText
        proInsGallery {
          ... on slide3_Entry {
            image {
              url
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
              url
              width
              height
              title
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
          url
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

  return {
    id: entry.id,
    title: entry.title,
    slug: entry.slug,
    uri: entry.uri,
    postDate: entry.postDate,
    heading: entry.proHdrHeading,
    subheading: entry.proHdrSubheading,
    thumbnailUrl: entry.thumbnail?.[0]?.url ?? null,
    popupGalleryUrls: (entry.proHdrPopupGallery ?? []).map((a) => a.url),
    splash: (entry.proHdrSplash ?? []).map((slide) => ({
      imageUrl: slide.image?.[0]?.url ?? null,
      imageCropping: slide.imageCropping,
      portraitImageUrl: slide.optionalPortraitImage?.[0]?.url ?? null,
      portraitImageCropping: slide.portraitImageCropping,
    })),
    impactText: entry.proImpText,
    impactMediaUrls: (entry.proImpMedia ?? []).map((a) => a.url),
    impactNumber: entry.proImpNumber,
    impactLabel: entry.proImpLabel,
    storyText: entry.proStoryText,
    photoCredits: entry.proPhotoCredits,
    detailSize: entry.proDetSize,
    detailStatus: entry.proDetStatus,
    detailBudget: entry.proDetBudget,
    insightsHeroImageUrl: entry.proInsHeroImage?.[0]?.url ?? null,
    insightsText: entry.proInsText,
    insightsGallery: (entry.proInsGallery ?? []).map((slide) => ({
      imageUrl: slide.image?.[0]?.url ?? null,
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
    relatedProjects: (entry.proRelated ?? []).map((project) => ({
      title: project.title,
      slug: project.slug,
      uri: project.uri,
      heading: project.proHdrHeading,
      subheading: project.proHdrSubheading,
      thumbnailUrl: project.thumbnail?.[0]?.url ?? null,
    })),
    sectors: toProjectCategories(entry.catSector),
    practices: toProjectCategories(entry.catDiscipline),
    status: toProjectCategories(entry.catStatus),
    clients: toProjectCategories(entry.catClient),
    collaborators: toProjectCategories(entry.catCollaborators),
    locations: toProjectCategories(entry.catLocation),
    seoPageTitle: entry.seoPageTitle,
    seoMetaDescription: entry.seoMetaDescription,
    seoImageUrl: entry.seoImage?.[0]?.url ?? null,
  };
}
