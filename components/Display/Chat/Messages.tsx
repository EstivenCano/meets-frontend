import { Message } from "@/model/Message";
import { chatStore } from "@/stores/useChat.store";
import { userStore } from "@/stores/useUser.store";
import { dateToShortTime } from "@/utils/dateToShortTime";
import { useEffect, useState } from "react";
import { match } from "ts-pattern";

export const Messages = () => {
  const { chats, actualRoom } = chatStore();
  const [messages, setMessages] = useState<Message[]>([]);

  const user = userStore((state) => state.user);

  useEffect(() => {
    setMessages(chats.find((c) => c.name === actualRoom)?.messages || []);
  }, [actualRoom, chats]);

  useEffect(() => {
    if (messages) {
      document
        .getElementById(messages.at(0)?.createdAt || "")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const messageClass = (isAuthor: boolean) =>
    match(isAuthor)
      .with(true, () => "ml-auto self-end bg-violet-500")
      .otherwise(() => "mr-auto self-end bg-gray-500");

  const triangleClass = (isAuthor: boolean) =>
    match(isAuthor)
      .with(true, () => "-right-0 bottom-2 rounded-b-full bg-violet-500")
      .otherwise(() => "-left-1.5 bottom-2 rounded-r-full bg-gray-500");

  return (
    <section className='flex text-white flex-col-reverse w-full gap-y-2 h-full overflow-y-auto p-4'>
      {messages.map((message) => (
        <div
          id={message.createdAt}
          key={message.createdAt}
          className={`relative max-w-md px-3 p-2 rounded-md ${messageClass(
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
    </section>
  );
};
