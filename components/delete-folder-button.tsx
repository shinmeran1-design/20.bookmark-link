"use client";

import { useState } from "react";
import type { Folder } from "@/lib/types";
import { useFolders } from "@/components/folder-provider";
import DeleteFolderModal from "@/components/delete-folder-modal";

type DeleteFolderButtonProps = {
  folder: Folder;
  className?: string;
};

export default function DeleteFolderButton({
  folder,
  className,
}: DeleteFolderButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { deleteFolder } = useFolders();

  const handleConfirm = async () => {
    await deleteFolder(folder.id);
    setIsOpen(false);
  };

  return (
    <>
      <button
        type="button"
        aria-label={`${folder.name} 폴더 삭제`}
        onClick={(event) => {
          event.stopPropagation();
          setIsOpen(true);
        }}
        className={`btn-icon-danger flex items-center justify-center rounded-full text-[var(--text-sub)] ${
          className ?? ""
        }`}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-3.5 w-3.5"
        >
          <path d="M3 6h18" />
          <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
          <path d="M10 11v6" />
          <path d="M14 11v6" />
        </svg>
      </button>

      {isOpen && (
        <DeleteFolderModal
          folder={folder}
          onClose={() => setIsOpen(false)}
          onConfirm={handleConfirm}
        />
      )}
    </>
  );
}
