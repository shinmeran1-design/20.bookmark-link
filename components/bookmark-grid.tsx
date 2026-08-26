"use client";

import BookmarkCard from "@/components/bookmark-card";
import { useBookmarks } from "@/components/bookmark-provider";

type BookmarkGridProps = {
  folderId?: string;
};

export default function BookmarkGrid({ folderId }: BookmarkGridProps) {
  const { bookmarks } = useBookmarks();
  const filteredBookmarks = folderId
    ? bookmarks.filter((bookmark) => bookmark.folderId === folderId)
    : bookmarks;

  if (filteredBookmarks.length === 0) {
    return (
      <p className="text-sm text-[var(--text-sub)]">등록된 링크가 없습니다.</p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {filteredBookmarks.map((bookmark) => (
        <BookmarkCard key={bookmark.id} bookmark={bookmark} />
      ))}
    </div>
  );
}
