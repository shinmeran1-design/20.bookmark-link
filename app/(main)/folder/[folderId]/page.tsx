import type { Metadata } from "next";
import { cookies } from "next/headers";
import BookmarkGrid from "@/components/bookmark-grid";
import FolderHeading from "@/components/folder-heading";
import { createClient } from "@/utils/supabase/server";
import { pageMetadata } from "@/lib/site-metadata";

type FolderPageProps = {
  params: Promise<{ folderId: string }>;
};

export async function generateMetadata({
  params,
}: FolderPageProps): Promise<Metadata> {
  const { folderId } = await params;

  // 로그인한 사용자 소유의 폴더 이름을 가져와 제목에 반영 (RLS 적용)
  const numericId = Number(folderId);
  let folderName: string | undefined;
  if (Number.isFinite(numericId)) {
    const supabase = createClient(await cookies());
    const { data } = await supabase
      .from("folders")
      .select("name")
      .eq("id", numericId)
      .maybeSingle();
    folderName = data?.name ?? undefined;
  }

  return folderName
    ? pageMetadata(`${folderName} 폴더`, `${folderName} 폴더에 담긴 링크 모음`)
    : pageMetadata("폴더");
}

export default async function FolderPage({ params }: FolderPageProps) {
  const { folderId } = await params;

  return (
    <>
      <FolderHeading folderId={folderId} />
      <BookmarkGrid folderId={folderId} />
    </>
  );
}
