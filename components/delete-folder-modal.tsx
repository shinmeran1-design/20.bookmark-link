"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { Folder } from "@/lib/types";

type DeleteFolderModalProps = {
  folder: Folder;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export default function DeleteFolderModal({
  folder,
  isOpen,
  onClose,
  onConfirm,
}: DeleteFolderModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      onClick={onClose}
    >
      <div
        role="alertdialog"
        aria-modal="true"
        onClick={(event) => event.stopPropagation()}
        className="w-full max-w-sm rounded-xl bg-[var(--surface)] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.16)]"
      >
        <h2 className="mb-2 text-[17px] font-semibold text-[var(--text)]">
          폴더 삭제
        </h2>
        <p className="mb-6 text-sm leading-relaxed text-[var(--text-sub)]">
          &lsquo;{folder.name}&rsquo; 폴더를 삭제하시겠습니까?
          <br />이 작업은 되돌릴 수 없습니다.
        </p>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="btn-outline rounded-full border border-[var(--border)] px-5 py-2 text-sm font-medium text-[var(--text)]"
          >
            취소
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="btn-danger rounded-full bg-[var(--error)] px-5 py-2 text-sm font-medium text-white"
          >
            삭제
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
