"use client";

import { useFolders } from "@/components/folder-provider";

type FolderHeadingProps = {
  folderId: string;
};

export default function FolderHeading({ folderId }: FolderHeadingProps) {
  const { folders } = useFolders();
  const folder = folders.find((item) => item.id === folderId);

  return (
    <h1 className="mb-8 text-[24px] font-semibold tracking-[-0.3px] text-[var(--text)]">
      {folder ? folder.name : "존재하지 않는 폴더입니다"}
    </h1>
  );
}
