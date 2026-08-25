import type { Bookmark } from "@/lib/types";
import BookmarkCard from "@/components/bookmark-card";

type BookmarkGridProps = {
  bookmarks: Bookmark[];
};

export default function BookmarkGrid({ bookmarks }: BookmarkGridProps) {
  if (bookmarks.length === 0) {
    return <p className="text-sm text-zinc-400">등록된 링크가 없습니다.</p>;
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {bookmarks.map((bookmark) => (
        <BookmarkCard key={bookmark.id} bookmark={bookmark} />
      ))}
    </div>
  );
}
