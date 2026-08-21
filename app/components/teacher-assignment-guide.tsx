type TeacherAssignmentGuideProps = {
  intro: string;
  variant?: "default" | "online";
};

const assignmentItems = [
  "학력과 전공을 확인한 선생님",
  "과외·학원 등 실제 지도 경력 확인",
  "교육청 신고 여부와 기본 정보 확인",
  "학생의 학년·과목·현재 수준·학습 성향을 고려한 1:1 배정",
  "선생님 프로필을 먼저 안내한 뒤 무료 모의수업 진행",
  "방문 배정이 어려운 지역은 온라인 전문 선생님 연결 가능",
];

const onlineAssignmentItems = [
  "학력과 전공을 확인한 선생님",
  "과외·학원 등 실제 지도 경력 확인",
  "교육청 신고 여부와 기본 정보 확인",
  "학생의 학년·과목·현재 수준·온라인 수업 환경을 고려한 1:1 배정",
  "선생님 프로필을 먼저 안내한 뒤 무료 모의수업 진행",
  "화면 공유와 실시간 피드백 경험이 있는 온라인 전문 선생님 연결",
];

export function TeacherAssignmentGuide({
  intro,
  variant = "default",
}: TeacherAssignmentGuideProps) {
  const items = variant === "online" ? onlineAssignmentItems : assignmentItems;

  return (
    <section className="teacherAssignmentGuide">
      <div className="teacherAssignmentGuideHead">
        <p className="teacherAssignmentGuideLabel">TEACHER MATCHING</p>
        <h2>학생에게 맞는 전문 선생님 배정</h2>
        <p>{intro}</p>
      </div>

      <div className="teacherAssignmentGuideGrid">
        {items.map((item, index) => (
          <div className="teacherAssignmentGuideItem" key={item}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <p>{item}</p>
          </div>
        ))}
      </div>

      <div className="teacherAssignmentGuideFooter">
        <p>
          무료 모의수업에서 학생과 선생님의 수업 방식이 잘 맞는지 확인한 뒤
          정규수업 여부를 결정할 수 있습니다.
        </p>
        <a href="#consult">전문 선생님 배정 상담 신청</a>
      </div>
    </section>
  );
}
