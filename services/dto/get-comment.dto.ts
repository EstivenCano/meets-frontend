import { UserInfo } from "../model/UserInfo";

export type GetCommentsResponse = Array<{
  id: number;
  createdAt: string;
  updatedAt: string;
  content: string;
  authorId: number;
  postId: number;
  author: UserInfo;
}>;
