import type { Bookmark } from "@/lib/types";

type BookmarkCardProps = {
  bookmark: Bookmark;
};

export default function BookmarkCard({ bookmark }: BookmarkCardProps) {
  const domain = new URL(bookmark.url).hostname.replace("www.", "");

  return (
    <a
      href={bookmark.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col gap-2 rounded-xl border border-zinc-200 bg-white p-4 transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950"
    >
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-sm font-semibold text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
        {domain.charAt(0).toUpperCase()}
      </div>

      <p className="line-clamp-1 text-sm font-semibold text-zinc-900 dark:text-zinc-50">
        {bookmark.title}
      </p>
      <p className="line-clamp-1 text-xs text-zinc-400">{domain}</p>
      <p className="line-clamp-1 text-xs text-zinc-500 dark:text-zinc-400">
        {bookmark.description}
      </p>
    </a>
  );
}
