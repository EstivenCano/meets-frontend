import { Post } from "../model/Post";

interface UserInfo {
  name: string;
  profile: {
    picture: string;
  };
}

export interface GetFeedResponse extends Post {
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
