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
      className="card-hover flex flex-col gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4"
    >
      <div className="flex h-9 w-9 items-center justify-center rounded-md bg-[var(--hover-bg)] text-sm font-semibold text-[var(--accent)]">
        {domain.charAt(0).toUpperCase()}
      </div>

      <p className="line-clamp-1 text-sm font-semibold text-[var(--text)]">
        {bookmark.title}
      </p>
      <p className="line-clamp-1 text-xs text-[var(--text-sub)]">{domain}</p>
      <p className="line-clamp-1 text-xs text-[var(--text-sub)]">
        {bookmark.description}
      </p>
    </a>
  );
}
