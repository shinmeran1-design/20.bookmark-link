"use client";

import { useState } from "react";
import type { Bookmark } from "@/lib/types";
import { useBookmarks } from "@/components/bookmark-provider";
import DeleteBookmarkModal from "@/components/delete-bookmark-modal";

type DeleteBookmarkButtonProps = {
  bookmark: Bookmark;
  className?: string;
};

export default function DeleteBookmarkButton({
  bookmark,
  className,
}: DeleteBookmarkButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { deleteBookmark } = useBookmarks();

  const handleConfirm = async () => {
    await deleteBookmark(bookmark.id);
    setIsOpen(false);
  };

  return (
    <>
      <button
        type="button"
        aria-label={`${bookmark.title} 링크 삭제`}
        onClick={() => setIsOpen(true)}
        className={`card-delete-btn flex items-center justify-center rounded-full bg-white/90 text-[var(--text-sub)] shadow-[0_1px_4px_rgba(0,0,0,0.2)] backdrop-blur-sm ${
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
        <DeleteBookmarkModal
          bookmark={bookmark}
          onClose={() => setIsOpen(false)}
          onConfirm={handleConfirm}
        />
      )}
    </>
  );
}
