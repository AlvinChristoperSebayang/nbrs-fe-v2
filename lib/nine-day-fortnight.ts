import { craftFetch } from "./craft";

type RawTextBlock = {
  __typename: "blocks_text_BlockType";
  text: string | null;
};

type RawSeoImage = {
  url: string | null;
  width: number | null;
  height: number | null;
  title: string | null;
};

type NineDayFortnightEntry = {
  pageHeading: string | null;
  pageSubheading: string | null;
  seoPageTitle: string | null;
  seoMetaDescription: string | null;
  seoImage: RawSeoImage[];
  blocks: RawTextBlock[];
};

type NineDayFortnightResponse = {
  entries: NineDayFortnightEntry[];
};

export type NineDayFortnightPageContent = {
  title: string;
  description: string;
  contentHtml: string;
  cmsSeoTitle: string | null;
  seoDescription: string;
  seoImage: RawSeoImage | null;
};

const FALLBACK: NineDayFortnightPageContent = {
  title: "9-Day Fortnight",
  description: "Creating life-changing environments starts with balance.",
  contentHtml: `
    <p>NBRS is committed to creating a healthy work-life balance. As part of this commitment, we offer a 9-day fortnight working pattern. This means that we work 9 days per fortnight, with a day off every other Friday.</p>
    <p>Our operating hours are 8:15 am to 5:30 pm, Monday to Friday, and we are closed on Fridays on alternating weeks.</p>
    <p>At NBRS, we believe that a 9-day fortnight and flexible working arrangements help to improve employee morale, productivity, and overall well-being.</p>
  `,
  cmsSeoTitle: null,
  seoDescription:
    "Learn about the NBRS 9-day fortnight and our commitment to a healthy work-life balance.",
  seoImage: null,
};

const QUERY = /* GraphQL */ `
  query NineDayFortnightPage {
    entries(section: ["pages"], slug: ["9-day-fortnight"], limit: 1) {
      ... on pages_Entry {
        pageHeading
        pageSubheading
        seoPageTitle
        seoMetaDescription
        seoImage {
          url
          width
          height
          title
        }
        blocks {
          __typename
          ... on blocks_text_BlockType {
            text
          }
        }
      }
    }
  }
`;

function clean(value: string | null | undefined): string {
  return value?.trim() ?? "";
}

function toSeoImage(asset: RawSeoImage | undefined): RawSeoImage | null {
  return asset?.url?.trim() ? asset : null;
}

export async function getNineDayFortnightPageContent(): Promise<NineDayFortnightPageContent> {
  try {
    const response = await craftFetch<NineDayFortnightResponse>(QUERY, undefined, {
      revalidate: 60,
    });
    const entry = response.entries[0];
    if (!entry) return FALLBACK;

    const textBlock = entry.blocks.find(
      (block): block is RawTextBlock => block.__typename === "blocks_text_BlockType"
    );

    return {
      title: clean(entry.pageHeading) || FALLBACK.title,
      description: clean(entry.pageSubheading) || FALLBACK.description,
      contentHtml: clean(textBlock?.text) || FALLBACK.contentHtml,
      cmsSeoTitle: clean(entry.seoPageTitle) || null,
      seoDescription: clean(entry.seoMetaDescription) || FALLBACK.seoDescription,
      seoImage: toSeoImage(entry.seoImage?.[0]),
    };
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error(
        "[getNineDayFortnightPageContent] Craft query failed; using fallback data:",
        error
      );
    }
    return FALLBACK;
  }
}
