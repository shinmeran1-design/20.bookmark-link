import { pageMetadata } from "@/lib/site-metadata";
import BookmarkGrid from "@/components/bookmark-grid";

export const metadata = pageMetadata(
  "전체 링크",
  "저장한 모든 링크를 한 곳에서 모아 봅니다."
);

export default function Home() {
  return (
    <>
      <h1 className="mb-8 text-[24px] font-semibold tracking-[-0.3px] text-[var(--text)]">
        전체 링크
      </h1>
      <BookmarkGrid />
    </>
  );
}
