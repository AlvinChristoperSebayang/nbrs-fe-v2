import { craftFetch } from "./craft";

/**
 * Data for app/sitemap.ts.
 *
 * One light GraphQL request: slugs + dateUpdated only, no images/transforms,
 * no `limit`. It mirrors what the site actually shows:
 * - projects, news: every live entry in the section (same as the listings)
 * - research: primary + secondary research related on the Latest Research page
 * - people: people related on the Our People page that have a profile photo
 *   (the Team page hides people without a photo, see lib/our-people.ts)
 *
 * Any failure throws. The sitemap must never be published with a section
 * silently missing: on Vercel, a failed ISR regeneration keeps serving the
 * last good sitemap (F-08).
 */

export type SitemapEntry = { slug: string; dateUpdated: string | null };

export type SitemapData = {
  projects: SitemapEntry[];
  news: SitemapEntry[];
  research: SitemapEntry[];
  people: SitemapEntry[];
};

type RawEntry = { slug?: string | null; dateUpdated?: string | null };
type RawPerson = RawEntry & { pplProfileImage?: Array<{ url?: string | null }> | null };

type SitemapResponse = {
  projects?: RawEntry[];
  news?: RawEntry[];
  researchPage?: Array<{ primaryResearch?: RawEntry[]; secondaryResearch?: RawEntry[] }>;
  peoplePage?: Array<{ people?: RawPerson[] }>;
};

const SITEMAP_QUERY = /* GraphQL */ `
  query SitemapEntries {
    projects: entries(section: "projects", orderBy: "postDate DESC") {
      slug
      dateUpdated
    }
    news: entries(section: "news", orderBy: "postDate DESC, id DESC") {
      slug
      dateUpdated
    }
    researchPage: entries(section: "latestResearch", limit: 1) {
      ... on latestResearch_Entry {
        primaryResearch {
          ... on research_Entry { slug dateUpdated }
        }
        secondaryResearch {
          ... on research_Entry { slug dateUpdated }
        }
      }
    }
    peoplePage: entries(section: "ourPeople", limit: 1) {
      ... on ourPeople_Entry {
        people {
          ... on people_Entry {
            slug
            dateUpdated
            pplProfileImage { url }
          }
        }
      }
    }
  }
`;

const ATTEMPTS = 3;
const ATTEMPT_TIMEOUT_MS = 10_000;

function withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(
      () => reject(new Error(`Sitemap CMS request timed out after ${timeoutMs} ms`)),
      timeoutMs,
    );
    promise.then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      (error: unknown) => {
        clearTimeout(timer);
        reject(error);
      },
    );
  });
}

function toEntries(raw: RawEntry[] | undefined): SitemapEntry[] {
  const seen = new Set<string>();
  const entries: SitemapEntry[] = [];
  for (const entry of raw ?? []) {
    const slug = entry?.slug?.trim();
    if (!slug || seen.has(slug)) continue;
    seen.add(slug);
    entries.push({ slug, dateUpdated: entry.dateUpdated ?? null });
  }
  return entries;
}

/** Throws unless the response has every section the sitemap needs. */
function parse(data: SitemapResponse): SitemapData {
  const researchPage = data.researchPage?.[0];
  const peoplePage = data.peoplePage?.[0];
  if (!Array.isArray(data.projects) || !Array.isArray(data.news) || !researchPage || !peoplePage) {
    // Craft answers {"data": []} instead of an error when devMode is off, so
    // a missing key means the query failed, not that the CMS is empty.
    throw new Error("Sitemap CMS response is missing sections");
  }

  const result: SitemapData = {
    projects: toEntries(data.projects),
    news: toEntries(data.news),
    research: toEntries([...(researchPage.primaryResearch ?? []), ...(researchPage.secondaryResearch ?? [])]),
    people: toEntries((peoplePage.people ?? []).filter((person) => Boolean(person?.pplProfileImage?.[0]?.url))),
  };

  const empty = Object.entries(result)
    .filter(([, entries]) => entries.length === 0)
    .map(([name]) => name);
  if (empty.length) {
    // These sections are never empty on the live site; treat it as a failure
    // so the previous sitemap is kept instead of publishing a broken one.
    throw new Error(`Sitemap CMS response has empty sections: ${empty.join(", ")}`);
  }

  return result;
}

export async function getSitemapData(revalidate: number): Promise<SitemapData> {
  let lastError: unknown;
  for (let attempt = 1; attempt <= ATTEMPTS; attempt++) {
    // craftFetch memoizes per request body (React cache), so a retry with the
    // identical body would get the same rejected promise back. A GraphQL
    // comment makes each retry a distinct request.
    const query = attempt === 1 ? SITEMAP_QUERY : `${SITEMAP_QUERY}\n# retry ${attempt}`;
    try {
      const data = await withTimeout(
        craftFetch<SitemapResponse>(query, undefined, { revalidate, tags: ["craft", "sitemap"] }),
        ATTEMPT_TIMEOUT_MS,
      );
      return parse(data);
    } catch (error) {
      lastError = error;
      console.error(`[sitemap] CMS attempt ${attempt}/${ATTEMPTS} failed:`, error);
    }
  }
  throw new Error("Sitemap could not be generated from the CMS", { cause: lastError });
}
