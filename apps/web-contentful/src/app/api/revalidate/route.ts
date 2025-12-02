import { revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// e.g a webhook to `your-website.com/api/revalidate?tag=collection&secret=<token>`
export async function POST(request: NextRequest) {
  const secret = request.headers.get("secret");

  if (secret !== "this is a secret") {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  const entry = await request.json();
  const tag = (entry as { data?: { data?: { content_type?: string } } })?.data
    ?.data?.content_type;

  if (!tag || typeof tag !== "string") {
    return NextResponse.json({ message: "Missing tag param" }, { status: 400 });
  }

  revalidateTag(tag);

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
