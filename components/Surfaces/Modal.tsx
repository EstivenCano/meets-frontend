import { FC, useRef } from "react";
import { createPortal } from "react-dom";
import { IconButton } from "../Inputs/IconButton";
import { AnimatePresence, motion } from "framer-motion";
import useOnClickOutside from "@/hooks/useOnClickOutside";

const modalEl = document.getElementById("modal-root") as HTMLElement;

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
  title: string;
  open: boolean;
}

export const Modal: FC<ModalProps> = ({ children, onClose, title, open }) => {
  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, onClose);

  return (
    <>
      <AnimatePresence>
        {open && (
          <>
            {createPortal(
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className='fixed top-0 left-0 w-screen h-screen bg-black/50 z-50 flex justify-center items-center'>
                <div
                  ref={ref}
                  className='relative bg-background h-screen w-screen min-h-[250px] max-w-4xl md:h-fit md:w-full p-4 md:rounded-xl flex flex-col items-start'>
                  <IconButton
                    icon='/close.svg'
                    name='Close'
                    className='absolute top-4 right-4'
                    onClick={onClose}
                  />
                  <h1 className='text-xl font-bold'>{title}</h1>
                  <div className='flex-grow w-full mt-4 overflow-y-auto'>
                    {children}
                  </div>
                </div>
              </motion.div>,
              modalEl
            )}
          </>
        )}
      </AnimatePresence>
    </>
  );
};
