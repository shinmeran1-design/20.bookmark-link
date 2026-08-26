"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { Folder } from "@/lib/types";

type FolderContextValue = {
  folders: Folder[];
  addFolder: (name: string) => void;
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

  return (
    <FolderContext.Provider value={{ folders, addFolder }}>
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
