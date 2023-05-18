import {
  DetailedHTMLProps,
  FC,
  LiHTMLAttributes,
  useCallback,
  useEffect,
  useState,
} from "react";
import { ProfileImage } from "../ProfileImage";
import { useTranslation } from "@/app/i18n/client";
import useSWRMutation from "swr/mutation";
import {
  newMessagesCount,
  socket,
  updateNewMessages,
} from "@/services/chat.service";
import { chatStore } from "@/stores/useChat.store";
import { userStore } from "@/stores/useUser.store";

interface ChatItemProps {
  picture?: string;
  name?: string;
  chatName: string;
  lastMessage?: string;
  handleOpen: () => void;
}

export const ChatItem: FC<
  ChatItemProps &
    DetailedHTMLProps<LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>
> = ({ picture, name, chatName, lastMessage, handleOpen, ...props }) => {
  const { t } = useTranslation("chats");
  const userId = userStore((state) => state.user)?.id;
  const { actualRoom, setActualRoom } = chatStore();
  const [count, setCount] = useState(0);

  const { data, trigger: fetchCount } = useSWRMutation(
    `/chat/new-messages-count/${chatName}`,
    newMessagesCount
  );

  const { trigger: fetchUpdateCount } = useSWRMutation(
    "/chat/update-new-messages",
    updateNewMessages
  );

  useEffect(() => {
    setCount(data || 0);
  }, [data]);

  useEffect(() => {
    fetchCount({ chatName });
  }, [fetchCount, chatName]);

  const hasNewMessages = (count || 0) > 0;

  const handleNewMessage = useCallback(
    (message: { chatName: string; authorId: number }) => {
      if (chatName === actualRoom) {
        fetchUpdateCount({ chatName });
        setCount(0);
      }
      if (
        chatName === message.chatName &&
        chatName !== actualRoom &&
        message.authorId !== Number(userId)
      ) {
        setCount((prevState) => prevState + 1);
      }
    },
    [actualRoom, fetchUpdateCount, chatName, setCount, userId]
  );

  const handleClick = () => {
    setActualRoom(chatName);
    handleOpen();
    if (hasNewMessages) {
      fetchUpdateCount({ chatName });
      setCount(0);
    }
  };

  useEffect(() => {
    socket?.on("new_message", handleNewMessage);

    return () => {
      socket?.off("new_message", handleNewMessage);
    };
  }, [handleNewMessage]);

  return (
    <li
      tabIndex={0}
      onClick={handleClick}
      className={`flex items-center gap-x-2 px-4 py-2 text-sm focus:bg-violet-500 hover:bg-violet-500 cursor-pointer hover:text-white ${
        actualRoom === chatName && "bg-violet-500/30"
      } `}
      {...props}>
      <ProfileImage
        src={picture || ""}
        alt={name || "Profile image"}
        size='xxs'
      />
      <div className='overflow-hidden w-3/4'>
        <p className='font-semibold'>{name || t("unknown")}</p>
        <p
          className={`text-xs text-gray-400 truncate ${
            hasNewMessages && "text-text"
          }`}>
          {lastMessage}
        </p>
      </div>
      {hasNewMessages && (
        <span className='flex items-center justify-center w-4 h-4 ml-auto rounded-full bg-current animate-[pulse_2s_ease-in-out_infinite]'>
          <p className='text-[10px] text-background'>
            {(count || 0) > 99 ? "..." : count}
          </p>
        </span>
      )}
    </li>
  );
};
