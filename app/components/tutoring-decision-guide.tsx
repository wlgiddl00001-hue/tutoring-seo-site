type TutoringDecisionGuideProps = {
  region: string;
  serviceName: string;
};

export function TutoringDecisionGuide({ region, serviceName }: TutoringDecisionGuideProps) {
  return (
    <section className="tutoringDecisionGuide" aria-labelledby="decision-guide-title">
      <div className="tutoringDecisionGuideHead">
        <p>상담 전에 궁금한 점</p>
        <h2 id="decision-guide-title">{region} {serviceName}, 신청 전에 먼저 확인해드립니다</h2>
        <span>상담을 신청했다고 바로 수업이 결정되는 것은 아닙니다. 조건을 안내받고 무료 모의수업을 진행한 뒤 선택할 수 있습니다.</span>
      </div>
      <div className="tutoringDecisionGuideGrid">
        <article><b>01</b><h3>방문·온라인 가능 여부</h3><p>거주 지역과 원하는 요일을 확인해 방문수업 가능 여부와 온라인 대안을 안내합니다.</p></article>
        <article><b>02</b><h3>선생님 프로필과 일정</h3><p>학년·과목·현재 수준에 맞는 선생님을 확인하고 프로필과 가능한 시간을 먼저 안내합니다.</p></article>
        <article><b>03</b><h3>수업료와 무료 모의수업</h3><p>회당 시간과 월 수업 횟수에 따른 수업료를 상담 단계에서 안내하고, 무료 모의수업 후 결정합니다.</p></article>
      </div>
      <div className="tutoringDecisionGuideActions">
        <a href="#consult">우리 아이에게 맞는 선생님 확인하기</a>
        <a href="tel:01082867620">전화로 먼저 문의하기</a>
      </div>
    </section>
  );
}
