import { pageMetadata } from "@/lib/site-metadata";

export const metadata = pageMetadata(
  "로그인",
  "Bookmark Link에 로그인해 내 링크와 폴더를 관리하세요."
);

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
