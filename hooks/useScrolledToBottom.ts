import { useState } from "react";
import useEventListener from "./useEventListener";

export const useScrolledToBottom = (callback: () => void) => {
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);

  const handleScroll = () => {
    const scrollTop = window.pageYOffset;
    const scrollHeight = document.body.scrollHeight;
    const clientHeight = document.body.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight) {
      setIsScrolledToBottom(true);
      callback();
    } else {
      setIsScrolledToBottom(false);
    }
  };

  useEventListener("scroll", handleScroll);

  return isScrolledToBottom;
};
