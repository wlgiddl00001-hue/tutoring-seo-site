"use client";
import Link from "next/link";
import { useState, type FormEvent } from "react";
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
  sourceLabel?: string;
};

function mergeClassName(baseClassName: string, className?: string) {
  return className ? `${baseClassName} ${className}` : baseClassName;
}

export function ConsultationFormCard({ className, sourceLabel }: ConsultationCardProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

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
      sourceLabel: sourceLabel || "과외 상담 페이지",
      pageTitle: document.title,
      pageUrl: window.location.href,
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
      setIsSubmitting(true);
      setStatusMessage("상담 신청을 접수하고 있습니다.");
      await fetch(CONSULTATION_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(payload),
      });

      setStatusMessage("상담 신청이 접수되었습니다. 확인 후 순서대로 연락드리겠습니다.");
      form.reset();
    } catch {
      setStatusMessage("접수가 원활하지 않습니다. 전화상담 010-8286-7620으로 문의해 주세요.");
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <form className={mergeClassName("consultFormCard", className)} onSubmit={handleSubmit}>
      <div className="consultFormHead">
        <strong>과외 상담 신청</strong>
        <p>
          학생의 학년과 희망 과목을 남겨주시면 방문 가능 여부와 선생님 배정 방향을
          확인한 뒤 연락드립니다. 상담만 받아도 별도 비용은 없습니다.
        </p>
      </div>

      <label className="consultField">
        <span>이름</span>
        <input
          className="consultInput"
          type="text"
          name="name"
          placeholder="예: 홍길동"
          autoComplete="name"
          required
        />
      </label>

      <label className="consultField">
        <span>학생 학년</span>
        <input
          className="consultInput"
          type="text"
          name="grade"
          placeholder="예: 초6, 중2, 고1"
          required
        />
      </label>

      <label className="consultField">
        <span>희망 과목</span>
        <input
          className="consultInput"
          type="text"
          name="subject"
          placeholder="예: 수학, 영어, 국어"
          required
        />
      </label>

      <label className="consultField">
        <span>상담 가능한 연락처</span>
        <input
          className="consultInput"
          type="tel"
          inputMode="tel"
          name="phone"
          placeholder="예: 010-1234-5678"
          autoComplete="tel"
          required
        />
      </label>

      <label className="consultAgree">
        <input type="checkbox" name="agree" required />
        <span><Link href="/privacy">개인정보 수집 및 이용 안내</Link>를 확인했으며 이에 동의합니다.</span>
      </label>

      <button type="submit" className="consultSubmitBtn" disabled={isSubmitting}>
        {isSubmitting ? "접수 중입니다" : "무료 상담 신청하기"}
      </button>

      <a href="tel:01082867620" className="consultPhoneBtn">
        전화상담 010-8286-7620
      </a>
      <p className="consultFormNotice">무료 모의수업 후 정규수업 여부를 결정할 수 있으며, 상담 단계에서 수업료와 가능한 일정을 먼저 안내합니다.</p>
      <p className="consultFormStatus" role="status" aria-live="polite">{statusMessage}</p>
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
