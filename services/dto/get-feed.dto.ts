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
  page: number;
  perPage: number;
}
