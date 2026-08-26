import { notFound } from "next/navigation";
import BookmarkGrid from "@/components/bookmark-grid";
import { bookmarks, folders } from "@/lib/mock-data";

type FolderPageProps = {
  params: Promise<{ folderId: string }>;
};

export default async function FolderPage({ params }: FolderPageProps) {
  const { folderId } = await params;
  const folder = folders.find((item) => item.id === folderId);

  if (!folder) {
    notFound();
  }

  const folderBookmarks = bookmarks.filter(
    (bookmark) => bookmark.folderId === folderId
  );

  return (
    <>
      <h1 className="mb-8 text-[24px] font-semibold tracking-[-0.3px] text-[var(--text)]">
        {folder.name}
      </h1>
      <BookmarkGrid bookmarks={folderBookmarks} />
    </>
  );
}
