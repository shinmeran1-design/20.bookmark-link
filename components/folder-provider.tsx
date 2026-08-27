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
  deleteFolder: (id: string) => void;
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

    const loadFolders = async () => {
      const { data, error } = await supabase
        .from("folders")
        .select("id, name")
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

    loadFolders();

    return () => {
      active = false;
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

  const deleteFolder = (id: string) => {
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
