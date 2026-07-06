import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/app/components/site-header";
import {
  getPublicPageSlug,
  getRelatedPages,
  getTutoringPage,
  staticPageParams,
  type TutoringPage,
} from "@/lib/tutoring-pages";

type PageProps = {
  params: Promise<{ region: string; service: string }>;
};

const titleSuffixByFocus: Record<string, string> = {
  성적향상: "현재 수준에서 한 단계 더 나아가는 학습 관리",
  기초개념보완: "부족한 개념부터 다시 연결하는 수업",
  공부습관형성: "공부 습관과 기초를 함께 잡는 수업",
  내신대비: "학교 진도에 맞춰 준비하는 내신 학습",
  약한단원보완: "약한 단원부터 차근차근 보완하는 수업",
  학습공백회복: "놓친 진도부터 다시 이어가는 학습",
  시험대비: "시험 범위와 남은 기간에 맞춘 집중 학습",
  자기주도학습: "스스로 계획하고 복습하는 힘을 기르는 수업",
  개념이해중심: "원리부터 이해해 문제에 적용하는 수업",
  문제풀이훈련: "유형별 풀이와 실수를 함께 점검하는 학습",
  상위권관리: "심화 문제와 실전 감각을 높이는 학습 관리",
  중하위권보완: "막히는 지점부터 부담 없이 채우는 수업",
  학교진도맞춤: "학교 수업 흐름에 맞춘 예습과 복습",
  수행평가대비: "평가 기준에 맞춰 미리 준비하는 수업",
  학부모상담중심: "학습 과정과 다음 목표를 함께 확인하는 관리",
  학생성향맞춤: "아이의 집중 방식과 이해 속도에 맞춘 수업",
  반복학습관리: "배운 내용을 오래 남기는 복습 중심 학습",
  오답관리중심: "같은 실수를 줄이는 오답 관리 수업",
};

const focusLabelByValue: Record<string, string> = {
  성적향상: "성적 향상",
  기초개념보완: "기초 개념 보완",
  공부습관형성: "공부 습관 형성",
  내신대비: "내신 대비",
  약한단원보완: "약한 단원 보완",
  학습공백회복: "학습 공백 회복",
  시험대비: "시험 대비",
  자기주도학습: "자기주도학습",
  개념이해중심: "개념 이해",
  문제풀이훈련: "문제풀이 훈련",
  상위권관리: "상위권 관리",
  중하위권보완: "중하위권 보완",
  학교진도맞춤: "학교 진도 맞춤",
  수행평가대비: "수행평가 대비",
  학부모상담중심: "학부모 상담 중심 관리",
  학생성향맞춤: "학생 성향 맞춤",
  반복학습관리: "반복 학습 관리",
  오답관리중심: "오답 관리",
};

const tutoringImages = [
  "002.png",
  "003.png",
  "004.png",
  "005.png",
  "006.png",
  "007.png",
  "008.png",
  "009.png",
];

const parentRegionNames = [
  "서울", "경기", "인천", "부산", "대구", "대전", "광주", "울산", "세종",
  "강원", "충북", "충남", "전북", "전남", "경북", "경남", "제주",
] as const;

export const dynamicParams = false;

export function generateStaticParams() {
  return staticPageParams;
}

function formatServiceName(serviceName: string) {
  return serviceName.replace(/\s*과외$/, " 과외");
}

function toSentence(text: string) {
  return /[.!?]$/.test(text) ? text : `${text}.`;
}

function formatLessonDifference(page: TutoringPage) {
  const text = page.차별문장.trim();
  const locationName = page.지역.trim();

  if (page.slug.startsWith("online/") || locationName === "온라인") {
    return toSentence(text);
  }

  const serviceName = page.업종.trim();
  const escapedServiceName = serviceName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const locationBeforeService = new RegExp(
    `[가-힣]*(?:\\s*지역)?에서\\s*(?=${escapedServiceName}를 찾는 경우)`,
    "g",
  );

  let formattedText = text.replace(locationBeforeService, `${locationName}에서 `);
  const parentRegion = parentRegionNames.find((name) => locationName.startsWith(name));

  if (parentRegion) {
    const duplicatedParent = new RegExp(
      `${parentRegion}\\s+${locationName}에서\\s*(?=${escapedServiceName}를 찾는 경우)`,
      "g",
    );
    formattedText = formattedText.replace(duplicatedParent, `${locationName}에서 `);
  }

  return toSentence(formattedText);
}

function hashText(text: string) {
  let hash = 0;

  for (let i = 0; i < text.length; i += 1) {
    hash = (hash * 31 + text.charCodeAt(i)) % 100000;
  }

  return Math.abs(hash);
}

function getTutoringImage(page: TutoringPage, offset = 0) {
  const configuredImage = page.이미지파일명?.trim();
  const usesConfiguredExamImage =
    page.page_type === "exam-tutoring" ||
    page.page_type === "online-exam-tutoring";

  if (
    offset === 0 &&
    usesConfiguredExamImage &&
    configuredImage &&
    /^[a-zA-Z0-9._-]+\.(?:png|jpe?g|webp|avif)$/i.test(configuredImage)
  ) {
    return `/images/tutoring/${configuredImage}`;
  }

  const seed = [
    page.slug,
    page["지역"],
    page["업종"],
    page["메인키워드"],
    page["콘텐츠관점"],
  ].join("-");

  const index = (hashText(seed) + offset) % tutoringImages.length;
  return `/images/tutoring/${tutoringImages[index]}`;
}

function getDetailTitle(page: TutoringPage) {
  const region = page["지역"]?.trim() || "지역";
  const service = formatServiceName(page["업종"]?.trim() || "맞춤 과외");
  const keyword = page["메인키워드"]?.trim() || `${region} ${service}`;
  const focus = page["콘텐츠관점"]?.trim();
  const suffix =
    titleSuffixByFocus[focus] ||
    "학생의 현재 수준부터 차근차근 시작하는 수업";

  return `${keyword}, ${suffix}`;
}

function getFocusLabel(page: TutoringPage) {
  const focus = page["콘텐츠관점"]?.trim();
  return focusLabelByValue[focus] || "학생 맞춤 학습";
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { region, service } = await params;
  const page = getTutoringPage(region, service);

  if (!page) {
    return { title: "과외 안내를 찾을 수 없습니다" };
  }

  const title = getDetailTitle(page);
  const description = `${page["지역"]}에서 ${formatServiceName(
    page["업종"],
  )}를 찾는 학부모님을 위해 ${getFocusLabel(
    page,
  )}, 현재 수준과 학교 진도에 맞춘 수업 방향을 정리했습니다.`;

  return {
    title,
    description,
    alternates: { canonical: `/${getPublicPageSlug(page)}` },
    openGraph: { title, description, type: "article" },
  };
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4 10h12M11 5l5 5-5 5" />
    </svg>
  );
}

export default async function TutoringDetailPage({ params }: PageProps) {
  const { region, service } = await params;
  const page = getTutoringPage(region, service);

  if (!page) {
    notFound();
  }

  const serviceName = formatServiceName(page.업종);
  const detailTitle = getDetailTitle(page);
  const focusLabel = getFocusLabel(page);
  const currentGrade = page.업종.split(" ")[0];
const relatedPages = getRelatedPages(page, 18).filter((related) =>
  related.업종.startsWith(currentGrade),
);
  const coverImage = getTutoringImage(page, 0);
  const middleImage = getTutoringImage(page, 3);
  const subImage = getTutoringImage(page, 5);

  const faqs = [
    {
      question: "수업을 시작하기 전에 학생 수준을 확인하나요?",
      answer:
        "네. 최근 학습 내용과 문제를 푸는 과정을 살펴보고, 이해한 부분과 보완할 부분을 나눈 뒤 수업의 시작점을 정합니다.",
    },
    {
      question: "학교 진도와 과외 진도는 어떻게 맞추나요?",
      answer:
        "학교에서 배우는 범위와 시험 일정을 먼저 확인합니다. 이후 학생의 이해 속도에 맞춰 예습과 복습의 비중을 조절합니다.",
    },
    {
      question: "상담 전에 준비해야 할 자료가 있나요?",
      answer:
        "최근 시험 결과나 사용 중인 교재가 있다면 도움이 됩니다. 자료가 없어도 현재 어려운 부분과 원하는 목표를 알려주시면 상담할 수 있습니다.",
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <>
      <SiteHeader />
      <main className="detail-background">
        <article className="shell detail-article-card">
          <header className="detail-article-header">
            <nav className="detail-breadcrumb" aria-label="현재 위치">
              <Link href="/">홈</Link>
              <span>/</span>
              <Link href="/#regions">{page.지역}</Link>
              <span>/</span>
              <strong>{serviceName}</strong>
            </nav>

            <p className="detail-category">
              {page.지역} 맞춤 과외 / {serviceName}
            </p>

            <h1>{detailTitle}</h1>

            <p className="detail-summary">
              {page.지역}에서 {serviceName}를 찾는 학부모님을 위해 학생의
              현재 수준, 약한 단원과 학교 진도를 살펴보고 {focusLabel}에 맞춘
              수업 방향을 정리했습니다.
            </p>

            <div className="detail-meta">
              <span>호빈샘 과외</span>
              <i />
              <span>{page.콘텐츠관점}</span>
              <i />
              <span>약 5분 읽기</span>
            </div>
          </header>

          <figure className="detail-photo-card detail-photo-card-main">
            <img
              src={coverImage}
              alt={`${page.지역} ${serviceName} 학습 안내 이미지`}
            />
            <figcaption>
              학생의 현재 상황을 먼저 확인하고, 필요한 공부 방법부터 차근차근
              정리합니다.
            </figcaption>
          </figure>

          <div className="detail-article-body">
            <p className="detail-opening">
              과외 수업은 무조건 진도를 빠르게 나가기보다 아이가{" "}
              <strong>어디까지 이해했고 어느 부분에서 막히는지</strong>{" "}
              확인하는 것에서 시작해야 합니다. 출발점이 분명하면 필요한 설명과
              문제 연습에 시간을 집중할 수 있습니다.
            </p>

            <section className="article-section" id="student">
              <span className="article-section-number">01</span>
              <h2>이런 학생에게 필요합니다</h2>
              <p>
                최근 점수만으로는 아이가 겪는 어려움을 모두 알기 어렵습니다.
                문제를 읽는 과정과 풀이 순서, 수업 후 복습 방법까지 함께
                살펴야 정확한 원인을 찾을 수 있습니다. 이 페이지에서 중심으로
                살펴볼 방향은 <strong>{focusLabel}</strong>입니다.
              </p>

              <div className="learning-status-card">
                <small>현재 학습상황</small>
                <strong>{page.학습상황}</strong>
              </div>

              <p>
                특히 <strong>{page.추천대상}</strong>이라면 부족한 부분을
                한꺼번에 공부하기보다 우선순위를 정해 하나씩 보완하는 과정이
                필요합니다. 이미 이해한 부분은 유지하고, 자주 막히는 지점에
                설명과 연습 시간을 더 배분합니다.
              </p>
            </section>

            <figure className="detail-photo-card detail-photo-card-wide">
              <img
                src={middleImage}
                alt={`${focusLabel}을 돕는 과외 학습 자료 이미지`}
              />
              <figcaption>
                단순 설명으로 끝나지 않도록 학습 기록, 복습, 문제 적용 과정을
                함께 확인합니다.
              </figcaption>
            </figure>

            <section className="article-section" id="lesson">
              <span className="article-section-number">02</span>
              <h2>수업은 이렇게 진행됩니다</h2>
              <p>
                수업은 <strong>{page.수업방식}</strong>을 중심으로 진행합니다.
                아이가 설명을 듣는 데서 끝나지 않고, 이해한 내용을 직접 말하고
                문제에 적용하는 과정까지 확인합니다.
              </p>

              <ol className="article-step-cards">
                <li>
                  <span>1</span>
                  <div>
                    <strong>현재 수준 확인</strong>
                    <p>
                      최근에 배운 내용과 풀이 과정을 살펴 수업의 출발점을
                      정합니다.
                    </p>
                  </div>
                </li>
                <li>
                  <span>2</span>
                  <div>
                    <strong>개념 설명과 적용</strong>
                    <p>
                      아이의 이해 속도에 맞춰 설명하고 비슷한 문제를 직접
                      풀어봅니다.
                    </p>
                  </div>
                </li>
                <li>
                  <span>3</span>
                  <div>
                    <strong>복습과 다음 목표</strong>
                    <p>
                      배운 내용을 다시 확인하고 다음 수업까지 필요한 학습량을
                      정합니다.
                    </p>
                  </div>
                </li>
              </ol>

              <div className="lesson-difference-card">
                <small>호빈샘 과외의 수업 방향</small>
                <p>{formatLessonDifference(page)}</p>
              </div>
            </section>

            <section className="article-section article-section-with-image" id="consult-check">
              <div>
                <span className="article-section-number">03</span>
                <h2>{page.지역} 과외 상담 전 확인할 점</h2>
                <p>
                  아래 네 가지를 알고 있는 범위에서 정리하면 아이에게 필요한
                  수업 방향을 더 구체적으로 상담할 수 있습니다.
                </p>
              </div>

              <figure className="detail-photo-card detail-photo-card-side">
                <img
                  src={subImage}
                  alt={`${page.지역} 과외 상담 전 확인할 학습 자료 이미지`}
                />
              </figure>

              <div className="consult-check-grid">
                <div>
                  <span>✓</span>
                  <strong>현재 수준</strong>
                  <p>최근 학습 내용과 성적</p>
                </div>
                <div>
                  <span>✓</span>
                  <strong>약한 단원</strong>
                  <p>자주 막히는 개념과 유형</p>
                </div>
                <div>
                  <span>✓</span>
                  <strong>학교 진도</strong>
                  <p>사용 교재와 시험 일정</p>
                </div>
                <div>
                  <span>✓</span>
                  <strong>희망 수업 요일</strong>
                  <p>가능한 요일과 시간대</p>
                </div>
              </div>
            </section>

            <section className="article-section" id="faq">
              <span className="article-section-number">04</span>
              <h2>학부모님이 자주 묻는 질문</h2>
              <div className="article-faq-cards">
                {faqs.map((faq) => (
                  <details key={faq.question}>
                    <summary>
                      <span>Q</span>
                      {faq.question}
                      <i aria-hidden="true">+</i>
                    </summary>
                    <p>{faq.answer}</p>
                  </details>
                ))}
              </div>
            </section>

            <aside className="related-lesson-box">
              <div>
                <small>같은 지역의 다른 수업</small>
                <strong>{page.지역} 과외 더 보기</strong>
              </div>
              <div>
                {relatedPages.map((related) => (
                  <Link href={`/${getPublicPageSlug(related)}`} key={related.slug}>
                    {formatServiceName(related.업종)} <span>→</span>
                  </Link>
                ))}
              </div>
            </aside>

            <section className="detail-consult-cta" id="consult">
              <div className="detail-consult-content">
                <p>{page.지역} 과외 상담 문의</p>
                <h2>
                  상담으로 아이에게 맞는
                  <br />
                  수업 방향을 확인해보세요
                </h2>
                <span>
                  현재 학년과 과목, 가장 어려워하는 부분부터 편하게 말씀해
                  주세요.
                </span>
                <strong>010-8286-7620</strong>
                <a href="tel:01082867620">
                  상담 문의하기 <ArrowIcon />
                </a>
              </div>
            </section>
          </div>
        </article>
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema).replaceAll("<", "\\u003c"),
        }}
      />
    </>
  );
}
