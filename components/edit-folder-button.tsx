"use client";

import { useState } from "react";
import type { Folder } from "@/lib/types";
import { useFolders } from "@/components/folder-provider";
import EditFolderModal from "@/components/edit-folder-modal";

type EditFolderButtonProps = {
  folder: Folder;
  className?: string;
};

export default function EditFolderButton({
  folder,
  className,
}: EditFolderButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { renameFolder } = useFolders();

  const handleSave = (name: string) => {
    renameFolder(folder.id, name);
    setIsOpen(false);
  };

  return (
    <>
      <button
        type="button"
        aria-label={`${folder.name} 폴더 이름 수정`}
        onClick={(event) => {
          event.stopPropagation();
          setIsOpen(true);
        }}
        className={`btn-icon flex items-center justify-center rounded-full text-[var(--text-sub)] ${
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
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z" />
        </svg>
      </button>

      {isOpen && (
        <EditFolderModal
          folder={folder}
          onClose={() => setIsOpen(false)}
          onSave={handleSave}
        />
      )}
    </>
  );
}
