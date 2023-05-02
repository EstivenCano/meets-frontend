import { useCallback, useRef, useState } from "react";
import useEventListener from "./useEventListener";

export const useScrolledToBottom = (
  callback: () => void,
  element: HTMLElement | null = document.body
) => {
  const ref = useRef<HTMLElement | null>(element);
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);

  const handleScroll = useCallback(() => {
    const scrollTop = element?.scrollTop || window.scrollY;
    const scrollHeight = element?.scrollHeight;
    const clientHeight = element?.clientHeight;

    if (!scrollHeight || !clientHeight) return;

    if (scrollTop + clientHeight >= scrollHeight) {
      setIsScrolledToBottom(true);
      callback();
    } else {
      setIsScrolledToBottom(false);
    }
  }, [callback, element]);

  useEventListener("scroll", handleScroll, ref);

  return isScrolledToBottom;
};
