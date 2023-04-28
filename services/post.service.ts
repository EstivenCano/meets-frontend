import { post } from "./api/serviceClient";
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
