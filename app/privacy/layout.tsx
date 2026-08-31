import type { Metadata } from "next";
import { baseMetadata, pageMetadata } from "@/lib/site-metadata";
import "../globals.css";

// 이 프로젝트는 route group 별로 최상위 레이아웃(html/body)이 나뉘어 있고
// 루트 layout.tsx 가 없다. /privacy 는 (auth)/(main) 어느 그룹에도 속하지
// 않으므로 자체 html/body 셸을 제공한다.
export const metadata: Metadata = {
  ...baseMetadata,
  ...pageMetadata(
    "개인정보 처리방침",
    "Bookmark Link의 개인정보 처리방침 안내 페이지입니다."
  ),
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full bg-[var(--bg)]">{children}</body>
    </html>
  );
}
