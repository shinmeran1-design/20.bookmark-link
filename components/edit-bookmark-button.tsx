"use client";

import { useState } from "react";
import type { Bookmark } from "@/lib/types";
import { useBookmarks } from "@/components/bookmark-provider";
import EditBookmarkModal from "@/components/edit-bookmark-modal";

type BookmarkUpdate = {
  title: string;
  description: string;
  folderId: string;
};

type EditBookmarkButtonProps = {
  bookmark: Bookmark;
  className?: string;
};

export default function EditBookmarkButton({
  bookmark,
  className,
}: EditBookmarkButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { updateBookmark } = useBookmarks();

  const handleSave = (updates: BookmarkUpdate) => {
    updateBookmark(bookmark.id, updates);
    setIsOpen(false);
  };

  return (
    <>
      <button
        type="button"
        aria-label={`${bookmark.title} 링크 수정`}
        onClick={() => setIsOpen(true)}
        className={`card-edit-btn flex items-center justify-center rounded-full bg-white/90 text-[var(--text-sub)] shadow-[0_1px_4px_rgba(0,0,0,0.2)] backdrop-blur-sm ${
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
        <EditBookmarkModal
          bookmark={bookmark}
          onClose={() => setIsOpen(false)}
          onSave={handleSave}
        />
      )}
    </>
  );
}
