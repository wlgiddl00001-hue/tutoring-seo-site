const consultSteps = [
  "상담신청",
  "전화상담",
  "선생님 배정",
  "무료 모의수업",
  "수업 결정",
];

type ConsultationCardProps = {
  className?: string;
};

function mergeClassName(baseClassName: string, className?: string) {
  return className ? `${baseClassName} ${className}` : baseClassName;
}

export function ConsultationFormCard({ className }: ConsultationCardProps) {
  return (
    <form className={mergeClassName("consultFormCard", className)}>
      <div className="consultFormHead">
        <strong>과외 상담 신청</strong>
        <p>
          학생의 학년, 희망 과목, 현재 고민을 남겨주시면 아이에게 맞는 수업 방향을
          확인한 뒤 상담을 도와드립니다.
        </p>
      </div>

      <label className="consultField">
        <span>이름</span>
        <input
          className="consultInput"
          type="text"
          name="name"
          placeholder="예: 홍길동"
        />
      </label>

      <label className="consultField">
        <span>학생 학년</span>
        <input
          className="consultInput"
          type="text"
          name="grade"
          placeholder="예: 초6, 중2, 고1"
        />
      </label>

      <label className="consultField">
        <span>희망 과목</span>
        <input
          className="consultInput"
          type="text"
          name="subject"
          placeholder="예: 수학, 영어, 국어"
        />
      </label>

      <label className="consultField">
        <span>상담 가능한 연락처</span>
        <input
          className="consultInput"
          type="text"
          name="phone"
          placeholder="예: 010-1234-5678"
        />
      </label>

      <label className="consultAgree">
        <input type="checkbox" />
        <span>개인정보 수집 및 이용에 동의합니다.</span>
      </label>

      <button type="button" className="consultSubmitBtn">
        상담 신청하기
      </button>

      <a href="tel:01082867620" className="consultPhoneBtn">
        전화상담 010-8286-7620
      </a>
    </form>
  );
}

export function ConsultationProcessBox({ className }: ConsultationCardProps) {
  return (
    <div className={mergeClassName("consultStepsCard", className)}>
      <div className="consultStepsHead">
        <strong>수업 시작 전 절차</strong>
        <p>
          상담과 무료 모의수업을 거친 뒤 정식 수업 여부를 결정할 수 있습니다.
        </p>
      </div>

      <div className="consultStepList">
        {consultSteps.map((step, index) => (
          <div
            className={
              index === consultSteps.length - 1
                ? "consultStepItem consultStepWide"
                : "consultStepItem"
            }
            key={step}
          >
            <span>{index + 1}</span>
            <strong>{step}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}