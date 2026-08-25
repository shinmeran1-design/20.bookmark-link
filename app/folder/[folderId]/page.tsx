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
      <h1 className="mb-6 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
        {folder.name}
      </h1>
      <BookmarkGrid bookmarks={folderBookmarks} />
    </>
  );
}
