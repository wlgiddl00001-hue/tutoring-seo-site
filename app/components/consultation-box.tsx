"use client";
import type { FormEvent } from "react";
const CONSULTATION_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz_qksThrgOh0ukEi1tQGmqnKk5laZ2-7QaqCA94zoHPxRPI-SqqtaFID1woM9RylxD/exec";
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
    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      siteType: "기존 과외 홈페이지",
      name: String(formData.get("name") || ""),
      grade: String(formData.get("grade") || ""),
      subject: String(formData.get("subject") || ""),
      phone: String(formData.get("phone") || ""),
      agree: formData.get("agree") === "on",
    };

    if (!payload.name || !payload.grade || !payload.subject || !payload.phone) {
      alert("이름, 학생 학년, 희망 과목, 연락처를 모두 입력해주세요.");
      return;
    }

    if (!payload.agree) {
      alert("개인정보 수집 및 이용에 동의해주세요.");
      return;
    }

    try {
      await fetch(CONSULTATION_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(payload),
      });

      alert("상담 신청이 접수되었습니다. 빠르게 연락드리겠습니다.");
      form.reset();
    } catch (error) {
      alert("상담 신청 중 오류가 발생했습니다. 전화상담으로 문의해주세요.");
    }
  }
  return (
    <form className={mergeClassName("consultFormCard", className)} onSubmit={handleSubmit}>
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
        <input type="checkbox" name="agree" />
        <span>개인정보 수집 및 이용에 동의합니다.</span>
      </label>

      <button type="submit" className="consultSubmitBtn">
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