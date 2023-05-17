import { get, post, remove } from "./api/serviceClient";
import { GetCommentsResponse } from "./dto/get-comment.dto";
import { GetFeedRequest, GetFeedResponse } from "./dto/get-feed.dto";
import { GetLikesResponse } from "./dto/get-likes.dto";
import { NewCommentRequest } from "./dto/new-comment.dto";
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

export const getFirstFeed = async (byAuthor?: number) => {
  const cookies = (await import("next/headers"))?.cookies();

  const token = cookies.get("access_token");

  if (!token?.value) {
    return {
      data: undefined,
      status: 200,
      message: "No feed",
    };
  }

  try {
    const response: { data: GetFeedResponse[]; status: number } = await post(
      "/posts/feed",
      {
        searchString: "",
        page: 1,
        perPage: 15,
        byAuthor,
      },
      {
        Authorization: `Bearer ${token.value}`,
        cache: "no-store",
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

export const deletePostById = async (url: string) => {
  try {
    const response = await remove(url, {});
    return { ...response, message: "Post deleted" };
  } catch (error) {
    return Promise.reject(error);
  }
};

export const incrementViews = async (url: string) => {
  try {
    const response = await post(url, {});
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getComments = async (url: string) => {
  try {
    const response: { data: GetCommentsResponse; status: number } = await get(
      url
    );

    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getLikes = async (url: string) => {
  try {
    const response: { data: GetLikesResponse; status: number } = await get(url);

    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const newCommentToPost = async (
  url: string,
  { arg }: { arg: NewCommentRequest }
) => {
  try {
    const response = await post(url, arg);
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};
