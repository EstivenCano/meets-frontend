"use client";

import { useEffect, useState } from "react";
import { ChatList } from "./ChatList";
import { Messages } from "./Messages";
import { socket } from "@/services/chat.service";
import NewMessages from "@/components/Forms/NewMessage";
import { Modal } from "@/components/Surfaces/Modal";
import { chatStore } from "@/stores/useChat.store";
import { match } from "ts-pattern";
import { NoChat } from "./NoChat";
import useMediaQuery from "@/hooks/useMediaQuery";

const Chat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { actualRoom, setActualRoom } = chatStore((state) => state);
  const matches = useMediaQuery("(min-width: 768px)");

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setActualRoom("");
    setIsOpen(false);
  };

  useEffect(() => {
    // no-op if the socket is already connected
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <main className='flex md:flex-row flex-col w-full h-full'>
      <ChatList handleOpen={handleOpen} />
      {match(!!actualRoom)
        .with(true, () => (
          <>
            {match(matches)
              .with(true, () => (
                <div className='hidden md:flex flex-col w-full h-full justify-end'>
                  <Messages />
                  <NewMessages />
                </div>
              ))
              .otherwise(() => (
                <Modal
                  onClose={handleClose}
                  open={isOpen}
                  title='Chat'
                  className='flex md:hidden'>
                  <div className='flex flex-col w-full h-full justify-end'>
                    <Messages />
                    <NewMessages />
                  </div>
                </Modal>
              ))}
          </>
        ))
        .otherwise(() => (
          <NoChat />
        ))}
    </main>
  );
};

export default Chat;
