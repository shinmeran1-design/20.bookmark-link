"use client";

import { useState } from "react";
import { useFolders } from "@/components/folder-provider";
import NewFolderModal from "@/components/new-folder-modal";

export default function NewFolderButton() {
  const [isOpen, setIsOpen] = useState(false);
  const { addFolder } = useFolders();

  const handleSave = async (name: string) => {
    await addFolder(name);
    setIsOpen(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="btn-outline flex items-center gap-1.5 rounded-full border border-[var(--border)] px-5 py-2 text-sm font-medium text-[var(--text)]"
      >
        <span className="text-base leading-none">+</span>새 폴더
      </button>

      {isOpen && (
        <NewFolderModal onClose={() => setIsOpen(false)} onSave={handleSave} />
      )}
    </>
  );
}
