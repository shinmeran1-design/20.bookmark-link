import BookmarkGrid from "@/components/bookmark-grid";
import { bookmarks } from "@/lib/mock-data";

export default function Home() {
  return (
    <>
      <h1 className="mb-6 text-lg font-semibold text-[var(--text)]">
        전체 링크
      </h1>
      <BookmarkGrid bookmarks={bookmarks} />
    </>
  );
}
