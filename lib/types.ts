export type Folder = {
  id: string;
  name: string;
  count: number;
};

export type Bookmark = {
  id: string;
  title: string;
  url: string;
  description: string;
  folderId: string;
};
