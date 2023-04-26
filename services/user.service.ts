import { get } from "./api/serviceClient";
import { UserProfileResponse } from "./dto/user-profile.dto";

export const getUser = async (url: string) => {
  try {
    const response = await get(url);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getUserFromServer = async () => {
  const nextCookies = (await import("next/headers")).cookies();

  const token = nextCookies.get("access_token");

  try {
    const response = await get(
      "/users/current-user",
      {
        Authorization: `Bearer ${token?.value}`,
      },
      {
        cache: "no-cache",
      }
    );
    return response.data;
  } catch (err: any) {
    return null;
  }
};

export const getUserProfileFromServer = async (id: string) => {
  const nextCookies = (await import("next/headers")).cookies();

  const token = nextCookies.get("access_token");

  try {
    const response: { data: UserProfileResponse; status: number } = await get(
      `/users/${id}/profile`,
      {
        Authorization: `Bearer ${token?.value}`,
      },
      {
        cache: "no-cache",
      }
    );

    return response.data;
  } catch (err) {
    throw err;
  }
};
