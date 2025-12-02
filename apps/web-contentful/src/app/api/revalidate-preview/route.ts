import { revalidatePath } from "next/cache";
import type { NextRequest } from "next/server";

function getQSParamFromURL(key: string, url: string): string | null {
  if (!url) {
    return "";
  }
  const { search } = new URL(url);
  const urlParams = new URLSearchParams(search);
  return urlParams.get(key);
}

export function GET(request: NextRequest) {
  // Parse query string parameters
  const path = getQSParamFromURL("pathname", request.url);

  if (path) {
    revalidatePath(path);
  }

  return new Response("OK");
}
