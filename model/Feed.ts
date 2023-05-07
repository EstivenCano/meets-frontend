import { Post } from "./Post";
import { UserInfo } from "./UserInfo";

export interface Feed extends Post {
  author: UserInfo;
  likedBy: { id: number }[];
  _count: {
    likedBy: number;
    comments: number;
  };
}

export interface GetFeedRequest {
  searchString: string;
  page: number;
  perPage: number;
}
