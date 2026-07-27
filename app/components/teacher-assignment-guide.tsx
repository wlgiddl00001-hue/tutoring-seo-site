type TeacherAssignmentGuideProps = {
  intro: string;
};

const assignmentItems = [
  "4년제 대학교 졸업 선생님",
  "5년부터 20년 경력의 전문 과외 선생님",
  "교육청에 정식 신고·등록된 선생님",
  "학생의 학년·과목·현재 수준·학습 성향을 고려한 1:1 배정",
  "무료 모의수업 후 정규수업 결정",
  "방문 배정이 어려운 지역은 온라인 전문 선생님 연결 가능",
];

export function TeacherAssignmentGuide({ intro }: TeacherAssignmentGuideProps) {
  return (
    <section className="teacherAssignmentGuide">
      <div className="teacherAssignmentGuideHead">
        <p className="teacherAssignmentGuideLabel">TEACHER MATCHING</p>
        <h2>학생에게 맞는 전문 선생님 배정</h2>
        <p>{intro}</p>
      </div>

      <div className="teacherAssignmentGuideGrid">
        {assignmentItems.map((item, index) => (
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
