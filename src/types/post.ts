export interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  excerpt: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
}

export interface CreatePostData {
  title: string;
  content: string;
  author: string;
  excerpt: string;
  tags: string[];
}

export interface UpdatePostData extends Partial<CreatePostData> {
  id: string;
}
