import { pageMetadata } from "@/lib/site-metadata";
import NewLinkForm from "@/components/new-link-form";

export const metadata = pageMetadata(
  "새 링크 추가",
  "새로운 링크를 저장하고 폴더로 분류하세요."
);

export default function NewLinkPage() {
  return (
    <>
      <h1 className="mb-8 text-[24px] font-semibold tracking-[-0.3px] text-[var(--text)]">
        새 링크 추가
      </h1>
      <NewLinkForm />
    </>
  );
}
