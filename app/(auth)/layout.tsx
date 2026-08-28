import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Bookmark Link",
  description: "링크를 폴더별로 모아 관리하는 북마크 서비스",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full bg-[var(--bg)]">
        <main className="flex min-h-screen items-center justify-center px-6 py-16">
          {children}
        </main>
      </body>
    </html>
  );
}
