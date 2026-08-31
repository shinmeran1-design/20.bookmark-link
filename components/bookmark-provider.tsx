"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { createClient } from "@/utils/supabase/client";
import type { Bookmark } from "@/lib/types";

type BookmarkUpdate = Pick<Bookmark, "title" | "description" | "folderId">;

type BookmarkContextValue = {
  bookmarks: Bookmark[];
  addBookmark: (bookmark: Omit<Bookmark, "id">) => Promise<void>;
  updateBookmark: (id: string, updates: BookmarkUpdate) => Promise<void>;
  deleteBookmark: (id: string) => Promise<void>;
};

const BookmarkContext = createContext<BookmarkContextValue | null>(null);

type BookmarkProviderProps = {
  initialBookmarks: Bookmark[];
  children: ReactNode;
};

type LinkRow = {
  id: number;
  url: string;
  title: string | null;
  description: string | null;
  thumnail_url: string | null;
  folder_id: number | null;
};

const rowToBookmark = (row: LinkRow): Bookmark => ({
  id: String(row.id),
  title: row.title ?? row.url,
  url: row.url,
  description: row.description ?? "",
  thumbnail: row.thumnail_url ?? undefined,
  folderId: row.folder_id != null ? String(row.folder_id) : "",
});

export default function BookmarkProvider({
  initialBookmarks,
  children,
}: BookmarkProviderProps) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(initialBookmarks);
  const [supabase] = useState(() => createClient());

  useEffect(() => {
    let active = true;
    let currentUserId: string | null = null;
    let initialized = false;

    const loadBookmarks = async (userId: string | null) => {
      // 로그인한 사용자가 없으면 목록을 비운다
      if (!userId) {
        if (active) setBookmarks([]);
        return;
      }

      const { data, error } = await supabase
        .from("links")
        .select("id, url, title, description, thumnail_url, folder_id")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (!active || error || !data) return;

      setBookmarks((data as LinkRow[]).map(rowToBookmark));
    };

    // 최초 세션(INITIAL_SESSION)과 이후 계정 변경(로그인/로그아웃/계정 전환)을 모두 처리한다
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const nextUserId = session?.user?.id ?? null;
      // 같은 사용자면(토큰 갱신 등) 다시 불러오지 않는다
      if (initialized && nextUserId === currentUserId) return;
      initialized = true;
      currentUserId = nextUserId;
      loadBookmarks(nextUserId);
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addBookmark = async (bookmark: Omit<Bookmark, "id">) => {
    const { data, error } = await supabase
      .from("links")
      .insert({
        url: bookmark.url,
        title: bookmark.title || null,
        description: bookmark.description || null,
        thumnail_url: bookmark.thumbnail ?? null,
        folder_id: bookmark.folderId ? Number(bookmark.folderId) : null,
      })
      .select("id, url, title, description, thumnail_url, folder_id")
      .single();

    if (error || !data) return;

    setBookmarks((prev) => [rowToBookmark(data as LinkRow), ...prev]);
  };

  const updateBookmark = async (id: string, updates: BookmarkUpdate) => {
    const { error } = await supabase
      .from("links")
      .update({
        title: updates.title || null,
        description: updates.description || null,
        folder_id: updates.folderId ? Number(updates.folderId) : null,
      })
      .eq("id", Number(id));

    if (error) return;

    setBookmarks((prev) =>
      prev.map((bookmark) =>
        bookmark.id === id ? { ...bookmark, ...updates } : bookmark
      )
    );
  };

  const deleteBookmark = async (id: string) => {
    const { error } = await supabase
      .from("links")
      .delete()
      .eq("id", Number(id));

    if (error) return;

    setBookmarks((prev) => prev.filter((bookmark) => bookmark.id !== id));
  };

  return (
    <BookmarkContext.Provider
      value={{ bookmarks, addBookmark, updateBookmark, deleteBookmark }}
    >
      {children}
    </BookmarkContext.Provider>
  );
}

export function useBookmarks() {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error("useBookmarks must be used within a BookmarkProvider");
  }
  return context;
}
