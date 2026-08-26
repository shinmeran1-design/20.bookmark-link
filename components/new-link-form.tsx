"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import type { Folder } from "@/lib/types";

type NewLinkFormProps = {
  folders: Folder[];
};

export default function NewLinkForm({ folders }: NewLinkFormProps) {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [folderId, setFolderId] = useState(folders[0]?.id ?? "");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push("/");
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

      <button
        type="submit"
        className="btn-primary self-start rounded-full bg-[var(--accent)] px-6 py-3 text-[17px] font-medium text-white"
      >
        저장
      </button>
    </form>
  );
}
