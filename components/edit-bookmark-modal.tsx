"use client";

import { useEffect, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";
import type { Bookmark } from "@/lib/types";
import { useFolders } from "@/components/folder-provider";

type BookmarkUpdate = {
  title: string;
  description: string;
  folderId: string;
};

type EditBookmarkModalProps = {
  bookmark: Bookmark;
  onClose: () => void;
  onSave: (updates: BookmarkUpdate) => void;
};

export default function EditBookmarkModal({
  bookmark,
  onClose,
  onSave,
}: EditBookmarkModalProps) {
  const { folders } = useFolders();
  const [title, setTitle] = useState(bookmark.title);
  const [description, setDescription] = useState(bookmark.description);
  const [folderId, setFolderId] = useState(bookmark.folderId);

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
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;

    onSave({
      title: trimmedTitle,
      description: description.trim(),
      folderId,
    });
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
          링크 수정
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="edit-bookmark-folder"
              className="text-sm font-medium text-[var(--text)]"
            >
              폴더
            </label>
            <select
              id="edit-bookmark-folder"
              value={folderId}
              onChange={(event) => setFolderId(event.target.value)}
              className="rounded-[10px] border border-[var(--border)] bg-white px-4 py-3 text-[17px] text-[var(--text)] outline-none focus:border-[var(--accent)] focus:shadow-[0_0_0_3px_rgba(0,113,227,0.2)]"
            >
              {folders.map((folder) => (
                <option key={folder.id} value={folder.id}>
                  {folder.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="edit-bookmark-title"
              className="text-sm font-medium text-[var(--text)]"
            >
              제목
            </label>
            <input
              id="edit-bookmark-title"
              type="text"
              required
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="rounded-[10px] border border-[var(--border)] bg-white px-4 py-3 text-[17px] text-[var(--text)] placeholder-[var(--placeholder)] outline-none focus:border-[var(--accent)] focus:shadow-[0_0_0_3px_rgba(0,113,227,0.2)]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="edit-bookmark-description"
              className="text-sm font-medium text-[var(--text)]"
            >
              설명
            </label>
            <textarea
              id="edit-bookmark-description"
              rows={3}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              className="resize-none rounded-[10px] border border-[var(--border)] bg-white px-4 py-3 text-[15px] text-[var(--text)] placeholder-[var(--placeholder)] outline-none focus:border-[var(--accent)] focus:shadow-[0_0_0_3px_rgba(0,113,227,0.2)]"
            />
          </div>

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
