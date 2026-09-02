type OnlineTutoringGuideProps = {
  intro: string;
  variant?: "full" | "compact";
  ctaLabel?: string;
};

const onlineLessonFlow = [
  ["무료 상담", "학년·과목과 현재 학습 고민을 확인합니다."],
  ["학생 수준·과목 확인", "취약 단원과 수업 목표를 함께 정리합니다."],
  ["맞춤 선생님 프로필 안내", "학생 성향과 희망 시간을 고려해 안내합니다."],
  ["무료 모의수업", "실제 수업 방식과 학생과의 호흡을 확인합니다."],
  ["수업 진행", "숙제·오답·시험 대비까지 이어서 관리합니다."],
] as const;

const guideItems = [
  "녹화 강의를 시청하는 방식이 아닌 실시간 1:1 수업",
  "화면 공유와 실시간 필기를 활용한 개념 설명과 답안 확인",
  "학생의 질문과 답안 작성 과정을 수업 중 바로 확인",
  "지역 제한 없이 학년·과목 전문 선생님 배정 가능",
  "수업 후 복습·숙제·오답 관리",
  "무료 모의수업으로 화면·음성·집중도와 수업 방식 확인",
  "이동 시간이나 지역 제한이 큰 일정에도 온라인 수업 가능",
];

const compactItems = [
  "실시간 1:1 화면 공유 수업",
  "질문과 답변 즉시 확인",
  "무료 모의수업으로 수업 환경 확인",
];

export function OnlineTutoringGuide({
  intro,
  variant = "full",
  ctaLabel = "온라인 과외 무료 상담 신청",
}: OnlineTutoringGuideProps) {
  const isCompact = variant === "compact";
  const items = isCompact ? compactItems : guideItems;

  return (
    <section
      className={`onlineTutoringGuide ${isCompact ? "onlineTutoringGuideCompact" : ""}`}
    >
      <div className="onlineTutoringGuideHead">
        <p className="onlineTutoringGuideLabel">ONLINE LESSON</p>
        <h2>실시간 1:1 온라인 과외 안내</h2>
        <p>{intro}</p>
      </div>

      {!isCompact ? (
        <div className="onlineLessonFlow" aria-label="온라인 과외 이용 흐름">
          <h3>온라인 과외 이용 흐름</h3>
          <ol>
            {onlineLessonFlow.map(([title, description], index) => (
              <li key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{title}</strong>
                <p>{description}</p>
              </li>
            ))}
          </ol>
        </div>
      ) : null}

      <div className="onlineTutoringGuideGrid">
        {items.map((item, index) => (
          <div className="onlineTutoringGuideItem" key={item}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <p>{item}</p>
          </div>
        ))}
      </div>

      <div className="onlineTutoringGuideFooter">
        <p>
          무료 모의수업에서 화면과 음성 상태, 학생의 집중도, 수업 방식이 잘
          맞는지 먼저 확인할 수 있습니다.
        </p>
        <a href="#consult">{ctaLabel}</a>
      </div>
    </section>
  );
}
