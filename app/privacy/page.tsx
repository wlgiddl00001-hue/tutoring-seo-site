import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/app/components/site-header";
import { SiteFooter } from "@/app/components/site-footer";
import { getAbsoluteUrl } from "@/lib/site";

const canonical = getAbsoluteUrl("/privacy");

export const metadata: Metadata = {
  title: "개인정보처리방침",
  description: "호빈샘 과외 상담 신청 과정에서 수집하는 개인정보 항목과 이용 목적, 보유 기간을 안내합니다.",
  alternates: { canonical },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main className="privacyPage shell">
        <p className="privacyKicker">개인정보 수집 및 이용 안내</p>
        <h1>개인정보처리방침</h1>
        <p>호빈샘 과외는 상담 신청과 선생님 배정 안내를 위해 필요한 최소한의 개인정보만 수집합니다.</p>
        <section><h2>수집하는 항목</h2><p>이름, 학생 학년, 희망 과목, 상담 가능한 연락처, 신청한 페이지 정보</p></section>
        <section><h2>이용 목적</h2><p>과외 상담, 방문·온라인 수업 가능 여부 확인, 선생님 배정과 무료 모의수업 일정 안내에 사용합니다.</p></section>
        <section><h2>보유 기간</h2><p>상담 종료 후 관련 법령에서 정한 기간이 없는 경우 지체 없이 파기합니다. 상담 신청자는 개인정보 삭제를 요청할 수 있습니다.</p></section>
        <section><h2>동의 거부와 문의</h2><p>개인정보 수집에 동의하지 않을 수 있으나 온라인 상담 신청은 제한될 수 있습니다. 전화상담은 010-8286-7620으로 문의해 주세요.</p></section>
        <div className="privacyActions"><Link href="/#consult">상담 신청으로 돌아가기</Link><Link href="/">메인페이지 보기</Link></div>
      </main>
      <SiteFooter />
    </>
  );
}
