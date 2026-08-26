import NewLinkForm from "@/components/new-link-form";
import { folders } from "@/lib/mock-data";

export default function NewLinkPage() {
  return (
    <>
      <h1 className="mb-8 text-[24px] font-semibold tracking-[-0.3px] text-[var(--text)]">
        새 링크 추가
      </h1>
      <NewLinkForm folders={folders} />
    </>
  );
}
