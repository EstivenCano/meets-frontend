import { userStore } from "@/stores/useUser.store";
import { FC, useEffect, useState } from "react";
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
import { useTranslation } from "@/app/i18n/client";
import { UserInfo } from "@/model/UserInfo";

interface FollowingListProps {
  refresh: KeyedMutator<ChatResponseDto[]>;
}

export const FollowingList: FC<FollowingListProps> = ({ refresh }) => {
  const { t } = useTranslation("chat");
  const user = userStore((state) => state.user);
  const { actualRoom, setActualRoom } = chatStore();
  const [updating, setUpdating] = useState(false);

  const {
    data: following,
    isLoading,
    mutate,
  } = useSWRImmutable(`/chat/following-to-chat`, getFollowingsToChat, {
    errorRetryCount: 2,
    errorRetryInterval: 1000,
    revalidateOnMount: true,
  });

  const [followingList, setFollowingList] = useState<UserInfo[]>();

  const { trigger } = useSWRMutation(`/chat`, createChat);

  const handleClick = async (userId: number) => {
    const chatName = uuidv4();
    setUpdating(true);

    await trigger({
      name: chatName,
      userIds: [userId, Number(user?.id)],
    }).then(async () => {
      await refresh();
      setFollowingList(followingList?.filter((user) => user.id !== userId));
      socket?.emit("event_join", actualRoom);
      setActualRoom(chatName);
    });

    await mutate();
    setUpdating(false);
  };

  useEffect(() => {
    setFollowingList(following);
  }, [following]);

  return (
    <>
      <span className='flex p-4 bg-gray-500/10'>
        <h2>{t("peopleYouFollow")}</h2>
      </span>
      {followingList?.length === 0 && (
        <p className='text-sm px-4 py-2 font-bold'>{t("noUsersToChat")}</p>
      )}
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
              {followingList?.map((user) => {
                return (
                  <li
                    tabIndex={0}
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
