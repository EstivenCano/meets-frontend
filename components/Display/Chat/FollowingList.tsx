import { userStore } from "@/stores/useUser.store";
import { FC, useCallback, useEffect, useId, useMemo, useState } from "react";
import useSWRImmutable from "swr/immutable";
import useSWRMutation from "swr/mutation";
import { ProfileImage } from "../ProfileImage";
import {
  createChat,
  getFollowingsToChat,
  socket,
} from "@/services/chat.service";
import { chatStore } from "@/stores/useChat.store";
import { v4 as uuidv4 } from "uuid";
import { match } from "ts-pattern";
import Skeleton from "@/components/Feedback/Skeleton";
import { KeyedMutator } from "swr";
import { ChatResponseDto } from "@/services/dto/get-chats.dto";
import { Loading } from "@/public/icons";

interface FollowingListProps {
  refresh: KeyedMutator<ChatResponseDto[]>;
}

export const FollowingList: FC<FollowingListProps> = ({ refresh }) => {
  const user = userStore((state) => state.user);
  const { actualRoom, setActualRoom } = chatStore();
  const [updating, setUpdating] = useState(false);

  const {
    data: following,
    isLoading,
    mutate,
  } = useSWRImmutable(`/chat/following-to-chat`, getFollowingsToChat);

  const { trigger } = useSWRMutation(`/chat`, createChat);

  const handleConnection = useCallback(
    (event: string) => {
      if (actualRoom) {
        socket?.emit(event, actualRoom);
      }
    },
    [actualRoom]
  );

  const handleClick = async (userId: number) => {
    const chatName = uuidv4();
    setUpdating(true);
    await trigger({
      name: chatName,
      userIds: [userId, Number(user?.id)],
    })
      .then(async () => {
        await refresh();
        await mutate();
        setActualRoom(chatName);
      })
      .finally(() => {
        setUpdating(false);
      });
  };

  useEffect(() => {
    handleConnection("event_join");

    return () => {
      handleConnection("event_leave");
    };
  }, [actualRoom, handleConnection]);

  return (
    <>
      <span className='flex p-4 bg-gray-500/10'>
        <h2>People you follow</h2>
      </span>
      <ul className='relative max-h-full overflow-y-auto'>
        {match(isLoading)
          .with(true, () => (
            <li className='flex flex-col gap-y-2 p-2'>
              <Skeleton type='likes' />
              <Skeleton type='likes' />
              <Skeleton type='likes' />
            </li>
          ))
          .otherwise(() => (
            <>
              {updating && (
                <li className='absolute flex items-center justify-center w-full h-full bg-gray-500/50'>
                  <Loading className='stroke-current w-10 h-10' />
                </li>
              )}
              {following?.map((user) => {
                return (
                  <li
                    onClick={() => handleClick(user.id)}
                    key={user.id}
                    className='flex items-center gap-x-2 px-4 py-2 text-sm focus:bg-violet-500 hover:bg-violet-500 cursor-pointer hover:text-white'>
                    <ProfileImage
                      src={user.profile.picture}
                      alt={user.name}
                      size='xxs'
                    />
                    <p className='font-semibold'>{user.name}</p>
                  </li>
                );
              })}
            </>
          ))}
      </ul>
    </>
  );
};
