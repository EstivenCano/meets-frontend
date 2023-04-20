"use client";

import { FC, useCallback, useEffect, useState } from "react";
import { match } from "ts-pattern";

interface SnackBarProps {
  status?: "success" | "error" | "warning" | "info";
  children: React.ReactNode;
  position?: "bottom-left" | "bottom-right" | "bottom-center";
  className?: string;
}

import { AnimatePresence, motion } from "framer-motion";

const SnackBar: FC<SnackBarProps> = ({
  status = "info",
  children,
  position = "bottom-left",
  className,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const changeOpenState = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        changeOpenState();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, changeOpenState]);

  const positionClasses = match(position)
    .with("bottom-left", () => "bottom-4 left-4")
    .with("bottom-right", () => "bottom-4 right-4")
    .with("bottom-center", () => "bottom-4 left-1/2 transform -translate-x-1/2")
    .exhaustive();

  const statusClasses = match(status)
    .with("success", () => "bg-green-600")
    .with("error", () => "bg-red-600")
    .with("warning", () => "bg-yellow-600")
    .with("info", () => "bg-violet-600")
    .exhaustive();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.4 }}
          className={`flex z-10 absolute max-w-md items-center space-x-2 text-white p-3 rounded-md shadow-lg shadow-black/30 ${positionClasses} ${statusClasses} ${className}`}
          {...props}>
          {children}
          <button
            onClick={handleClose}
            className='rounded-full p-1 hover:bg-black/20'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-4 w-4'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SnackBar;
