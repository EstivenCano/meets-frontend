import { FC, useCallback, useEffect } from "react";
import useSWRImmutable from "swr/immutable";
import { ProfileImage } from "../ProfileImage";
import { getChats, socket } from "@/services/chat.service";
import { chatStore } from "@/stores/useChat.store";
import { FollowingList } from "./FollowingList";
import Skeleton from "@/components/Feedback/Skeleton";
import { match } from "ts-pattern";

interface ChatListProps {
  handleOpen: () => void;
}

export const ChatList: FC<ChatListProps> = ({ handleOpen }) => {
  const {
    data,
    isLoading,
    mutate: refreshChats,
  } = useSWRImmutable("/chat/all", getChats);

  const { chats, actualRoom, setChats, setActualRoom, setMessage } = chatStore(
    (state) => state
  );

  useEffect(() => {
    if (data) {
      setChats(data);
    }
  }, [data, setChats]);

  const handleConnection = useCallback(
    (event: string) => {
      if (chats) {
        chats.forEach((chat) => {
          socket?.emit(event, chat.name);
        });
      }
    },
    [chats]
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

  const handleClick = async (roomName: string) => {
    setActualRoom(roomName);
    handleOpen();
  };

  useEffect(() => {
    handleConnection("event_join");

    return () => {
      handleConnection("event_leave");
    };
  }, [handleConnection]);

  return (
    <aside className='w-full md:w-1/2 md:max-w-xs h-full border-r-2 border-gray-500/40'>
      <span className='flex p-4 bg-gray-500/10'>
        <h2>Your chats</h2>
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
                    {chat.participants.at(0)?.name || "Unknown"}
                  </p>
                  <p className='text-xs text-gray-400 truncate'>
                    {chat.messages.at(-1)?.content}
                  </p>
                </div>
              </li>
            ))}
            {chats.length === 0 && (
              <li className='flex items-center px-4 py-2 text-sm'>
                <p className='font-semibold'>No chats yet</p>
              </li>
            )}
          </ul>
        ))}
      <FollowingList refresh={refreshChats} />
    </aside>
  );
};
