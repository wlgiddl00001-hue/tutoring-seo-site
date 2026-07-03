import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "호빈샘 과외 | 서울 1:1 맞춤 과외",
    template: "%s | 호빈샘 과외",
  },
  description:
    "서울 25개 구에서 만나는 초등·중등·고등 1:1 맞춤 과외. 학생의 현재 수준과 목표에 맞는 학습 방향을 찾아보세요.",
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
