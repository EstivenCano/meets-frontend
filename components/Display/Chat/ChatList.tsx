import { FC, useCallback, useEffect } from "react";
import useSWRImmutable from "swr/immutable";
import { getChats, socket } from "@/services/chat.service";
import { chatStore } from "@/stores/useChat.store";
import { FollowingList } from "./FollowingList";
import Skeleton from "@/components/Feedback/Skeleton";
import { match } from "ts-pattern";
import { useTranslation } from "@/app/i18n/client";
import { ChatItem } from "./ChatItem";

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
    revalidateOnMount: true,
  });

  const { chats, setChats, setMessage } = chatStore();

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
      setMessage(message);
    },
    [setMessage]
  );

  useEffect(() => {
    socket?.on("new_message", messageListener);

    return () => {
      socket?.off("new_message", messageListener);
    };
  }, [messageListener]);

  useEffect(() => {
    handleConnection("event_join");

    socket.on("connect", () => handleConnection("event_join"));
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
              <ChatItem
                key={chat.id}
                handleOpen={handleOpen}
                picture={chat.participants.at(0)?.profile.picture}
                name={chat.participants.at(0)?.name}
                chatName={chat.name}
                lastMessage={chat.messages.at(0)?.content}
              />
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
