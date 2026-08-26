import { NextRequest, NextResponse } from "next/server";
import type { OpenGraphData } from "@/lib/types";

function decodeHtmlEntities(value: string) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'");
}

function getMetaContent(html: string, key: string) {
  const patterns = [
    new RegExp(
      `<meta[^>]+(?:property|name)=["']${key}["'][^>]+content=["']([^"']*)["']`,
      "i"
    ),
    new RegExp(
      `<meta[^>]+content=["']([^"']*)["'][^>]+(?:property|name)=["']${key}["']`,
      "i"
    ),
  ];

  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match?.[1]) return decodeHtmlEntities(match[1]).trim();
  }

  return "";
}

function resolveUrl(maybeRelative: string, base: URL) {
  try {
    return new URL(maybeRelative, base).toString();
  } catch {
    return "";
  }
}

function extractOpenGraph(html: string, pageUrl: URL): OpenGraphData {
  const titleTagMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);

  const title =
    getMetaContent(html, "og:title") ||
    (titleTagMatch?.[1] ? decodeHtmlEntities(titleTagMatch[1]).trim() : "") ||
    pageUrl.hostname;

  const description =
    getMetaContent(html, "og:description") || getMetaContent(html, "description");

  const rawImage = getMetaContent(html, "og:image");
  const image = rawImage ? resolveUrl(rawImage, pageUrl) : "";

  return { title, description, image, url: pageUrl.toString() };
}

export async function GET(request: NextRequest) {
  const targetUrl = request.nextUrl.searchParams.get("url");

  if (!targetUrl) {
    return NextResponse.json(
      { error: "url query parameter is required" },
      { status: 400 }
    );
  }

  let pageUrl: URL;
  try {
    pageUrl = new URL(targetUrl);
  } catch {
    return NextResponse.json({ error: "invalid url" }, { status: 400 });
  }

  if (pageUrl.protocol !== "http:" && pageUrl.protocol !== "https:") {
    return NextResponse.json({ error: "invalid url" }, { status: 400 });
  }

  try {
    const response = await fetch(pageUrl.toString(), {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; BookmarkLinkBot/1.0)",
        Accept: "text/html",
      },
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch page: ${response.status}`);
    }

    const html = await response.text();
    const og = extractOpenGraph(html, pageUrl);

    return NextResponse.json(og);
  } catch {
    const fallback: OpenGraphData = {
      title: pageUrl.hostname,
      description: "",
      image: "",
      url: pageUrl.toString(),
    };

    return NextResponse.json(fallback);
  }
}
