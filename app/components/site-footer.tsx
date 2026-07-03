import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-inner">
        <div>
          <Link className="footer-brand" href="/">
            호빈샘 과외
          </Link>
          <p>학생의 현재에서 시작하는 서울 1:1 맞춤 과외</p>
        </div>
        <div className="footer-links">
          <Link href="/#regions">지역 찾기</Link>
          <Link href="/#subjects">과목 찾기</Link>
          <a href="tel:01082867620">전화 상담 010-8286-7620</a>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>© 2026 호빈샘 과외</span>
        <span>학생의 학습 속도와 방향을 함께 살핍니다.</span>
      </div>
    </footer>
  );
}
