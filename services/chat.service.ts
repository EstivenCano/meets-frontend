import { io } from "socket.io-client";
import { get, post, put } from "./api/serviceClient";
import { ChatResponseDto } from "./dto/get-chats.dto";
import { UserInfo } from "@/model/UserInfo";

export const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL as string, {
  transports: ["websocket"],
});

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

export const loadMessages = async (
  url: string,
  { arg }: { arg: { chatName: string; page: number; perPage: number } }
) => {
  try {
    const response = await post(url, arg);
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateNewMessages = async (
  url: string,
  { arg }: { arg: { chatName: string } }
) => {
  try {
    const response = await put(url, arg);
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const newMessagesCount = async (
  url: string,
  { arg }: { arg: { chatName: string } }
) => {
  try {
    const response: { data: number; status: number } = await get(url, arg);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
