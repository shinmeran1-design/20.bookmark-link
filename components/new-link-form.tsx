"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useFolders } from "@/components/folder-provider";
import { useBookmarks } from "@/components/bookmark-provider";
import type { OpenGraphData } from "@/lib/types";

export default function NewLinkForm() {
  const router = useRouter();
  const { folders } = useFolders();
  const { addBookmark } = useBookmarks();
  const [url, setUrl] = useState("");
  const [folderId, setFolderId] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  // folders are loaded async; fall back to the first folder until the user picks one
  const selectedFolderId = folderId || folders[0]?.id || "";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedFolderId || isSaving) return;

    setIsSaving(true);
    setError("");

    try {
      const response = await fetch(`/api/og?url=${encodeURIComponent(url)}`);

      if (!response.ok) {
        throw new Error("Failed to fetch link info");
      }

      const og: OpenGraphData = await response.json();

      await addBookmark({
        title: og.title || url,
        description: og.description,
        thumbnail: og.image || undefined,
        url: og.url || url,
        folderId: selectedFolderId,
      });

      router.push(`/folder/${selectedFolderId}`);
    } catch {
      setError("링크 정보를 가져오지 못했습니다. 잠시 후 다시 시도해 주세요.");
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex max-w-md flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label
          htmlFor="url"
          className="text-sm font-medium text-[var(--text)]"
        >
          링크 주소
        </label>
        <input
          id="url"
          type="url"
          required
          placeholder="https://example.com"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          className="rounded-[10px] border border-[var(--border)] bg-white px-4 py-3 text-[17px] text-[var(--text)] placeholder-[var(--placeholder)] outline-none focus:border-[var(--accent)] focus:shadow-[0_0_0_3px_rgba(0,113,227,0.2)]"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="folder"
          className="text-sm font-medium text-[var(--text)]"
        >
          폴더
        </label>
        <select
          id="folder"
          value={selectedFolderId}
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

      {error && <p className="text-sm text-[var(--error)]">{error}</p>}

      <button
        type="submit"
        disabled={isSaving}
        className="btn-primary self-start rounded-full bg-[var(--accent)] px-6 py-3 text-[17px] font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
      >
        {isSaving ? "저장 중..." : "저장"}
      </button>
    </form>
  );
}
