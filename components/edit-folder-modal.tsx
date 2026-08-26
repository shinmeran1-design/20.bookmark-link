"use client";

import { useEffect, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";
import type { Folder } from "@/lib/types";

type EditFolderModalProps = {
  folder: Folder;
  onClose: () => void;
  onSave: (name: string) => void;
};

export default function EditFolderModal({
  folder,
  onClose,
  onSave,
}: EditFolderModalProps) {
  const [name, setName] = useState(folder.name);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    onSave(trimmed);
  };

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        onClick={(event) => event.stopPropagation()}
        className="w-full max-w-sm rounded-xl bg-[var(--surface)] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.16)]"
      >
        <h2 className="mb-4 text-[17px] font-semibold text-[var(--text)]">
          폴더 이름 수정
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            type="text"
            autoFocus
            required
            placeholder="폴더 이름을 입력하세요"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="rounded-[10px] border border-[var(--border)] bg-white px-4 py-3 text-[17px] text-[var(--text)] placeholder-[var(--placeholder)] outline-none focus:border-[var(--accent)] focus:shadow-[0_0_0_3px_rgba(0,113,227,0.2)]"
          />

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="btn-outline rounded-full border border-[var(--border)] px-5 py-2 text-sm font-medium text-[var(--text)]"
            >
              취소
            </button>
            <button
              type="submit"
              className="btn-primary rounded-full bg-[var(--accent)] px-5 py-2 text-sm font-medium text-white"
            >
              저장
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}
