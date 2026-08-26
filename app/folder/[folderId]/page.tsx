import BookmarkGrid from "@/components/bookmark-grid";
import FolderHeading from "@/components/folder-heading";

type FolderPageProps = {
  params: Promise<{ folderId: string }>;
};

export default async function FolderPage({ params }: FolderPageProps) {
  const { folderId } = await params;

  return (
    <>
      <FolderHeading folderId={folderId} />
      <BookmarkGrid folderId={folderId} />
    </>
  );
}
