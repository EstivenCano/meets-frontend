import { post } from "./api/serviceClient";
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

export const getFeed = async (
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

export const getFirstFeed = async () => {
  const nextCookies = (await import("next/headers")).cookies();

  const token = nextCookies.get("access_token");
  try {
    const response: { data: GetFeedResponse[]; status: number } = await post(
      "/posts/feed",
      {
        searchString: "",
        page: 1,
        perPage: 3,
      },
      {
        Authorization: `Bearer ${token?.value}`,
      }
    );
    return {
      ...response,
      message: "Feed retrieved",
    };
  } catch (error) {
    return Promise.reject(error);
  }
};

export const likeUnlikePost = async (url: string) => {
  try {
    const response = await post(url, {});
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};
