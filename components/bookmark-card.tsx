import type { Bookmark } from "@/lib/types";
import EditBookmarkButton from "@/components/edit-bookmark-button";
import DeleteBookmarkButton from "@/components/delete-bookmark-button";

type BookmarkCardProps = {
  bookmark: Bookmark;
};

export default function BookmarkCard({ bookmark }: BookmarkCardProps) {
  const domain = new URL(bookmark.url).hostname.replace("www.", "");

  return (
    <div className="group relative">
      <a
        href={bookmark.url}
        target="_blank"
        rel="noopener noreferrer"
        className="card-hover flex flex-col overflow-hidden rounded-xl bg-[var(--surface)] shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
      >
        {bookmark.thumbnail && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={bookmark.thumbnail}
            alt=""
            loading="lazy"
            referrerPolicy="no-referrer"
            className="h-28 w-full object-cover"
          />
        )}

        <div className="flex flex-col gap-3 p-6">
          {!bookmark.thumbnail && (
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--hover-bg)] text-sm font-semibold text-[var(--accent)]">
              {domain.charAt(0).toUpperCase()}
            </div>
          )}

          <p className="line-clamp-1 text-sm font-semibold text-[var(--text)]">
            {bookmark.title}
          </p>
          <p className="line-clamp-1 text-xs text-[var(--text-sub)]">
            {domain}
          </p>
          <p className="line-clamp-1 text-xs text-[var(--text-sub)]">
            {bookmark.description}
          </p>
        </div>
      </a>

      <div className="absolute right-3 top-3 z-10 flex items-center gap-1.5 opacity-0 transition-opacity group-hover:opacity-100">
        <EditBookmarkButton bookmark={bookmark} className="h-7 w-7" />
        <DeleteBookmarkButton bookmark={bookmark} className="h-7 w-7" />
      </div>
    </div>
  );
}
