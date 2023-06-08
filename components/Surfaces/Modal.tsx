import { FC, useEffect } from "react";
import { createPortal } from "react-dom";
import { IconButton } from "../Inputs/IconButton";
import { AnimatePresence, motion } from "framer-motion";
import { Close } from "@/public/icons";
import useLockedBody from "@/hooks/useLockedBody";
import { useTranslation } from "@/app/i18n/client";

interface ModalProps {
  className?: string;
  children: React.ReactNode;
  onClose: () => void;
  title: string;
  open: boolean;
}

export const Modal: FC<ModalProps> = ({
  className,
  children,
  onClose,
  title,
  open,
}) => {
  const modalEl = document.getElementById("modal-root") as HTMLElement;
  const { t } = useTranslation("common");
  const [_, setLocked] = useLockedBody(open, "modal-root");

  useEffect(() => {
    setLocked(open);
  }, [open, setLocked]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {createPortal(
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={`w-screen h-full bg-black/50 z-40 flex justify-center items-center ${className}`}>
              <div className='relative bg-background h-full w-screen min-h-[250px] max-h-screen max-w-4xl md:h-fit md:w-full gap-y-4 md:rounded-xl flex flex-col items-start'>
                <span className='flex w-full p-4 pb-0 justify-between'>
                  <h1 className='text-xl font-bold'>{title}</h1>
                  <IconButton
                    size='xs'
                    autoFocus
                    icon={<Close className='w-5 h-5' />}
                    name={t("close")}
                    onClick={onClose}
                  />
                </span>
                <div className='flex flex-col h-full w-full items-center justify-start py-4 overflow-y-auto'>
                  {children}
                </div>
              </div>
            </motion.div>,
            modalEl
          )}
        </>
      )}
    </AnimatePresence>
  );
};
