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
import { useTranslation } from "@/app/i18n/client";

const Chat = () => {
  const { t } = useTranslation("chat");
  const [isOpen, setIsOpen] = useState(false);
  const { actualRoom, setActualRoom, chats } = chatStore((state) => state);
  const matches = useMediaQuery("(min-width: 768px)");
  const chatName = chats
    .find((c) => c.name === actualRoom)
    ?.participants.at(0)?.name;

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setActualRoom("");
  };

  useEffect(() => {
    // no-op if the socket is already connected
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <>
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
                  title={chatName || t("chat")}
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
    </>
  );
};

export default Chat;
