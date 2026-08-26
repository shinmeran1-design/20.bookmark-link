import Link from "next/link";
import NewFolderButton from "@/components/new-folder-button";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-12 shrink-0 items-center justify-between border-b border-[var(--divider)] bg-white/[0.72] px-6 backdrop-blur-xl backdrop-saturate-[1.8]">
      <span className="text-[17px] font-semibold tracking-tight text-[var(--text)]">
        🔖 Bookmark Link
      </span>

      <div className="flex items-center gap-2">
        <NewFolderButton />

        <Link
          href="/new"
          className="btn-primary flex items-center gap-1.5 rounded-full bg-[var(--accent)] px-5 py-2 text-sm font-medium text-white"
        >
          <span className="text-base leading-none">+</span>새 링크
        </Link>
      </div>
    </header>
  );
}
