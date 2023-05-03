import { Post } from "./Post";

export interface UserInfo {
  name: string;
  id: number;
  profile: {
    picture: string;
  };
}

export interface Comment {
  id: number;
  author: UserInfo;
  content: string;
  createdAt: string;
}

export interface Feed extends Post {
  author: UserInfo;
  likedBy: UserInfo[];
  comments: Comment[];
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
