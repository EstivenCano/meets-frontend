import { TextArea } from "@/components/Inputs/TextArea";
import { chatStore } from "@/stores/useChat.store";
import { userStore } from "@/stores/useUser.store";
import { FC, useRef } from "react";
import { socket } from "@/services/chat.service";
import { SubmitHandler, useForm } from "react-hook-form";
import { NewMessageType, newMessageSchema } from "./new-message.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconButton } from "@/components/Inputs/IconButton";
import SendIcon from "@/public/icons/SendIcon";

interface NewMessageProps {}

export const NewMessage: FC<NewMessageProps> = () => {
  const formElement = useRef<HTMLFormElement>(null);
  const user = userStore((state) => state.user);
  const actualRoom = chatStore((state) => state.actualRoom);

  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors: formErrors },
  } = useForm<NewMessageType>({
    resolver: zodResolver(newMessageSchema),
  });

  const onSubmit: SubmitHandler<NewMessageType> = async (data) => {
    await socket.emit("event_message", {
      chatName: actualRoom,
      authorId: user?.id,
      createdAt: new Date().toISOString(),
      content: data.content,
    });
    reset();
  };

  return (
    <form
      ref={formElement}
      onBlur={() => clearErrors()}
      onSubmit={handleSubmit(onSubmit)}
      className='flex p-4 gap-x-2 overflow-hidden'>
      <TextArea
        noCounter
        placeholder='Write your message here...'
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            formElement.current?.requestSubmit();
          }
        }}
        error={formErrors.content?.message}
        {...register("content")}
      />
      <IconButton
        icon={<SendIcon />}
        type='submit'
        name='send'
        className='hover:text-violet-300'
      />
    </form>
  );
};

export default NewMessage;
