import { SITE_URL } from "@/lib/site";
import {
  getPublicPageSlug,
  tutoringPages,
  type TutoringPage,
} from "@/lib/tutoring-pages";

export const dynamic = "force-static";

type SitemapPriority = "1.0" | "0.8" | "0.7";

type SitemapEntry = {
  loc: string;
  lastModified?: string;
  changeFrequency: "weekly" | "monthly";
  priority: SitemapPriority;
};

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function formatLastModified(value: string): string | undefined {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString();
}

function getPriority(page: TutoringPage): SitemapPriority {
  const isOnlineTutoring = getPublicPageSlug(page).startsWith("online-");
  const isExamTutoring = page.page_type.includes("exam");
  return isOnlineTutoring || isExamTutoring ? "0.8" : "0.7";
}

function renderUrl(entry: SitemapEntry) {
  const lastModified = entry.lastModified
    ? `\n    <lastmod>${escapeXml(entry.lastModified)}</lastmod>`
    : "";

  return `  <url>
    <loc>${escapeXml(entry.loc)}</loc>${lastModified}
    <changefreq>${entry.changeFrequency}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`;
}

export function GET() {
  const pageEntries = tutoringPages
    .filter((page) => page.status === "발행" && page.slug.trim())
    .map<SitemapEntry>((page) => ({
      loc: `${SITE_URL}/${getPublicPageSlug(page).replace(/^\/+|\/+$/g, "")}`,
      lastModified: formatLastModified(page.created_at),
      changeFrequency: "monthly",
      priority: getPriority(page),
    }));

  const uniquePageEntries = Array.from(
    new Map(pageEntries.map((entry) => [entry.loc, entry])).values(),
  );
  const entries: SitemapEntry[] = [
    {
      loc: SITE_URL,
      changeFrequency: "weekly",
      priority: "1.0",
    },
    ...uniquePageEntries,
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.map(renderUrl).join("\n")}
</urlset>`;

  if (xml.includes("<priority></priority>")) {
    throw new Error("Sitemap contains an empty priority value.");
  }

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=86400",
    },
  });
}
