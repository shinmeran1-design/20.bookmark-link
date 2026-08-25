import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-12 shrink-0 items-center justify-between border-b border-[var(--border)] bg-[var(--surface)]/80 px-4 backdrop-blur-sm">
      <span className="text-base font-semibold tracking-tight text-[var(--text)]">
        🔖 Bookmark Link
      </span>

      <Link
        href="/new"
        className="btn-primary flex items-center gap-1.5 rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white"
      >
        <span className="text-base leading-none">+</span>새 링크
      </Link>
    </header>
  );
}
