import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  return handleRevalidation(request);
}

export async function GET(request: NextRequest) {
  return handleRevalidation(request);
}

async function handleRevalidation(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const secret = searchParams.get("secret");
  const path = searchParams.get("path");
  const tag = searchParams.get("tag");

  const expectedSecret = process.env.REVALIDATION_SECRET || "nbrs-revalidate-secret-2026";

  if (secret !== expectedSecret) {
    return NextResponse.json(
      { message: "Invalid revalidation secret token" },
      { status: 401 }
    );
  }

  try {
    if (tag) {
      revalidateTag(tag, "default");
      return NextResponse.json({
        revalidated: true,
        tag,
        now: Date.now(),
      });
    }

    if (path) {
      revalidatePath(path);
      return NextResponse.json({
        revalidated: true,
        path,
        now: Date.now(),
      });
    }

    // Default: purge all Craft CMS data cache and layout
    revalidateTag("craft", "default");
    revalidatePath("/", "layout");

    return NextResponse.json({
      revalidated: true,
      message: "Purged all Craft CMS cache and layout successfully",
      now: Date.now(),
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error revalidating", error: String(error) },
      { status: 500 }
    );
  }
}
