import { craftFetch } from "@/lib/craft";
import { toImageSource } from "@/lib/media";
import type { ImageSource } from "@/lib/types";

type CraftAsset = {
  url?: string;
  width?: number;
  height?: number;
  title?: string;
};

type CraftBlock = {
  text?: string | null;
  image?: CraftAsset[] | null;
};

type RapQueryData = {
  entries?: Array<{
    title?: string | null;
    slug?: string | null;
    postDate?: string | null;
    artHdrHeading?: string | null;
    artHdrHeroImage?: CraftAsset[] | null;
    artIssuuUrl?: string | null;
    rapAuthor?: string | null;
    rapEndorsedBy?: string | null;
    rapReadTime?: string | null;
    rapDownloadBackground?: CraftAsset[] | null;
    artContent?: CraftBlock[] | null;
  }>;
};

export type RapPageData = {
  title: string;
  publicationDate: string;
  author: string;
  endorsedBy: string;
  readTime: string;
  hero: ImageSource;
  artwork: ImageSource;
  downloadBackground: ImageSource;
  bodyHtml: string;
  issuuUrl: string;
};

const RAP_SLUG = "reflect-reconciliation-action-plan";
const FALLBACK_BODY = [
  "Place and Country are key design principles at NBRS. We support the cultural heritage of the land on which we design. We support Aboriginal and Torres Strait Islander peoples with initiatives that pay respect to Aboriginal culture. The newest initiative which has been endorsed by Reconciliation Australia is our own Reflect Reconciliation Action Plan (RAP).",
  "This plan is being spearheaded by the NBRS RAP working group; Convener Melanie Karaca, Andrew Duffin, Samantha Polkinghorne, Mengling Fu along with Olivia Ash and Saanya Parmar who will work through our RAP commitments.",
  "A special mention must go to Christopher Tobin who created our RAP’s artwork. The title of the artwork is Shared Waterways and connects deeply with our values and how we design collectively on Country.",
  "Chris is a Dharug man from Western Sydney who is a descendant of the original clans that belong to this Country and have lived in balance with the environment for millennia.",
  "The RAP artwork Shared Waterways envisages modern practices of settlement formed around Aboriginal values and understanding of Country. The artwork represents the aspirations of many Aboriginal and non-Aboriginal people who work for the health and wellbeing of Country. It also represents the hope for future developments to begin to listen to Country first and work around or within these principles to keep her healthy.",
  "The RAP is NBRS’s commitment to a reconciliation journey. NBRS recognises the important role our industry plays in shaping the built environment and influencing social and cultural outcomes. We aim to embed reconciliation and wellbeing of place and Country into our design processes.",
];

const FALLBACK_DATA: RapPageData = {
  title: "Reflect Reconciliation Action Plan",
  publicationDate: "2026",
  author: "RAP Working Group (Andrew Duffin, Samantha Polkinghorne, Melanie Karaca, Mengling Fu)",
  endorsedBy: "Reconciliation Australia",
  readTime: "5 mins",
  hero: "/images/rap/reflect-hero.jpg",
  artwork: "/images/rap/reflect-artwork.png",
  downloadBackground: "/images/rap/reflect-download-background.jpg",
  bodyHtml: FALLBACK_BODY.map((paragraph) => `<p>${paragraph}</p>`).join("\n"),
  issuuUrl: "https://issuu.com/nbrsarchitecture/docs/nbrs_reflect_rap",
};

const RAP_QUERY = /* GraphQL */ `
  query RapPage($slug: [String]!) {
    entries(section: "news", slug: $slug, limit: 1) {
      title
      slug
      postDate @formatDateTime(format: "Y")
      ... on news_Entry {
        artHdrHeading
        artHdrHeroImage { url width height title }
        artIssuuUrl
        rapAuthor
        rapEndorsedBy
        rapReadTime
        rapDownloadBackground { url width height title }
        artContent {
          ... on text_Entry { text }
          ... on image_Entry { image { url width height title } }
        }
      }
    }
  }
`;

function firstAsset(assets?: CraftAsset[] | null): CraftAsset | null {
  return assets?.[0] ?? null;
}

function normalizeBody(blocks?: CraftBlock[] | null): string | null {
  const text = blocks?.find((block) => typeof block.text === "string" && block.text.trim())?.text;
  return text?.trim() || null;
}

export async function getRapPage(): Promise<RapPageData> {
  try {
    const data = await craftFetch<RapQueryData>(RAP_QUERY, { slug: [RAP_SLUG] });
    const entry = data.entries?.[0];
    if (!entry) return FALLBACK_DATA;

    return {
      title: entry.artHdrHeading || entry.title || FALLBACK_DATA.title,
      publicationDate: entry.postDate || FALLBACK_DATA.publicationDate,
      author: entry.rapAuthor || FALLBACK_DATA.author,
      endorsedBy: entry.rapEndorsedBy || FALLBACK_DATA.endorsedBy,
      readTime: entry.rapReadTime || FALLBACK_DATA.readTime,
      hero: toImageSource(firstAsset(entry.artHdrHeroImage)) || FALLBACK_DATA.hero,
      artwork: toImageSource(firstAsset(entry.artContent?.find((block) => block.image?.length)?.image)) || FALLBACK_DATA.artwork,
      downloadBackground: toImageSource(firstAsset(entry.rapDownloadBackground)) || FALLBACK_DATA.downloadBackground,
      bodyHtml: normalizeBody(entry.artContent) || FALLBACK_DATA.bodyHtml,
      issuuUrl: entry.artIssuuUrl || FALLBACK_DATA.issuuUrl,
    };
  } catch {
    return FALLBACK_DATA;
  }
}
