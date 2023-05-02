import { get, post } from "./api/serviceClient";
import { GetFeedRequest, GetFeedResponse } from "./dto/get-feed.dto";
import { NewPostResponse, NewPostType } from "./dto/new-post.dto";

export const createDraft = async (
  url: string,
  { arg }: { arg: NewPostType }
) => {
  try {
    const response: { data: NewPostResponse; status: number } = await post(
      url,
      arg
    );
    return {
      ...response,
      message: arg.published ? "Post published" : "Draft saved",
    };
  } catch (error) {
    return Promise.reject(error);
  }
};

export const GetFeed = async (
  url: string,
  { arg }: { arg: GetFeedRequest }
) => {
  try {
    const response: { data: GetFeedResponse[]; status: number } = await post(
      url,
      arg
    );
    return {
      ...response,
      message: "Feed retrieved",
    };
  } catch (error) {
    return Promise.reject(error);
  }
};
