import Link from "next/link";
import type { RelatedTutoringLink } from "@/lib/tutoring-related-links";

type RelatedTutoringLinksProps = {
  links: RelatedTutoringLink[];
};

export function RelatedTutoringLinks({ links }: RelatedTutoringLinksProps) {
  if (links.length === 0) {
    return null;
  }

  return (
    <aside className="related-lesson-box" aria-labelledby="related-tutoring-title">
      <div>
        <small>연관 과외 안내</small>
        <strong id="related-tutoring-title">함께 살펴볼 과외 안내</strong>
        <p className="related-lesson-description">
          현재 페이지와 가까운 학년, 과목, 수업 방식을 함께 확인해보세요.
        </p>
      </div>
      <div>
        {links.map((link) => (
          <Link href={link.href} key={link.href}>
            {link.label}
          </Link>
        ))}
      </div>
    </aside>
  );
}
