import { TextArea } from "@/components/Inputs/TextArea";
import { chatStore } from "@/stores/useChat.store";
import { userStore } from "@/stores/useUser.store";
import { FC } from "react";
import { socket } from "@/services/chat.service";

interface NewMessageProps {}

export const NewMessage: FC<NewMessageProps> = () => {
  const user = userStore((state) => state.user);
  const actualRoom = chatStore((state) => state.actualRoom);

  const sendMessage = (content: string) => {
    if (socket) {
      socket.emit("event_message", {
        chatName: actualRoom,
        authorId: user?.id,
        createdAt: new Date().toISOString(),
        content,
      });
    }
  };

  return (
    <div className='p-4'>
      <TextArea
        name='message'
        noCounter
        placeholder='Write your message here...'
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            sendMessage(e.currentTarget.value);
            e.currentTarget.value = "";
          }
        }}
      />
    </div>
  );
};

export default NewMessage;
