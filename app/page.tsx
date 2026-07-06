import type { Metadata } from "next";
import Link from "next/link";
import { LessonIllustration } from "@/app/components/lesson-illustration";
import { RegionSelector } from "@/app/components/region-selector";
import { SiteHeader } from "@/app/components/site-header";
import { regions, services } from "@/lib/tutoring-pages";

export const metadata: Metadata = {
  title: "호빈샘 과외 | 온라인·초등·중등·고등·검정고시·지역별 과외",
  description:
    "전국 지역별 과외와 온라인 과외를 학년, 과목, 학습 상황에 맞춰 안내하는 과외 홈페이지입니다. 초등·중등·고등 과외부터 검정고시 준비까지 필요한 수업 정보를 확인할 수 있습니다.",
};

const gradeGroups = [
  { key: "elementary", name: "초등", description: "기초 개념과 공부 습관을 차근차근 잡아가는 수업" },
  { key: "middle", name: "중등", description: "학교 진도와 내신 준비를 균형 있게 이어가는 수업" },
  { key: "high", name: "고등", description: "목표 성적에 맞춰 개념과 문제풀이를 관리하는 수업" },
];

const onlineSubjects = [
  { key: "korean", name: "국어" },
  { key: "english", name: "영어" },
  { key: "math", name: "수학" },
  { key: "social", name: "사회" },
  { key: "science", name: "과학" },
  { key: "korean-history", name: "한국사" },
];

const learningConcerns = [
  { title: "성적향상", description: "현재 수준을 확인하고 다음 점수를 위한 학습 순서를 정합니다.", href: "/gangnam-gu/middle-math" },
  { title: "기초개념보완", description: "놓친 개념을 찾아 이해할 수 있는 설명부터 다시 시작합니다.", href: "/seocho-gu/elementary-math" },
  { title: "공부습관형성", description: "계획과 복습을 꾸준히 이어가는 공부 흐름을 만듭니다.", href: "/songpa-gu/elementary-korean" },
  { title: "내신대비", description: "학교 진도와 시험 범위에 맞춰 우선순위를 정리합니다.", href: "/gangnam-gu/high-english" },
  { title: "약한단원보완", description: "자주 막히는 단원과 문제 유형을 집중해서 보완합니다.", href: "/mapo-gu/middle-english" },
  { title: "오답관리중심", description: "틀린 이유를 확인하고 같은 실수를 줄이는 방법을 익힙니다.", href: "/yeongdeungpo-gu/high-math" },
];

function ArrowIcon() {
  return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h12M11 5l5 5-5 5" /></svg>;
}

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="home-page">
        <section className="main-hero">
          <div className="shell main-hero-layout">
            <div className="main-hero-copy">
              <p className="section-label">호빈샘 과외 · 전국 지역별 과외 안내</p>
              <h1>전국 어디서든,<br />학생에게 맞는 과외를 <em>찾기 쉽게</em></h1>
              <div className="main-hero-support">
                <p className="hero-subtitle">
                  초등부터 고등까지, 지역과 과목에 맞춘 과외 안내.
                  국어·영어·수학·사회·과학·한국사 과외를 학생 수준에 맞춰 안내합니다.
                </p>
                <div className="hero-buttons">
                  <a className="primary-phone-button" href="tel:01082867620">
                    <span>상담 문의하기</span><strong>010-8286-7620</strong>
                  </a>
                  <Link className="secondary-button" href="#regions">우리 동네 과외 찾기 <ArrowIcon /></Link>
                </div>
                <ul className="hero-benefits">
                  <li><span>✓</span>학생별 현재 수준 확인</li>
                  <li><span>✓</span>학년·과목별 맞춤 안내</li>
                  <li><span>✓</span>복습과 학습 과정 관리</li>
                </ul>
              </div>
            </div>
            <LessonIllustration className="main-hero-placeholder" />
          </div>
        </section>

        <style>{`
          .site-header .brand {
            gap: 18px;
          }

          .site-header .brand small {
            margin-top: 6px;
            color: #5f7067;
            font-size: 12px;
            font-weight: 800;
          }

          .main-hero-copy > .section-label {
            margin-bottom: 24px;
            text-align: center;
            font-size: 16px;
            font-weight: 900;
            line-height: 1.5;
          }

          .main-hero-support {
            padding-left: clamp(8px, 1vw, 16px);
          }

          .main-hero .hero-subtitle {
            color: #44564d;
            font-size: 20px;
            font-weight: 600;
          }

          .main-hero .primary-phone-button span {
            font-size: 13px;
            font-weight: 850;
          }

          .main-hero .primary-phone-button strong {
            font-size: 21px;
            font-weight: 800;
          }

          .main-hero .secondary-button {
            font-size: 16px;
            font-weight: 850;
          }

          .main-hero .hero-benefits {
            color: #405149;
            font-size: 15.5px;
            font-weight: 800;
          }

          .main-hero-placeholder {
            min-height: 600px;
            gap: 19px;
            padding: 42px;
          }

          .main-hero-placeholder .placeholder-heading span {
            font-size: 14px;
            font-weight: 900;
          }

          .main-hero-placeholder .placeholder-heading strong {
            font-size: 27px;
            font-weight: 700;
          }

          .main-hero-placeholder .lesson-profile {
            min-height: 122px;
            padding: 21px;
          }

          .main-hero-placeholder .lesson-profile small {
            color: #68786f;
            font-size: 13px;
            font-weight: 900;
          }

          .main-hero-placeholder .lesson-profile strong {
            font-size: 15px;
            font-weight: 800;
          }

          .main-hero-placeholder .lesson-desk-card,
          .main-hero-placeholder .lesson-progress-card {
            min-height: 205px;
          }

          .main-hero-placeholder .notebook-sheet span {
            font-size: 15px;
            font-weight: 900;
          }

          .main-hero-placeholder .lesson-progress-card > div {
            font-size: 15px;
            font-weight: 900;
          }

          .main-hero-placeholder .lesson-progress-card > div strong {
            font-size: 23px;
            font-weight: 900;
          }

          @media (min-width: 1021px) {
            .main-hero > .main-hero-layout {
              width: min(1180px, calc(100% - 48px));
              grid-template-columns: 0.85fr 1.15fr;
              gap: 32px;
            }
          }

          @media (max-width: 760px) {
            .site-header .brand {
              gap: 14px;
            }

            .site-header .brand small {
              font-size: 11px;
            }

            .main-hero-copy > .section-label {
              font-size: 14px;
            }

            .main-hero-support {
              padding-left: 0;
            }
          }

          @media (max-width: 520px) {
            .main-hero-placeholder {
              min-height: 0;
              gap: 15px;
              padding: 19px;
            }

            .main-hero-placeholder .placeholder-heading strong {
              font-size: 22px;
            }

            .main-hero-placeholder .lesson-profile {
              min-height: 96px;
              padding: 19px;
            }

            .main-hero-placeholder .lesson-desk-card,
            .main-hero-placeholder .lesson-progress-card {
              min-height: 165px;
            }
          }

          .grade-mode-tabs {
            display: inline-flex;
            gap: 8px;
            border: 1px solid #d5e1da;
            border-radius: 12px;
            background: #fff;
            margin-bottom: 34px;
            padding: 6px;
          }

          .province-list .province-available {
            background: #fff;
            color: #3d5147;
            cursor: pointer;
          }

          .province-list .province-available:hover {
            background: #edf6f1;
            color: var(--green);
          }

          .province-list .province-available small {
            color: #718178;
          }

          .province-list .province-active {
            cursor: pointer;
          }

          .grade-mode-tabs a {
            display: inline-flex;
            min-height: 48px;
            align-items: center;
            justify-content: center;
            border-radius: 8px;
            color: #5d6d64;
            font-size: 16px;
            font-weight: 800;
            padding: 0 24px;
          }

          .grade-mode-tabs .is-active {
            background: var(--green);
            color: #fff;
            box-shadow: 0 8px 20px rgba(23, 107, 82, 0.18);
          }

          .grade-finder .grade-choice-header h3 {
            color: #263a31;
            font-weight: 750;
          }

          .grade-finder .grade-choice > p {
            color: #52635a;
            font-size: 16px;
            font-weight: 650;
          }

          .concern-section .main-section-heading .section-label {
            font-size: 15px;
            font-weight: 900;
          }

          .concern-section .main-section-heading h2 {
            font-size: clamp(44px, 4.4vw, 58px);
            font-weight: 700;
          }

          .concern-section .main-section-heading > p:last-child {
            color: #4e6057;
            font-size: 18px;
            font-weight: 650;
          }

          .concern-section .concern-cards > a > span {
            color: #687a70;
            font-size: 16px;
            font-weight: 800;
          }

          .concern-section .concern-cards h3 {
            color: #263a31;
            font-size: 27px;
            font-weight: 750;
          }

          .concern-section .concern-cards p {
            color: #52635a;
            font-size: 16px;
            font-weight: 650;
          }

          @media (max-width: 520px) {
            .grade-mode-tabs {
              display: grid;
              grid-template-columns: 1fr 1fr;
              width: 100%;
            }

            .grade-mode-tabs a {
              padding: 0 12px;
            }
          }
        `}</style>

        <section className="main-section region-finder" id="regions">
          <div className="shell">
            <div className="main-section-heading">
              <p className="section-label">REGION</p>
              <h2>지역별 과외 찾기</h2>
              <p className="region-intro-text">
  우리 아이에게 맞는 과외는 지역만으로 정해지지 않습니다. 가까운 방문 수업부터 시간 조율이 쉬운 온라인 과외까지, 학년·과목·학습 상황에 맞춰 확인해보세요.
</p>
            </div>
            <div className="section-anchor" id="grades">
              <RegionSelector regions={regions} services={services} />
            </div>
          </div>
        </section>

        <section className="main-section grade-finder" id="online">
          <div className="shell">
            <nav className="grade-mode-tabs" id="subjects" aria-label="과외 유형 선택">
              <Link href="#regions">지역별 과외</Link>
              <Link className="is-active" href="#subjects" aria-current="page">온라인 과외</Link>
            </nav>
            <div className="main-section-heading">
              <p className="section-label">ONLINE LESSON</p>
              <h2>온라인 과외로 집에서도 맞춤수업을 받을 수 있어요</h2>
              <p>이동 시간 없이 초등·중등·고등 과목별 수업을 학생 수준에 맞춰 안내합니다.</p>
            </div>
            <div className="grade-cards">
              {gradeGroups.map((grade, index) => (
                  <article className={`grade-choice grade-choice-${index + 1}`} key={grade.key}>
                    <div className="grade-choice-header">
                      <span>0{index + 1}</span>
                      <div><small>{grade.key.toUpperCase()}</small><h3>{grade.name} 온라인 과외</h3></div>
                    </div>
                    <p>{grade.description}</p>
                    <div className="subject-buttons">
                      {onlineSubjects.map((subject) => (
                        <Link href={`/online/${grade.key}-${subject.key}`} key={subject.key}>
                          {subject.name}
                          <ArrowIcon />
                        </Link>
                      ))}
                    </div>
                  </article>
              ))}
            </div>
          </div>
        </section>
                  <section className="main-section exam-section" id="exam">
        <div className="shell">
          <div className="exam-hero">
            <div className="exam-hero-copy">
              <p className="section-label">호빈샘 과외 · 검정고시 맞춤 안내</p>
              <h2>
                중졸·고졸 검정고시도
                <br />
                학생 상황에 맞춰 준비해요
              </h2>
              <p>
                검정고시는 학생마다 준비 기간, 기초 수준, 필요한 과목이 다릅니다.
                중졸검정고시와 고졸검정고시 모두 현재 수준을 먼저 확인한 뒤
                과목별로 필요한 부분부터 차근차근 안내합니다.
              </p>

              <div className="exam-hero-actions">
                <a href="tel:010-8286-7620" className="exam-phone-button">
                  <small>상담 문의하기</small>
                  010-8286-7620
                </a>
                <a href="#exam-online" className="exam-outline-button">
                  온라인 검정고시 보기
                  <ArrowIcon />
                </a>
              </div>

              <div className="exam-check-list">
                <span>✓ 중졸·고졸 검정고시 구분 상담</span>
                <span>✓ 국어·영어·수학 등 과목별 보완</span>
                <span>✓ 방문 가능 지역은 상담 후 안내</span>
              </div>
            </div>

            <div className="exam-hero-card">
              <div className="exam-hero-card-top">
                <p>1:1 QUALIFICATION EXAM LESSON</p>
                <h3>검정고시 과외 안내</h3>
              </div>
<div className="exam-hero-image-wrap">
  <img
    src="/images/tutoring/010.png"
    alt="검정고시 과외 수업 이미지"
    className="exam-hero-image"
  />
</div>
              <div className="exam-info-grid">
                <div className="exam-info-box">
                  <span>01</span>
                  <strong>지역 상담</strong>
                  <p>방문 과외는 학생 거주 지역 확인 후 안내합니다.</p>
                </div>
                <div className="exam-info-box">
                  <span>02</span>
                  <strong>수준 확인</strong>
                  <p>오래 쉬었거나 기초가 약한 과목부터 확인합니다.</p>
                </div>
                <div className="exam-info-box">
                  <span>03</span>
                  <strong>과목별 보완</strong>
                  <p>국어·영어·수학·사회·과학·한국사를 나눠 준비합니다.</p>
                </div>
                <div className="exam-info-box">
                  <span>04</span>
                  <strong>온라인 가능</strong>
                  <p>이동이 어렵다면 온라인 검정고시 과외도 가능합니다.</p>
                </div>
              </div>

              <div className="exam-progress-box">
                <div>
                  <strong>검정고시 준비 방향</strong>
                  <p>기초 개념 → 기출 유형 → 오답 보완</p>
                </div>
                <b>1:1</b>
              </div>
            </div>
          </div>

          <div className="main-section-heading exam-card-heading">
            <p className="section-label">QUALIFICATION EXAM</p>
            <h2>검정고시 과외 과목 선택</h2>
            <p>
              중졸·고졸 검정고시부터 온라인 수업까지 필요한 과목을 선택하면 상세 안내로 이동합니다.
            </p>
          </div>

          <div className="exam-card-group">
            <article className="grade-choice grade-choice-1">
              <div className="grade-choice-header">
                <span>01</span>
                <div>
                  <small>MIDDLE SCHOOL EXAM</small>
                  <h3>중졸검정고시 과외</h3>
                </div>
              </div>
              <p>검정고시 준비가 처음인 학생도 기초 개념부터 차근차근 준비할 수 있는 수업</p>
              <div className="subject-buttons">
               <Link href="/middle-school-qualification-exam-korean-tutoring">중졸 국어<ArrowIcon /></Link>
<Link href="/middle-school-qualification-exam-english-tutoring">중졸 영어<ArrowIcon /></Link>
<Link href="/middle-school-qualification-exam-math-tutoring">중졸 수학<ArrowIcon /></Link>
<Link href="/middle-school-qualification-exam-social-studies-tutoring">중졸 사회<ArrowIcon /></Link>
<Link href="/middle-school-qualification-exam-science-tutoring">중졸 과학<ArrowIcon /></Link>
<Link href="/middle-school-qualification-exam-korean-history-tutoring">중졸 한국사<ArrowIcon /></Link>
              </div>
            </article>

            <article className="grade-choice grade-choice-2">
              <div className="grade-choice-header">
                <span>02</span>
                <div>
                  <small>HIGH SCHOOL EXAM</small>
                  <h3>고졸검정고시 과외</h3>
                </div>
              </div>
              <p>과목별 취약 단원과 기출 유형을 함께 정리하며 합격 기준에 맞춰 준비하는 수업</p>
              <div className="subject-buttons">
                <Link href="/high-school-qualification-exam-korean-tutoring">고졸 국어<ArrowIcon /></Link>
<Link href="/high-school-qualification-exam-english-tutoring">고졸 영어<ArrowIcon /></Link>
<Link href="/high-school-qualification-exam-math-tutoring">고졸 수학<ArrowIcon /></Link>
<Link href="/high-school-qualification-exam-social-studies-tutoring">고졸 사회<ArrowIcon /></Link>
<Link href="/high-school-qualification-exam-science-tutoring">고졸 과학<ArrowIcon /></Link>
<Link href="/high-school-qualification-exam-korean-history-tutoring">고졸 한국사<ArrowIcon /></Link>
              </div>
            </article>
          </div>

          <div className="main-section-heading exam-card-heading" id="exam-online">
            <p className="section-label">ONLINE EXAM LESSON</p>
            <h2>온라인 검정고시 과외</h2>
            <p>
              이동이 어렵거나 집에서 준비하고 싶은 학생은 온라인 수업으로 과목별 보완이 가능합니다.
            </p>
          </div>

          <div className="exam-online-group">
            <article className="grade-choice grade-choice-3">
              <div className="grade-choice-header">
                <span>03</span>
                <div>
                  <small>ONLINE MIDDLE EXAM</small>
                  <h3>온라인 중졸검정고시 과외</h3>
                </div>
              </div>
              <p>이동 없이 집에서 중졸 검정고시 과목을 학생 수준에 맞춰 준비하는 온라인 수업</p>
              <div className="subject-buttons">
                <Link href="/online-middle-school-qualification-exam-korean-tutoring">국어<ArrowIcon /></Link>
                <Link href="/online-middle-school-qualification-exam-english-tutoring">영어<ArrowIcon /></Link>
                <Link href="/online-middle-school-qualification-exam-math-tutoring">수학<ArrowIcon /></Link>
                <Link href="/online-middle-school-qualification-exam-social-studies-tutoring">사회<ArrowIcon /></Link>
                <Link href="/online-middle-school-qualification-exam-science-tutoring">과학<ArrowIcon /></Link>
                <Link href="/online-middle-school-qualification-exam-korean-history-tutoring">한국사<ArrowIcon /></Link>
              </div>
            </article>

            <article className="grade-choice grade-choice-1">
              <div className="grade-choice-header">
                <span>04</span>
                <div>
                  <small>ONLINE HIGH EXAM</small>
                  <h3>온라인 고졸검정고시 과외</h3>
                </div>
              </div>
              <p>고졸 검정고시 준비생을 위해 과목별 개념, 기출, 오답을 온라인으로 관리하는 수업</p>
              <div className="subject-buttons">
                <Link href="/online-high-school-qualification-exam-korean-tutoring">국어<ArrowIcon /></Link>
                <Link href="/online-high-school-qualification-exam-english-tutoring">영어<ArrowIcon /></Link>
                <Link href="/online-high-school-qualification-exam-math-tutoring">수학<ArrowIcon /></Link>
                <Link href="/online-high-school-qualification-exam-social-studies-tutoring">사회<ArrowIcon /></Link>
                <Link href="/online-high-school-qualification-exam-science-tutoring">과학<ArrowIcon /></Link>
                <Link href="/online-high-school-qualification-exam-korean-history-tutoring">한국사<ArrowIcon /></Link>
              </div>
            </article>
          </div>
        </div>
      </section>
        <section className="main-section concern-section" id="concerns">
          <div className="shell">
            <div className="main-section-heading centered-heading">
              <p className="section-label">LEARNING CONCERNS</p>
              <h2>학습 고민에 맞는 수업을 찾아보세요</h2>
              <p>가장 먼저 해결하고 싶은 고민을 선택하면 관련 수업 안내로 이동합니다.</p>
            </div>
            <div className="concern-cards">
              {learningConcerns.map((concern, index) => (
                <Link href={concern.href} key={concern.title}>
                  <span>0{index + 1}</span>
                  <h3>{concern.title}</h3>
                  <p>{concern.description}</p>
                  <i><ArrowIcon /></i>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="main-consult-section" id="consult">
          <div className="shell main-consult-box">
            <div>
              <p className="section-label light-label">PHONE CONSULTATION</p>
              <h2>아이에게 맞는 과외 방향이 고민된다면<br />상담부터 받아보세요</h2>
              <p className="main-consult-summary">현재 학년과 과목, 어려워하는 부분을 알려주시면 필요한 수업 방향을 함께 살펴봅니다.</p>
            </div>
            <div className="consult-phone-area">
              <span>상담 문의</span>
              <strong>010-8286-7620</strong>
              <p className="consult-phone-description">
                아이의 현재 학년, 과목, 어려워하는 단원이나 시험 준비 상황을 알려주시면 방문과외,
                온라인 과외, 검정고시 과외 중 어떤 수업 방향이 맞을지 함께 안내해드립니다. 지금 바로
                전화 상담으로 필요한 수업 방향을 편하게 확인해보세요.
              </p>
              <a href="tel:01082867620">전화 상담하기 <ArrowIcon /></a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
