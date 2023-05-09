"use client";

import { FC, useEffect, useState } from "react";
import { match } from "ts-pattern";

interface SnackBarProps {
  status?: "success" | "error" | "warning" | "info";
  message?: string;
  errorList?: string | string[];
  position?: "bottom-left" | "bottom-right" | "bottom-center";
  className?: string;
  children?: React.ReactNode;
}

import { motion, AnimatePresence } from "framer-motion";
import { alertStore } from "@/stores/useAlert.store";

const SnackBar: FC<SnackBarProps> = ({
  status = "info",
  message = "",
  errorList = [],
  position = "bottom-left",
  children,
  className,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const removeAlert = alertStore((state) => state.removeAlert);

  const handleClose = () => {
    setIsOpen(false);
  };

  function isArray(value: string | Array<string>): value is Array<string> {
    return (value as Array<string>)?.map !== undefined;
  }

  // Convert error list in an array
  const convertedErrorList = match(!isArray(errorList))
    .with(true, () => [errorList as string])
    .otherwise(() => errorList as string[]);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        removeAlert(message);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen, removeAlert, message]);

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
          className={`flex flex-col z-50 absolute max-w-md items-center space-x-2 text-white p-3 rounded-md shadow-lg shadow-black/30 ${positionClasses} ${statusClasses} ${className}`}
          {...props}>
          <div className='flex items-center justify-between w-full space-x-4'>
            <p className='text-sm font-semibold first-letter:capitalize'>
              {message || status}
            </p>
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
          </div>
          <ul className='list-disc px-2'>
            {convertedErrorList?.map((error, index) => (
              <li key={`${error}-${index}`} className='text-sm mt-1'>
                {error}
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SnackBar;
