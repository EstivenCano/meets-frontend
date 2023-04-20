import { post } from "./api/serviceClient";

export const login = async (
  url: string,
  { arg }: { arg: { email: string; password: string } }
) => {
  try {
    const response = await post(url, arg);

    localStorage.setItem("access_token", response.access_token);
    localStorage.setItem("refresh_token", response.refresh_token);

    return response;
  } catch (error) {
    throw error;
  }
};
