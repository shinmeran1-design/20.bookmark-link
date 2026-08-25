import type { Bookmark, Folder } from "@/lib/types";

export const folders: Folder[] = [
  { id: "work", name: "업무", count: 3 },
  { id: "dev", name: "개발", count: 4 },
  { id: "design", name: "디자인", count: 2 },
  { id: "study", name: "학습", count: 2 },
];

export const bookmarks: Bookmark[] = [
  {
    id: "1",
    title: "Next.js 공식 문서",
    url: "https://nextjs.org/docs",
    description: "React 기반 풀스택 프레임워크 Next.js의 공식 개발 문서",
    folderId: "dev",
  },
  {
    id: "2",
    title: "React 공식 문서",
    url: "https://react.dev",
    description: "UI 라이브러리 React의 공식 학습 및 레퍼런스 사이트",
    folderId: "dev",
  },
  {
    id: "3",
    title: "Tailwind CSS",
    url: "https://tailwindcss.com",
    description: "유틸리티 클래스 기반의 CSS 프레임워크",
    folderId: "dev",
  },
  {
    id: "4",
    title: "GitHub",
    url: "https://github.com",
    description: "코드 저장 및 협업을 위한 버전 관리 플랫폼",
    folderId: "dev",
  },
  {
    id: "5",
    title: "Figma",
    url: "https://figma.com",
    description: "브라우저 기반 협업 UI/UX 디자인 툴",
    folderId: "design",
  },
  {
    id: "6",
    title: "Dribbble",
    url: "https://dribbble.com",
    description: "디자이너들의 작업물을 공유하는 포트폴리오 커뮤니티",
    folderId: "design",
  },
  {
    id: "7",
    title: "Notion",
    url: "https://notion.so",
    description: "문서, 메모, 협업을 한곳에서 관리하는 올인원 워크스페이스",
    folderId: "work",
  },
  {
    id: "8",
    title: "Slack",
    url: "https://slack.com",
    description: "팀 커뮤니케이션을 위한 메신저 협업 툴",
    folderId: "work",
  },
  {
    id: "9",
    title: "Google Calendar",
    url: "https://calendar.google.com",
    description: "일정과 미팅을 관리하는 구글 캘린더 서비스",
    folderId: "work",
  },
  {
    id: "10",
    title: "MDN Web Docs",
    url: "https://developer.mozilla.org",
    description: "HTML, CSS, JavaScript 등 웹 표준 기술 레퍼런스",
    folderId: "study",
  },
  {
    id: "11",
    title: "TypeScript Handbook",
    url: "https://www.typescriptlang.org/docs",
    description: "TypeScript 문법과 타입 시스템을 설명하는 공식 가이드",
    folderId: "study",
  },
];
