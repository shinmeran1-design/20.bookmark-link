import NewLinkForm from "@/components/new-link-form";
import { folders } from "@/lib/mock-data";

export default function NewLinkPage() {
  return (
    <>
      <h1 className="mb-6 text-lg font-semibold text-[var(--text)]">
        새 링크 추가
      </h1>
      <NewLinkForm folders={folders} />
    </>
  );
}
