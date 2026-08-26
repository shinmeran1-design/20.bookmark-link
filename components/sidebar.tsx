"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useFolders } from "@/components/folder-provider";

export default function Sidebar() {
  const pathname = usePathname();
  const { folders } = useFolders();

  return (
    <aside className="flex w-56 shrink-0 flex-col gap-1 border-r border-[var(--divider)] px-4 py-6">
      <Link
        href="/"
        className={`nav-link rounded-full px-4 py-2 text-left text-sm font-medium ${
          pathname === "/"
            ? "bg-[var(--accent)] text-white"
            : "text-[var(--text)]"
        }`}
      >
        All
      </Link>

      <div className="mt-5 flex flex-col gap-1">
        {folders.map((folder) => {
          const href = `/folder/${folder.id}`;
          const isActive = pathname === href;

          return (
            <Link
              key={folder.id}
              href={href}
              className={`folder-item flex items-center justify-between rounded-full px-4 py-2 text-left text-sm font-medium ${
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
