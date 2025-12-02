import { cookies, draftMode } from "next/headers";
import { redirect } from "next/navigation";

// eslint-disable-next-line @typescript-eslint/require-await
export async function GET(request: Request) {
  // Parse query string parameters
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");
  const bypass = searchParams.get("x-vercel-protection-bypass");

  if (!slug) {
    return new Response("Missing parameters", { status: 400 });
  }

  // Enable Draft Mode by setting the cookie
  const draft = await draftMode();
  draft.enable();

  // Override cookie header for draft mode for usage in live-preview
  // https://github.com/vercel/next.js/issues/49927
  const cookieStore = await cookies();
  const cookie = cookieStore.get("__prerender_bypass");
  cookieStore.set({
    name: "__prerender_bypass",
    value: cookie?.value ?? "",
    httpOnly: true,
    path: "/",
    secure: true,
    sameSite: "none",
  });

  // Redirect to the path from the fetched post
  // Contentful preview URL would then be:
  // http://localhost:3000/api/enable-draft/?slug={locale}{entry.fields.slug}
  redirect(
    `${slug}?x-vercel-protection-bypass=${bypass}&x-vercel-set-bypass-cookie=samesitenone`
  );
}
