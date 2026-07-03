type LessonIllustrationProps = {
  className?: string;
  label?: string;
};

export function LessonIllustration({
  className = "",
  label = "아이에게 맞는 수업 방향을 안내하는 맞춤 과외 상담 카드",
}: LessonIllustrationProps) {
  return (
    <aside className={`education-placeholder hero-consult-card ${className}`} aria-label={label}>
      <header className="hero-consult-intro">
        <span>1:1 맞춤 과외 상담</span>
        <strong>상담 후 아이에게 맞는 수업 방향을 안내합니다</strong>
        <p>
          학년, 과목, 부족한 단원, 시험 준비 상황을 확인한 뒤 방문과외·온라인과외·검정고시과외 중
          필요한 방향을 함께 잡아드립니다.
        </p>
      </header>

      <ol className="hero-consult-steps">
        <li>
          <b>01</b>
          <div>
            <strong>현재 학습 상황 확인</strong>
            <p>학년과 과목, 어려운 단원과 시험 일정을 먼저 살펴봅니다.</p>
          </div>
        </li>
        <li>
          <b>02</b>
          <div>
            <strong>아이에게 맞는 수업 방식 선택</strong>
            <div className="hero-lesson-options" aria-label="선택 가능한 과외 방식">
              <span>방문과외</span>
              <span>온라인과외</span>
              <span>검정고시과외</span>
            </div>
          </div>
        </li>
        <li>
          <b>03</b>
          <div>
            <strong>이해에서 오답 관리까지</strong>
            <div className="hero-learning-flow" aria-label="학습 관리 순서">
              <span>개념 정리</span><i>→</i><span>문제 적용</span><i>→</i><span>오답 관리</span>
            </div>
          </div>
        </li>
      </ol>
    </aside>
  );
}
