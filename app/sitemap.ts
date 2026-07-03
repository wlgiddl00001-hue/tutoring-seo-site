import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { tutoringPages } from "@/lib/tutoring-pages";

function parseLastModified(value: string): Date | undefined {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const pageEntries: MetadataRoute.Sitemap = tutoringPages
    .filter((page) => page.status === "발행" && page.slug.trim())
    .map((page) => ({
      url: `${SITE_URL}/${page.slug.replace(/^\/+|\/+$/g, "")}`,
      lastModified: parseLastModified(page.created_at),
      changeFrequency: "monthly",
      priority: page.page_type.includes("exam") ? 0.8 : 0.7,
    }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...pageEntries,
  ];
}
