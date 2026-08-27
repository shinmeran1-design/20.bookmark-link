import type { Metadata } from "next";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import FolderProvider from "@/components/folder-provider";
import BookmarkProvider from "@/components/bookmark-provider";
import { bookmarks } from "@/lib/mock-data";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bookmark Link",
  description: "링크를 폴더별로 모아 관리하는 북마크 서비스",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full bg-[var(--bg)]">
        <FolderProvider initialFolders={[]}>
          <BookmarkProvider initialBookmarks={bookmarks}>
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
