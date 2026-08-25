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
    <aside className="flex w-56 shrink-0 flex-col gap-1 border-r border-zinc-200 bg-white px-3 py-4 dark:border-zinc-800 dark:bg-zinc-950">
      <Link
        href="/"
        className={`rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
          pathname === "/"
            ? "bg-indigo-600 text-white"
            : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900"
        }`}
      >
        All
      </Link>

      <div className="mt-3 flex flex-col gap-1">
        <span className="px-3 text-xs font-semibold uppercase tracking-wide text-zinc-400">
          폴더
        </span>

        {folders.map((folder) => {
          const href = `/folder/${folder.id}`;
          const isActive = pathname === href;

          return (
            <Link
              key={folder.id}
              href={href}
              className={`flex items-center justify-between rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
                isActive
                  ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400"
                  : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900"
              }`}
            >
              <span>{folder.name}</span>
              <span className="text-xs text-zinc-400">{folder.count}</span>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
