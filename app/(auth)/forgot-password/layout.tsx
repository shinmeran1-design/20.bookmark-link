import { pageMetadata } from "@/lib/site-metadata";

export const metadata = pageMetadata(
  "비밀번호 찾기",
  "가입한 이메일로 비밀번호 재설정 링크를 받아보세요."
);

export default function ForgotPasswordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
