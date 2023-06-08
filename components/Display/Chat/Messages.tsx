import { useScrolledToBottom } from "@/hooks/useScrolledToBottom";
import { loadMessages } from "@/services/chat.service";
import { chatStore } from "@/stores/useChat.store";
import { userStore } from "@/stores/useUser.store";
import { dateToShortTime } from "@/utils/dateToShortTime";
import { useEffect, useMemo, useState } from "react";
import useSWRMutation from "swr/mutation";
import { match } from "ts-pattern";
import { LoadingMessages } from "./LoadingMessages";

export const Messages = () => {
  const {
    chats,
    actualRoom,
    setChatPages,
    chatPages,
    perPage,
    loadMoreMessages,
  } = chatStore();
  const [autoScroll, setAutoScroll] = useState(true);

  const messages = useMemo(
    () => chats.find((c) => c.name === actualRoom)?.messages || [],
    [chats, actualRoom]
  );

  const currentPages = chatPages.find(
    ({ chatName }) => chatName === actualRoom
  );

  const user = userStore((state) => state.user);

  const { trigger, isMutating: loadingMessages } = useSWRMutation(
    "/chat/load",
    loadMessages,
    {
      onSuccess(response) {
        loadMoreMessages(response.data);
        if (response.data.length < perPage) {
          return;
        }
        setChatPages(actualRoom, (currentPages?.page || 0) + 1);
      },
    }
  );

  useEffect(() => {
    if (messages && autoScroll) {
      document
        .getElementById(messages.at(0)?.createdAt || "")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, autoScroll]);

  useEffect(() => {
    if (!currentPages) {
      setChatPages(actualRoom, 1);
    }
  }, [currentPages, setChatPages, actualRoom]);

  const triggerLoadMessages = async () => {
    if (loadingMessages) return;

    if (messages.length % perPage > 0) return;

    // Add 1 to the actual page to search the next one
    await trigger({
      chatName: actualRoom,
      page: (currentPages?.page || 0) + 1,
      perPage: perPage,
    });
  };

  const handleAutoScroll = (scrollTop: number) => {
    if (Math.abs(scrollTop) <= 10) {
      setAutoScroll(true);
    } else {
      if (autoScroll) {
        setAutoScroll(false);
      }
    }
  };

  useScrolledToBottom(triggerLoadMessages, "messages-container");

  const messageClass = (isAuthor: boolean) =>
    match(isAuthor)
      .with(true, () => "ml-auto self-end bg-violet-500")
      .otherwise(() => "mr-auto self-end bg-gray-500");

  const triangleClass = (isAuthor: boolean) =>
    match(isAuthor)
      .with(true, () => "-right-0 bottom-2 rounded-b-full bg-violet-500")
      .otherwise(() => "-left-1.5 bottom-2 rounded-r-full bg-gray-500");

  return (
    <section
      id='messages-container'
      onScroll={(e) => handleAutoScroll(e.currentTarget.scrollTop)}
      className='flex relative text-white flex-col-reverse w-full gap-y-2 h-full overflow-y-auto overflow-x-hidden p-4'>
      {messages.map((message) => (
        <div
          id={message.createdAt}
          key={message.createdAt}
          className={`relative max-w-xs md:max-w-md break-words px-3 p-2 rounded-md ${messageClass(
            message.authorId === Number(user?.id)
          )}`}>
          <div
            className={`absolute h-3 w-3 origin-bottom-left rotate-45 transform ${triangleClass(
              message.authorId === Number(user?.id)
            )}`}
          />
          <p className='text-sm'>{message.content}</p>
          <p className='text-xs pl-6 w-fit ml-auto'>
            {dateToShortTime(new Date(message.createdAt))}
          </p>
        </div>
      ))}
      <LoadingMessages loading={loadingMessages} />
    </section>
  );
};
