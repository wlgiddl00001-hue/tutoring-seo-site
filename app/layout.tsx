import type { Metadata } from "next";
import "./globals.css";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "호빈샘 과외 | 초등·중등·고등 맞춤 과외",
    template: "%s | 호빈샘 과외",
  },
  description:
    "초등·중등·고등 학생을 위한 과목별 맞춤 과외 상담을 안내합니다. 현재 학년과 과목, 학습 고민에 맞춰 수업 방향을 확인해보세요.",
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
