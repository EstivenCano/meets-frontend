import { FC, useCallback, useEffect, useState } from "react";
import useSWRImmutable from "swr/immutable";
import { ProfileImage } from "../ProfileImage";
import { getChats, socket } from "@/services/chat.service";
import { chatStore } from "@/stores/useChat.store";
import { FollowingList } from "./FollowingList";
import Skeleton from "@/components/Feedback/Skeleton";
import { match } from "ts-pattern";
import { userStore } from "@/stores/useUser.store";
import { useTranslation } from "@/app/i18n/client";

interface ChatListProps {
  handleOpen: () => void;
}

export const ChatList: FC<ChatListProps> = ({ handleOpen }) => {
  const { t } = useTranslation("chat");
  const {
    data,
    isLoading,
    mutate: refreshChats,
  } = useSWRImmutable("/chat/all", getChats, {
    errorRetryCount: 2,
    errorRetryInterval: 1000,
  });

  const user = userStore((state) => state.user);

  const { chats, actualRoom, setChats, setActualRoom, setMessage } = chatStore(
    (state) => state
  );

  const [newMessage, setNewMessage] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (data) {
      setChats(data);
    }
  }, [data, setChats]);

  const handleConnection = useCallback(
    (event: string) => {
      if (data) {
        data.forEach((chat) => {
          socket?.emit(event, chat.name);
        });
      }
    },
    [data]
  );

  const messageListener = useCallback(
    (message: {
      chatName: string;
      content: string;
      authorId: number;
      createdAt: string;
    }) => {
      if (
        message.authorId !== Number(user?.id) &&
        actualRoom !== message.chatName
      ) {
        setNewMessage((prevState) => prevState.add(message.chatName));
      }
      setMessage(message);
    },
    [setMessage, user, actualRoom]
  );

  const handleClick = async (roomName: string) => {
    const tempSet = new Set(newMessage);
    tempSet.delete(roomName);
    setActualRoom(roomName);
    handleOpen();
    setNewMessage(tempSet);
  };

  useEffect(() => {
    socket?.on("new_message", messageListener);

    return () => {
      socket?.off("new_message", messageListener);
    };
  }, [messageListener]);

  useEffect(() => {
    handleConnection("event_join");
  }, [handleConnection]);

  return (
    <aside className='w-full md:w-1/2 md:max-w-sm h-full border-r-2 border-gray-500/40'>
      <span className='flex p-4 bg-gray-500/10'>
        <h2>{t("yourChats")}</h2>
      </span>
      {match(isLoading)
        .with(true, () => (
          <div className='flex flex-col gap-y-2 p-2'>
            <Skeleton type='likes' />
            <Skeleton type='likes' />
            <Skeleton type='likes' />
          </div>
        ))
        .otherwise(() => (
          <ul className='flex flex-col'>
            {chats?.map((chat) => (
              <li
                key={chat.id}
                onClick={() => handleClick(chat.name)}
                className={`flex items-center gap-x-2 px-4 py-2 text-sm focus:bg-violet-500 hover:bg-violet-500 cursor-pointer hover:text-white ${
                  actualRoom === chat.name && "bg-violet-500/30"
                }`}>
                <ProfileImage
                  src={chat.participants.at(0)?.profile.picture || ""}
                  alt={chat.participants.at(0)?.name || "Profile image"}
                  size='xxs'
                />
                <div className='overflow-hidden w-3/4'>
                  <p className='font-semibold'>
                    {chat.participants.at(0)?.name || t("unknown")}
                  </p>
                  <p
                    className={`text-xs text-gray-400 truncate ${
                      newMessage.has(chat.name) && "text-text"
                    }`}>
                    {chat.messages.at(0)?.content}
                  </p>
                </div>
                {newMessage.has(chat.name) && (
                  <span className='w-2 h-2 ml-auto rounded-full bg-current animate-[pulse_2s_ease-in-out_infinite]'></span>
                )}
              </li>
            ))}
            {chats.length === 0 && (
              <li className='flex items-center px-4 py-2 text-sm'>
                <p className='font-semibold'>{t("noChatsYet")}</p>
              </li>
            )}
          </ul>
        ))}
      <FollowingList refresh={refreshChats} />
    </aside>
  );
};
