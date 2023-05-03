import { Post } from "./Post";

export interface UserInfo {
  name: string;
  id: number;
  profile: {
    picture: string;
  };
}

export interface Feed extends Post {
  author: UserInfo;
  likedBy: UserInfo[];
  comments: {
    author: UserInfo;
    content: string;
  }[];
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
