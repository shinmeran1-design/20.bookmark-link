"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { createClient } from "@/utils/supabase/client";
import type { Folder } from "@/lib/types";

type FolderContextValue = {
  folders: Folder[];
  addFolder: (name: string) => Promise<void>;
  renameFolder: (id: string, name: string) => Promise<void>;
  deleteFolder: (id: string) => Promise<void>;
};

const FolderContext = createContext<FolderContextValue | null>(null);

type FolderProviderProps = {
  initialFolders: Folder[];
  children: ReactNode;
};

export default function FolderProvider({
  initialFolders,
  children,
}: FolderProviderProps) {
  const [folders, setFolders] = useState<Folder[]>(initialFolders);
  const [supabase] = useState(() => createClient());

  useEffect(() => {
    let active = true;
    let currentUserId: string | null = null;
    let initialized = false;

    const loadFolders = async (userId: string | null) => {
      // 로그인한 사용자가 없으면 목록을 비운다
      if (!userId) {
        if (active) setFolders([]);
        return;
      }

      const { data, error } = await supabase
        .from("folders")
        .select("id, name")
        .eq("user_id", userId)
        .order("created_at", { ascending: true });

      if (!active || error || !data) return;

      setFolders(
        data.map((row) => ({
          id: String(row.id),
          name: row.name,
          count: 0,
        }))
      );
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
      loadFolders(nextUserId);
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addFolder = async (name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;

    const { data, error } = await supabase
      .from("folders")
      .insert({ name: trimmed })
      .select("id, name")
      .single();

    if (error || !data) return;

    const newFolder: Folder = {
      id: String(data.id),
      name: data.name,
      count: 0,
    };

    setFolders((prev) => [...prev, newFolder]);
  };

  const renameFolder = async (id: string, name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;

    const { error } = await supabase
      .from("folders")
      .update({ name: trimmed })
      .eq("id", Number(id));

    if (error) return;

    setFolders((prev) =>
      prev.map((folder) =>
        folder.id === id ? { ...folder, name: trimmed } : folder
      )
    );
  };

  const deleteFolder = async (id: string) => {
    const { error } = await supabase
      .from("folders")
      .delete()
      .eq("id", Number(id));

    if (error) return;

    setFolders((prev) => prev.filter((folder) => folder.id !== id));
  };

  return (
    <FolderContext.Provider
      value={{ folders, addFolder, renameFolder, deleteFolder }}
    >
      {children}
    </FolderContext.Provider>
  );
}

export function useFolders() {
  const context = useContext(FolderContext);
  if (!context) {
    throw new Error("useFolders must be used within a FolderProvider");
  }
  return context;
}
