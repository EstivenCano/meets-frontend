import { get, put } from "./api/serviceClient";
import { UpdateUserProfileRequest } from "./dto/update-user-profile.dto";
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
    const response = await get("/users/current-user", {
      Authorization: `Bearer ${token?.value}`,
    });
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
      }
    );

    return response.data;
  } catch (err) {
    throw err;
  }
};

export const updateUserProfile = async (
  url: string,
  { arg }: { arg: UpdateUserProfileRequest }
) => {
  try {
    const response = await put(url, arg);
    return { ...response, message: "Profile updated successfully" };
  } catch (error) {
    throw error;
  }
};
