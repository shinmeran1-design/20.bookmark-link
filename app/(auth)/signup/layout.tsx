import { pageMetadata } from "@/lib/site-metadata";

export const metadata = pageMetadata(
  "회원가입",
  "Bookmark Link 계정을 만들고 링크를 폴더별로 정리해 보세요."
);

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
