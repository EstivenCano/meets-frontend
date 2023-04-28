export interface NewPostType {
  title: string;
  content: string;
  authorEmail: string;
  published?: boolean;
}

export interface NewPostResponse {
  id: number;
  title: string;
  content: string;
  authorId: number;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}
