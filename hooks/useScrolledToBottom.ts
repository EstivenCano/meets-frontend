"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import useEventListener from "./useEventListener";

export const useScrolledToBottom = (
  callback: () => void,
  elementId?: string
) => {
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);
  const scrollRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    scrollRef.current = document.getElementById(elementId || "root");
  }, [elementId]);

  const handleScroll = useCallback(() => {
    const scrollTop = scrollRef.current?.scrollTop ?? window.scrollY;
    const scrollHeight =
      scrollRef.current?.scrollHeight ?? document.body.scrollHeight;
    const clientHeight =
      scrollRef.current?.clientHeight ?? document.body.clientHeight;

    if (!scrollHeight || !clientHeight) return;

    if (scrollTop + 2 + clientHeight >= scrollHeight) {
      setIsScrolledToBottom(true);
      callback();
    } else {
      setIsScrolledToBottom(false);
    }
  }, [callback, scrollRef]);

  useEventListener("scroll", handleScroll, scrollRef);

  return isScrolledToBottom;
};
