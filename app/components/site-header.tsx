import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header home-header">
      <div className="shell header-inner">
        <Link className="brand" href="/" aria-label="호빈샘 과외 홈">
          <span className="brand-mark" aria-hidden="true">
            호
          </span>
          <span>
            <strong>호빈샘 과외</strong>
            <small>학생 맞춤 1:1 과외</small>
          </span>
        </Link>

        <nav className="main-nav" aria-label="주요 메뉴">
          <Link href="/#regions">지역별 과외</Link>
          <Link href="/#online">온라인 과외</Link>
          <Link href="/#exam">검정고시 과외</Link>
          <Link href="/#subjects">학년·과목</Link>
          <Link href="/#concerns">학습 고민</Link>
        </nav>

        <a className="header-phone" href="tel:01082867620" aria-label="010-8286-7620으로 전화 상담">
          <span aria-hidden="true">☎</span><strong>010-8286-7620</strong>
        </a>
      </div>
    </header>
  );
}
