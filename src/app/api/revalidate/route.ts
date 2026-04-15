import { revalidateTag as _revalidateTag } from "next/cache";

// Next.js 16: revalidateTag requires a profile as second arg; use "default"
function revalidateTag(tag: string) {
  return _revalidateTag(tag, "default");
}
import { NextRequest, NextResponse } from "next/server";

// Map Sanity document types to cache tags
const DOC_TYPE_TO_TAGS: Record<string, string[]> = {
  event: ["events"],
  category: ["categories", "events"],
  venue: ["events"],
  article: ["articles"],
  author: ["articles"],
  pointOfSale: ["pos"],
  service: ["services"],
  siteSettings: ["settings"],
  posApplication: [],
};

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");

  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const docType = body._type as string;

    const tags = DOC_TYPE_TO_TAGS[docType] ?? [];
    for (const tag of tags) {
      revalidateTag(tag);
    }

    // Also revalidate specific slug if available
    if (body.slug?.current) {
      revalidateTag(`${docType}-${body.slug.current}`);
    }

    return NextResponse.json({
      revalidated: true,
      type: docType,
      tags,
      now: Date.now(),
    });
  } catch (err) {
    return NextResponse.json({ message: "Error revalidating", err }, { status: 500 });
  }
}
