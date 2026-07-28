import { getPublicPageSlug, tutoringPages, type TutoringPage } from "@/lib/tutoring-pages";

export type RelatedTutoringLink = {
  href: string;
  label: string;
};

type GradeInfo = {
  slug: "elementary" | "middle" | "high";
  label: "초등" | "중등" | "고등";
};

type SubjectInfo = {
  slug: "korean" | "english" | "math" | "social" | "science" | "korean-history";
  examSlug: "korean" | "english" | "math" | "social-studies" | "science" | "korean-history";
  label: "국어" | "영어" | "수학" | "사회" | "과학" | "한국사";
};

type ParsedGradeSubject = {
  grade: GradeInfo;
  subject: SubjectInfo;
};

type ExamLevelInfo = {
  key: "middle" | "high";
  label: "중졸" | "고졸";
  offlinePrefix: string;
  onlinePrefix: string;
};

type ParsedExam = {
  level: ExamLevelInfo;
  subject: SubjectInfo | null;
  isOnline: boolean;
};

const gradeOrder: GradeInfo[] = [
  { slug: "elementary", label: "초등" },
  { slug: "middle", label: "중등" },
  { slug: "high", label: "고등" },
];

const subjectOrder: SubjectInfo[] = [
  { slug: "korean", examSlug: "korean", label: "국어" },
  { slug: "english", examSlug: "english", label: "영어" },
  { slug: "math", examSlug: "math", label: "수학" },
  { slug: "social", examSlug: "social-studies", label: "사회" },
  { slug: "science", examSlug: "science", label: "과학" },
  { slug: "korean-history", examSlug: "korean-history", label: "한국사" },
];

const examLevels: ExamLevelInfo[] = [
  {
    key: "middle",
    label: "중졸",
    offlinePrefix: "middle-school-qualification-exam-",
    onlinePrefix: "online-middle-school-qualification-exam-",
  },
  {
    key: "high",
    label: "고졸",
    offlinePrefix: "high-school-qualification-exam-",
    onlinePrefix: "online-high-school-qualification-exam-",
  },
];

const pageSlugSet = new Set(tutoringPages.map((page) => page.slug));

function publicHref(page: TutoringPage) {
  return `/${getPublicPageSlug(page)}`;
}

function getPageBySlug(slug: string) {
  return tutoringPages.find((page) => page.slug === slug);
}

function parseGradeSubject(serviceSlug: string): ParsedGradeSubject | null {
  const grade = gradeOrder.find((candidate) => serviceSlug.startsWith(`${candidate.slug}-`));

  if (!grade) {
    return null;
  }

  const subjectSlug = serviceSlug.slice(`${grade.slug}-`.length);
  const subject = subjectOrder.find((candidate) => candidate.slug === subjectSlug);

  return subject ? { grade, subject } : null;
}

function parseRegionalPageSlug(slug: string) {
  const [regionSlug, serviceSlug, extra] = slug.split("/");

  if (!regionSlug || !serviceSlug || extra || regionSlug === "online") {
    return null;
  }

  const parsedService = parseGradeSubject(serviceSlug);

  return parsedService ? { regionSlug, ...parsedService } : null;
}

function parseOnlinePageSlug(slug: string) {
  if (!slug.startsWith("online/")) {
    return null;
  }

  return parseGradeSubject(slug.replace("online/", ""));
}

function parseExamPageSlug(slug: string): ParsedExam | null {
  for (const level of examLevels) {
    const isOnline = slug.startsWith(level.onlinePrefix);
    const prefix = isOnline ? level.onlinePrefix : level.offlinePrefix;

    if (!slug.startsWith(prefix)) {
      continue;
    }

    const rest = slug.slice(prefix.length);
    const subjectSlug = rest === "tutoring" ? "" : rest.replace(/-tutoring$/u, "");
    const subject =
      subjectSlug === ""
        ? null
        : subjectOrder.find((candidate) => candidate.examSlug === subjectSlug) || null;

    if (subjectSlug && !subject) {
      return null;
    }

    return { level, subject, isOnline };
  }

  return null;
}

function findExistingPage(slug: string) {
  if (!pageSlugSet.has(slug)) {
    return null;
  }

  return getPageBySlug(slug) || null;
}

function appendPageLink(
  links: RelatedTutoringLink[],
  currentPage: TutoringPage,
  slug: string,
  label: string,
) {
  const page = findExistingPage(slug);

  if (!page || page.slug === currentPage.slug) {
    return;
  }

  links.push({ href: publicHref(page), label });
}

function appendStaticLink(links: RelatedTutoringLink[], href: string, label: string) {
  links.push({ href, label });
}

function uniqueLinks(links: RelatedTutoringLink[], limit: number) {
  const current = new Map<string, RelatedTutoringLink>();

  for (const link of links) {
    if (!current.has(link.href)) {
      current.set(link.href, link);
    }
  }

  return Array.from(current.values()).slice(0, limit);
}

function getRegionalRelatedLinks(page: TutoringPage, limit: number) {
  const parsed = parseRegionalPageSlug(page.slug);

  if (!parsed) {
    return [];
  }

  const links: RelatedTutoringLink[] = [];

  for (const subject of subjectOrder.filter((subject) => subject.slug !== parsed.subject.slug)) {
    appendPageLink(
      links,
      page,
      `${parsed.regionSlug}/${parsed.grade.slug}-${subject.slug}`,
      `${page.지역} ${parsed.grade.label} ${subject.label} 과외 보기`,
    );

    if (links.length >= 3) {
      break;
    }
  }

  for (const grade of gradeOrder.filter((grade) => grade.slug !== parsed.grade.slug)) {
    appendPageLink(
      links,
      page,
      `${parsed.regionSlug}/${grade.slug}-${parsed.subject.slug}`,
      `${page.지역} ${grade.label} ${parsed.subject.label} 과외 보기`,
    );
  }

  appendPageLink(
    links,
    page,
    `online/${parsed.grade.slug}-${parsed.subject.slug}`,
    `온라인 ${parsed.grade.label} ${parsed.subject.label} 과외 안내`,
  );
  appendStaticLink(links, "/#regions", `${page.지역} 과외 지역 목록 보기`);
  appendStaticLink(links, "/", "전국 과외 메인으로 이동");

  return uniqueLinks(links, limit);
}

function getOnlineRelatedLinks(page: TutoringPage, limit: number) {
  const parsed = parseOnlinePageSlug(page.slug);

  if (!parsed) {
    return [];
  }

  const links: RelatedTutoringLink[] = [];

  for (const subject of subjectOrder.filter((subject) => subject.slug !== parsed.subject.slug)) {
    appendPageLink(
      links,
      page,
      `online/${parsed.grade.slug}-${subject.slug}`,
      `온라인 ${parsed.grade.label} ${subject.label} 과외 안내`,
    );

    if (links.length >= 3) {
      break;
    }
  }

  for (const grade of gradeOrder.filter((grade) => grade.slug !== parsed.grade.slug)) {
    appendPageLink(
      links,
      page,
      `online/${grade.slug}-${parsed.subject.slug}`,
      `온라인 ${grade.label} ${parsed.subject.label} 과외 안내`,
    );
  }

  appendStaticLink(links, "/#regions", `방문 ${parsed.subject.label} 과외 지역별 안내`);
  appendStaticLink(links, "/", "전국 과외 메인으로 이동");

  return uniqueLinks(links, limit);
}

function getExamRelatedLinks(page: TutoringPage, limit: number) {
  const parsed = parseExamPageSlug(page.slug);

  if (!parsed) {
    return [];
  }

  const links: RelatedTutoringLink[] = [];
  const prefix = parsed.isOnline ? parsed.level.onlinePrefix : parsed.level.offlinePrefix;
  const currentSubject = parsed.subject;

  for (const subject of subjectOrder.filter((subject) => subject.slug !== currentSubject?.slug)) {
    appendPageLink(
      links,
      page,
      `${prefix}${subject.examSlug}-tutoring`,
      `${parsed.isOnline ? "온라인 " : ""}${parsed.level.label} 검정고시 ${subject.label} 과외 살펴보기`,
    );

    if (links.length >= (currentSubject ? 3 : 4)) {
      break;
    }
  }

  if (currentSubject) {
    const otherLevel = examLevels.find((level) => level.key !== parsed.level.key);

    if (otherLevel) {
      appendPageLink(
        links,
        page,
        `${parsed.isOnline ? otherLevel.onlinePrefix : otherLevel.offlinePrefix}${currentSubject.examSlug}-tutoring`,
        `${parsed.isOnline ? "온라인 " : ""}${otherLevel.label} 검정고시 ${currentSubject.label} 과외 살펴보기`,
      );
    }

    appendPageLink(
      links,
      page,
      `${parsed.isOnline ? parsed.level.offlinePrefix : parsed.level.onlinePrefix}${currentSubject.examSlug}-tutoring`,
      `${parsed.isOnline ? "" : "온라인 "}${parsed.level.label} 검정고시 ${currentSubject.label} 과외 안내`,
    );
  } else {
    appendPageLink(
      links,
      page,
      `${parsed.isOnline ? parsed.level.offlinePrefix : parsed.level.onlinePrefix}tutoring`,
      `${parsed.isOnline ? "" : "온라인 "}${parsed.level.label} 검정고시 과외 안내`,
    );
  }

  appendStaticLink(links, "/", "전국 과외 메인으로 이동");

  return uniqueLinks(links, limit);
}

export function getRelatedTutoringLinks(page: TutoringPage, limit = 8) {
  if (page.page_type === "exam-tutoring" || page.page_type === "online-exam-tutoring") {
    return getExamRelatedLinks(page, limit);
  }

  if (page.slug.startsWith("online/")) {
    return getOnlineRelatedLinks(page, limit);
  }

  return getRegionalRelatedLinks(page, limit);
}
