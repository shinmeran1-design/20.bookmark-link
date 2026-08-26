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
  thumbnail?: string;
  folderId: string;
};

export type OpenGraphData = {
  title: string;
  description: string;
  image: string;
  url: string;
};
