import { Post } from "../model/Post";

interface UserInfo {
  name: string;
  id: number;
  profile: {
    picture: string;
  };
}

export interface GetFeedResponse extends Post {
  author: UserInfo;
  likedBy: { id: number }[];
  _count: {
    likedBy: number;
    comments: number;
  };
}

export interface GetFeedRequest {
  searchString: string;
  byAuthor?: number;
  page: number;
  perPage: number;
}
