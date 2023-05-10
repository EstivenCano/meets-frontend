import { get, post, put, remove } from "./api/serviceClient";
import { UpdateUserProfileRequest } from "./dto/update-user-profile.dto";
import { UserProfileResponse } from "./dto/user-profile.dto";
import { UserInfo } from "../model/UserInfo";
import { removeTokens } from "@/utils/removeTokens";

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

export const updateUserProfile = async (
  url: string,
  { arg }: { arg: UpdateUserProfileRequest }
) => {
  try {
    const response = await put(url, arg);
    return response;
  } catch (error) {
    throw error;
  }
};

export const isFollowingUser = async (url: string) => {
  try {
    const response: { data: boolean; status: number } = await get(url);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const followUnfollowUser = async (url: string) => {
  try {
    const response = await post(url, {});
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const searchUsers = async (url: string, { arg }: { arg: string }) => {
  try {
    const response: { data: UserInfo[]; status: number } = await get(
      `${url}/${arg}`
    );
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteUser = async (
  url: string,
  { arg }: { arg: { password: string } }
) => {
  try {
    const response = await remove(url, arg);
    await removeTokens();
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};
