import { NextResponse } from "next/server";
import { getNewsListing, NEWS_PAGE_SIZE } from "@/lib/news-listing";

function toOffset(value: string | null): number {
  const offset = Number(value);
  return Number.isSafeInteger(offset) && offset >= 0 ? offset : 0;
}

async function getNewsBatch(offset: number) {
  try {
    return await getNewsListing({ limit: NEWS_PAGE_SIZE, offset });
  } catch {
    try {
      return await getNewsListing({ limit: NEWS_PAGE_SIZE, offset });
    } catch {
      return null;
    }
  }
}

export async function GET(request: Request) {
  const offset = toOffset(new URL(request.url).searchParams.get("offset"));
  const listing = await getNewsBatch(offset);

  if (!listing) {
    return NextResponse.json(
      { articles: [], total: offset, nextOffset: null },
      { headers: { "Cache-Control": "no-store" } }
    );
  }

  const nextOffset = offset + listing.articles.length;

  return NextResponse.json(
    {
      articles: listing.articles,
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
