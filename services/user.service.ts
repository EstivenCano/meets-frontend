import { get } from "./api/serviceClient";

export const getUser = async (url: string) => {
  try {
    const response = await get(url);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
