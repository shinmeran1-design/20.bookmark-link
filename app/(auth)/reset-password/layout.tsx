import { pageMetadata } from "@/lib/site-metadata";

export const metadata = pageMetadata(
  "비밀번호 재설정",
  "새 비밀번호를 입력해 계정 비밀번호를 변경하세요."
);

export default function ResetPasswordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
