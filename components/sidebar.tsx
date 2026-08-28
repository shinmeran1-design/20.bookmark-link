"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useFolders } from "@/components/folder-provider";
import { useBookmarks } from "@/components/bookmark-provider";
import DeleteFolderButton from "@/components/delete-folder-button";
import EditFolderButton from "@/components/edit-folder-button";
import LogoutButton from "@/components/logout-button";

export default function Sidebar() {
  const pathname = usePathname();
  const { folders } = useFolders();
  const { bookmarks } = useBookmarks();

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
          const count = bookmarks.filter(
            (bookmark) => bookmark.folderId === folder.id
          ).length;

          return (
            <div
              key={folder.id}
              className={`folder-item group flex items-center justify-between rounded-full px-4 py-2 text-sm font-medium ${
                isActive
                  ? "bg-[var(--hover-bg)] text-[var(--accent)]"
                  : "text-[var(--text)]"
              }`}
            >
              <Link href={href} className="min-w-0 flex-1 truncate text-left">
                {folder.name}
              </Link>

              <span className="relative flex h-5 w-11 shrink-0 items-center justify-end">
                <span className="absolute right-0 text-xs text-[var(--text-sub)] transition-opacity group-hover:opacity-0">
                  {count}
                </span>
                <span className="absolute right-0 flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                  <EditFolderButton folder={folder} className="h-5 w-5" />
                  <DeleteFolderButton folder={folder} className="h-5 w-5" />
                </span>
              </span>
            </div>
          );
        })}
      </div>

      <LogoutButton />
    </aside>
  );
}
