import { NextResponse } from "next/server";
import {
  getProjectsCards,
  parseProjectFilterSlugs,
  PROJECTS_PAGE_SIZE,
} from "@/lib/projects-listing";

function toOffset(value: string | null): number {
  const offset = Number(value);
  return Number.isSafeInteger(offset) && offset >= 0 ? offset : 0;
}

async function getProjectsBatch(
  offset: number,
  sectorSlugs: string[],
  practiceSlugs: string[]
) {
  try {
    return await getProjectsCards({
      limit: PROJECTS_PAGE_SIZE,
      offset,
      sectorSlugs,
      practiceSlugs,
    });
  } catch {
    try {
      return await getProjectsCards({
        limit: PROJECTS_PAGE_SIZE,
        offset,
        sectorSlugs,
        practiceSlugs,
      });
    } catch {
      return null;
    }
  }
}

export async function GET(request: Request) {
  const searchParams = new URL(request.url).searchParams;
  const offset = toOffset(searchParams.get("offset"));
  const sectorSlugs = parseProjectFilterSlugs(searchParams.get("sector"));
  const practiceSlugs = parseProjectFilterSlugs(searchParams.get("practice"));
  const listing = await getProjectsBatch(offset, sectorSlugs, practiceSlugs);

  if (!listing) {
    return NextResponse.json(
      { projects: [], total: offset, nextOffset: null },
      { headers: { "Cache-Control": "no-store" } }
    );
  }

  const nextOffset = offset + listing.projects.length;

  return NextResponse.json(
    {
      projects: listing.projects,
      total: listing.total,
      nextOffset: nextOffset < listing.total ? nextOffset : null,
    },
    {
      headers: {
        "Cache-Control": "public, max-age=0, s-maxage=60, stale-while-revalidate=300",
      },
    }
  );
}
