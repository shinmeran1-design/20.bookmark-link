import BookmarkGrid from "@/components/bookmark-grid";
import { bookmarks } from "@/lib/mock-data";

export default function Home() {
  return <BookmarkGrid bookmarks={bookmarks} />;
}
