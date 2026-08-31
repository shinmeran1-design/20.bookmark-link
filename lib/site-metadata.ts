import type { Metadata } from "next";

export const SITE_NAME = "Bookmark Link";
export const SITE_TITLE = "Bookmark Link · 링크를 폴더별로 모아 관리하세요";
export const SITE_DESCRIPTION = "링크를 폴더별로 모아 관리하는 북마크 서비스";

// 절대 URL이 필요한 메타 필드(og:image 등)의 기준 주소.
// 배포 환경에서는 NEXT_PUBLIC_SITE_URL 을 설정한다.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const OG_IMAGE = {
  url: "/thumbnail.png",
  width: 2400,
  height: 1260,
  alt: `${SITE_NAME} 미리보기`,
};

// openGraph / twitter 는 상위-하위 세그먼트 간에 깊은 병합이 되지 않으므로
// 페이지마다 공통 값을 다시 펼쳐 넣는다.
const ogBase = {
  type: "website",
  siteName: SITE_NAME,
  locale: "ko_KR",
  url: SITE_URL,
  images: [OG_IMAGE],
} satisfies Metadata["openGraph"];

const twitterBase = {
  card: "summary_large_image",
  images: ["/thumbnail.png"],
} satisfies Metadata["twitter"];

// 모든 route group 레이아웃이 공유하는 기본 메타데이터.
// (이 프로젝트는 route group 별로 최상위 레이아웃이 나뉘어 있어 루트 layout.tsx 가 없다)
export const baseMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: {
    default: SITE_TITLE,
    // 하위 페이지에서 title 을 지정하면 "페이지명 · Bookmark Link" 형태로 렌더된다
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: { ...ogBase, title: SITE_TITLE, description: SITE_DESCRIPTION },
  twitter: { ...twitterBase, title: SITE_TITLE, description: SITE_DESCRIPTION },
};

// 하위 페이지용: 공유 OG/Twitter 설정(썸네일 등)을 유지하면서 제목·설명만 교체한다.
export function pageMetadata(
  title: string,
  description: string = SITE_DESCRIPTION
): Metadata {
  return {
    title,
    description,
    openGraph: { ...ogBase, title, description },
    twitter: { ...twitterBase, title, description },
  };
}
