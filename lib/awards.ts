import { craftFetch } from "./craft";
import { toImageSource, type RawResponsiveAsset } from "./media";
import type { CtaContent, ImageSource } from "./types";
import { DUMMY_AWARDS, type AwardItem } from "./awards-data";

type RawAward = {
  award: string | null;
  awarded: string | null;
  year: string | null;
  awardURL: string | null;
  awardImage: RawResponsiveAsset[];
};

type RawBlock =
  | {
      __typename: "blocks_text_BlockType";
      sectionHeading: string | null;
      text: string | null;
      image: RawResponsiveAsset[];
    }
  | {
      __typename: "blocks_awards_BlockType";
      sectionHeading: string | null;
      text: string | null;
      awards: RawAward[];
    };

type RawPage = {
  pageHeading: string | null;
  pageSubheading: string | null;
  pageHeroImage: RawResponsiveAsset[];
  pageHeroCtaLabel: string | null;
  pageHeroCtaUrl: string | null;
  pageIntroCtaLabel: string | null;
  pageIntroCtaUrl: string | null;
  blocks: RawBlock[];
  ctaSection: {
    ctaSectionBackgroundImage: RawResponsiveAsset[];
    ctaSectionHeading: string | null;
    ctaSectionDescription: string | null;
    ctaSectionButtonLabel: string | null;
    ctaSectionButtonUrl: string | null;
    ctaSectionSecondaryButtonLabel?: string | null;
    ctaSectionSecondaryButtonUrl?: string | null;
  } | null;
};

type RawProject = {
  title: string | null;
  proHdrHeading: string | null;
  projectImage: RawResponsiveAsset[];
};

type AwardsResponse = {
  page: RawPage[];
  projects: RawProject[];
};

export type AwardsPageContent = {
  hero: { title: string; description: string; image: ImageSource; button: { text: string; href: string } };
  intro: { heading: string; description: string; image: ImageSource; button: { text: string; href: string } };
  awards: { heading: string; description: string; items: AwardItem[] };
  cta: CtaContent;
};

const FALLBACK_CTA: CtaContent = {
  image: "/images/contact-bg.png",
  title: "BEYOND RECOGNITION, THERE’S RESPONSIBILITY",
  description: "Every accolade is a reflection of deeper intent. Explore the thinking behind the work.",
  buttonText: "DISCOVER THE DESIGN APPROACH",
  buttonHref: "/design-approach",
  secondaryButtonText: "SEE RESEARCH & INSIGHTS",
  secondaryButtonHref: "/research",
};

const FALLBACK: AwardsPageContent = {
  hero: {
    title: "AWARD-WINNING DESIGN SHAPING COMMUNITIES",
    description: "Our work is recognised for elevating everyday experience through purposeful, people-centred design.",
    image: "/images/hero/hero4.png",
    button: { text: "Learn more", href: "#recognising-awards" },
  },
  intro: {
    heading: "BEST IN PRACTICE – AIA AWARD 2022",
    description: "This recognition reflects NBRS' commitment to creating life-changing environments that elevate public value and human experience.",
    image: "/images/about-us-about.png",
    button: { text: "Learn more", href: "/news" },
  },
  awards: {
    heading: "RECOGNISING WHAT MATTERS",
    description: "Our awards celebrate projects defined not only by form but by function, purpose and measurable community benefit, each shaped by designing for people and place.",
    items: DUMMY_AWARDS,
  },
  cta: FALLBACK_CTA,
};

const PROJECT_SLUGS = [
  "the-pavilion-performing-arts-centre",
  "porter-house",
  "waves-fitness-and-aquatic-centre",
  "bay-pavilions",
  "armidale-secondary-college",
  "dillwynia-correctional-centre-expansion",
  "cairnsfoot-additional-needs-school-landscape",
  "taronga-institute-of-science-and-learning",
  "fairfield-primary-school",
  "willoughby-uniting-church",
];

const AWARDS_QUERY = /* GraphQL */ `
  query AwardsPage($projectSlugs: [String!]!) {
    page: entries(section: ["pages"], slug: ["awards"], limit: 1) {
      ... on pages_Entry {
        pageHeading
        pageSubheading
        pageHeroImage {
          mobile: url @transform(width: 600, height: 800, mode: "crop", format: "webp", quality: 80, immediately: true)
          tablet: url @transform(width: 1440, height: 1000, mode: "crop", format: "webp", quality: 82, immediately: true)
          desktop: url @transform(width: 2400, height: 1200, mode: "crop", format: "webp", quality: 85, immediately: true)
        }
        pageHeroCtaLabel
        pageHeroCtaUrl
        pageIntroCtaLabel
        pageIntroCtaUrl
        blocks {
          __typename
          ... on blocks_text_BlockType {
            sectionHeading
            text
            image {
              mobile: url @transform(width: 600, height: 450, mode: "crop", format: "webp", quality: 80, immediately: true)
              tablet: url @transform(width: 900, height: 675, mode: "crop", format: "webp", quality: 82, immediately: true)
              desktop: url @transform(width: 1200, height: 900, mode: "crop", format: "webp", quality: 85, immediately: true)
            }
          }
          ... on blocks_awards_BlockType {
            sectionHeading
            text
            awards {
              ... on award_Entry {
                award
                awarded
                year
                awardURL
                awardImage {
                  mobile: url @transform(width: 600, height: 450, mode: "crop", format: "webp", quality: 80, immediately: true)
                  tablet: url @transform(width: 900, height: 675, mode: "crop", format: "webp", quality: 82, immediately: true)
                  desktop: url @transform(width: 1200, height: 900, mode: "crop", format: "webp", quality: 85, immediately: true)
                }
              }
            }
          }
        }
        ctaSection {
          ctaSectionBackgroundImage {
            mobile: url @transform(width: 600, height: 900, mode: "crop", format: "webp", quality: 80, immediately: true)
            tablet: url @transform(width: 1440, height: 900, mode: "crop", format: "webp", quality: 82, immediately: true)
            desktop: url @transform(width: 2400, height: 1000, mode: "crop", format: "webp", quality: 85, immediately: true)
          }
          ctaSectionHeading
          ctaSectionDescription
          ctaSectionButtonLabel
          ctaSectionButtonUrl
          ctaSectionSecondaryButtonLabel
          ctaSectionSecondaryButtonUrl
        }
      }
    }
    projects: entries(section: ["projects"], slug: $projectSlugs, limit: 20) {
      title
      ... on projects_Entry {
        proHdrHeading
        projectImage: thumbnail {
          mobile: url @transform(width: 600, height: 450, mode: "crop", format: "webp", quality: 80, immediately: true)
          tablet: url @transform(width: 900, height: 675, mode: "crop", format: "webp", quality: 82, immediately: true)
          desktop: url @transform(width: 1200, height: 900, mode: "crop", format: "webp", quality: 85, immediately: true)
        }
      }
    }
  }
`;

function clean(value: string | null | undefined): string {
  return value?.replace(/<[^>]+>/g, "").trim() ?? "";
}

function normalized(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

function splitAward(value: string): { title: string; commendation?: string } {
  const separator = value.indexOf(" - ");
  if (separator < 0) return { title: value };
  return {
    title: value.slice(0, separator).trim(),
    commendation: value.slice(separator + 3).trim() || undefined,
  };
}

function projectImage(projectName: string, projects: RawProject[], fallback: ImageSource): ImageSource {
  const target = normalized(projectName);
  const project = projects.find((item) => {
    const name = normalized(item.proHdrHeading || item.title || "");
    return name === target || name.includes(target) || target.includes(name);
  });
  return toImageSource(project?.projectImage?.[0]) || fallback;
}

function mapAwards(raw: RawAward[], projects: RawProject[]): AwardItem[] {
  const items: AwardItem[] = [];
  raw.forEach((item, index) => {
    const projectName = clean(item.award);
    const awarded = clean(item.awarded);
    const year = clean(item.year);
    if (!projectName || !awarded || !year) return;
    const split = splitAward(awarded);
    items.push({
      id: `cms-award-${index + 1}`,
      year,
      projectName,
      projectCategoryColor: "#F0C7BD",
      awardTitle: split.title,
      commendation: split.commendation,
      image: toImageSource(item.awardImage?.[0])
        || projectImage(projectName, projects, DUMMY_AWARDS[index]?.image || "/images/about/practice1.jpg"),
    });
  });
  return items;
}

export async function getAwardsPage(): Promise<AwardsPageContent> {
  try {
    const data = await craftFetch<AwardsResponse>(AWARDS_QUERY, { projectSlugs: PROJECT_SLUGS });
    const entry = data.page[0];
    if (!entry) return FALLBACK;

    const intro = entry.blocks.find((block): block is Extract<RawBlock, { __typename: "blocks_text_BlockType" }> => block.__typename === "blocks_text_BlockType");
    const awardsBlock = entry.blocks.find((block): block is Extract<RawBlock, { __typename: "blocks_awards_BlockType" }> => block.__typename === "blocks_awards_BlockType");
    const items = awardsBlock ? mapAwards(awardsBlock.awards, data.projects) : [];
    const cta = entry.ctaSection;

    return {
      hero: {
        title: clean(entry.pageHeading) || FALLBACK.hero.title,
        description: clean(entry.pageSubheading) || FALLBACK.hero.description,
        image: toImageSource(entry.pageHeroImage[0]) || FALLBACK.hero.image,
        button: { text: clean(entry.pageHeroCtaLabel) || FALLBACK.hero.button.text, href: clean(entry.pageHeroCtaUrl) || FALLBACK.hero.button.href },
      },
      intro: {
        heading: clean(intro?.sectionHeading) || FALLBACK.intro.heading,
        description: clean(intro?.text) || FALLBACK.intro.description,
        image: toImageSource(intro?.image?.[0]) || FALLBACK.intro.image,
        button: { text: clean(entry.pageIntroCtaLabel) || FALLBACK.intro.button.text, href: clean(entry.pageIntroCtaUrl) || FALLBACK.intro.button.href },
      },
      awards: {
        heading: clean(awardsBlock?.sectionHeading) || FALLBACK.awards.heading,
        description: clean(awardsBlock?.text) || FALLBACK.awards.description,
        items: items.length ? items : FALLBACK.awards.items,
      },
      cta: {
        image: toImageSource(cta?.ctaSectionBackgroundImage?.[0]) || FALLBACK_CTA.image,
        title: clean(cta?.ctaSectionHeading) || FALLBACK_CTA.title,
        description: clean(cta?.ctaSectionDescription) || FALLBACK_CTA.description,
        buttonText: clean(cta?.ctaSectionButtonLabel) || FALLBACK_CTA.buttonText,
        buttonHref: clean(cta?.ctaSectionButtonUrl) || FALLBACK_CTA.buttonHref,
        secondaryButtonText: clean(cta?.ctaSectionSecondaryButtonLabel) || FALLBACK_CTA.secondaryButtonText,
        secondaryButtonHref: clean(cta?.ctaSectionSecondaryButtonUrl) || FALLBACK_CTA.secondaryButtonHref,
      },
    };
  } catch {
    return FALLBACK;
  }
}
