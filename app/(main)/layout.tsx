import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import FolderProvider from "@/components/folder-provider";
import BookmarkProvider from "@/components/bookmark-provider";
import { createClient } from "@/utils/supabase/server";
import "../globals.css";

export const metadata: Metadata = {
  title: "Bookmark Link",
  description: "링크를 폴더별로 모아 관리하는 북마크 서비스",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  // 인덱스, 폴더별, 새 링크 페이지는 로그인한 사용자만 접근 가능
  const supabase = createClient(await cookies());
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full bg-[var(--bg)]">
        <FolderProvider initialFolders={[]}>
          <BookmarkProvider initialBookmarks={[]}>
            <div className="flex min-h-screen flex-col">
              <Header />
              <div className="flex flex-1">
                <Sidebar />
                <main className="flex-1 px-10 py-14">{children}</main>
              </div>
            </div>
          </BookmarkProvider>
        </FolderProvider>
      </body>
    </html>
  );
}
