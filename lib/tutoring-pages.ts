import rawPages from "@/data/pages.json";

export type TutoringPage = {
  slug: string;
  page_type: string;
  지역: string;
  업종: string;
  메인키워드: string;
  콘텐츠관점: string;
  톤: string;
  매너: string;
  학습상황: string;
  추천대상: string;
  수업방식: string;
  차별문장: string;
  이미지키워드: string;
  이미지파일명: string;
  status: string;
  created_at: string;
};

export type RouteParts = {
  region: string;
  service: string;
};

export const tutoringPages: TutoringPage[] = rawPages;

function splitSlug(slug: string): RouteParts | null {
  const [region, service, extra] = slug.split("/");

  if (!region || !service || extra) {
    return null;
  }

  return { region, service };
}

const pageBySlug = new Map(tutoringPages.map((page) => [page.slug, page]));

export const staticPageParams = tutoringPages.flatMap((page) => {
  const parts = splitSlug(page.slug);
  return parts ? [parts] : [];
});

const examPageTypes = new Set(["exam-tutoring", "online-exam-tutoring"]);

export const examStaticPageParams = tutoringPages
  .filter(
    (page) =>
      examPageTypes.has(page.page_type) &&
      Boolean(page.slug) &&
      !page.slug.includes("/"),
  )
  .map((page) => ({ slug: page.slug }));

export const regions = Array.from(
  new Map(
    tutoringPages.flatMap((page) => {
      const parts = splitSlug(page.slug);
      return parts ? [[parts.region, page.지역] as const] : [];
    }),
  ),
  ([slug, name]) => ({ slug, name }),
);

export const services = Array.from(
  new Map(
    tutoringPages.flatMap((page) => {
      const parts = splitSlug(page.slug);
      return parts ? [[parts.service, page.업종] as const] : [];
    }),
  ),
  ([slug, name]) => ({ slug, name }),
);

export function getTutoringPage(region: string, service?: string) {
  const slug = service ? `${region}/${service}` : region;
  return pageBySlug.get(slug);
}

export function getRelatedPages(page: TutoringPage, limit = 4) {
  const parts = splitSlug(page.slug);

  if (!parts) {
    if (!examPageTypes.has(page.page_type)) {
      return [];
    }

    return tutoringPages
      .filter(
        (candidate) =>
          candidate.page_type === page.page_type &&
          !candidate.slug.includes("/") &&
          candidate.slug !== page.slug,
      )
      .slice(0, limit);
  }

  return tutoringPages
    .filter(
      (candidate) =>
        candidate.slug.startsWith(`${parts.region}/`) &&
        candidate.slug !== page.slug,
    )
    .slice(0, limit);
}
