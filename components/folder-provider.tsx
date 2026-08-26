"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { Folder } from "@/lib/types";

type FolderContextValue = {
  folders: Folder[];
  addFolder: (name: string) => void;
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

  const addFolder = (name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;

    const newFolder: Folder = {
      id: `folder-${Date.now()}`,
      name: trimmed,
      count: 0,
    };

    setFolders((prev) => [...prev, newFolder]);
  };

  const deleteFolder = (id: string) => {
    setFolders((prev) => prev.filter((folder) => folder.id !== id));
  };

  return (
    <FolderContext.Provider value={{ folders, addFolder, deleteFolder }}>
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
