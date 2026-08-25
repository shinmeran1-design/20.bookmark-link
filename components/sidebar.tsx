"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Folder } from "@/lib/types";

type SidebarProps = {
  folders: Folder[];
};

export default function Sidebar({ folders }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="flex w-56 shrink-0 flex-col gap-1 border-r border-[var(--border)] px-3 py-4">
      <Link
        href="/"
        className={`nav-link rounded-md px-3 py-2 text-left text-sm font-medium ${
          pathname === "/"
            ? "bg-[var(--accent)] text-white"
            : "text-[var(--text)]"
        }`}
      >
        All
      </Link>

      <div className="mt-4 flex flex-col gap-1">
        <span className="px-3 text-xs font-semibold uppercase tracking-wide text-[var(--text-sub)]">
          폴더
        </span>

        {folders.map((folder) => {
          const href = `/folder/${folder.id}`;
          const isActive = pathname === href;

          return (
            <Link
              key={folder.id}
              href={href}
              className={`folder-item flex items-center justify-between rounded-md px-3 py-2 text-left text-sm font-medium ${
                isActive
                  ? "bg-[var(--hover-bg)] text-[var(--accent)]"
                  : "text-[var(--text)]"
              }`}
            >
              <span>{folder.name}</span>
              <span className="text-xs text-[var(--text-sub)]">
                {folder.count}
              </span>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
