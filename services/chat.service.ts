import { io } from "socket.io-client";
import { get, post } from "./api/serviceClient";
import { ChatResponseDto } from "./dto/get-chats.dto";
import { UserInfo } from "@/model/UserInfo";

export const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL as string);

export const getChats = async (url: string) => {
  try {
    const response: { data: ChatResponseDto[]; status: number } = await get(
      url
    );
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const createChat = async (
  url: string,
  { arg }: { arg: { name: string; userIds: Array<number> } }
) => {
  try {
    const response = await post(url, arg);

    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getFollowingsToChat = async (url: string) => {
  try {
    const response: { data: UserInfo[]; status: number } = await get(url);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
