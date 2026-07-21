export type BlogTocItem = {
  id: string;
  title: string;
  level: 2 | 3;
};

export interface BlogPost {
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  tags: string[];
  draft: boolean;
  cover: {
    src: string;
    alt: string;
  };
  content: string;
  slug: string;
  url: string;
  readingTimeMinutes: number;
  toc: BlogTocItem[];
  compiledContent: string;
  _meta: {
    filePath: string;
    fileName: string;
    directory: string;
    extension: string;
    path: string;
  };
}
