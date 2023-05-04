import { useEffect, useState } from "react";

import useIsomorphicLayoutEffect from "./useIsomorphicLayoutEffect";

type UseLockedBodyOutput = [boolean, (locked: boolean) => void];

function useLockedBody(
  initialLocked = false,
  rootId = "___gatsby" // Default to `___gatsby` to not introduce breaking change
): UseLockedBodyOutput {
  const [locked, setLocked] = useState(initialLocked);
  const element = document.getElementById(rootId);

  // Do the side effect before render
  useIsomorphicLayoutEffect(() => {
    if (!locked) {
      return;
    }

    if (!element) {
      return;
    }

    //Add keydown event listener to prevent tabbing outside of the modal
    const firstFocusableElement = element.querySelector(
        "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
      ) as HTMLElement,
      focusableContent = element.querySelectorAll(
        "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
      ) as NodeListOf<HTMLElement>,
      lastFocusableElement = focusableContent[focusableContent.length - 1];

    const keydownHandler = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        if (e.shiftKey) {
          if (document.activeElement === firstFocusableElement) {
            lastFocusableElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastFocusableElement) {
            firstFocusableElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    element.addEventListener("keydown", keydownHandler);

    element.focus();

    return () => {
      element.removeEventListener("keydown", keydownHandler);
    };
  }, [locked]);

  // Update state if initialValue changes
  useEffect(() => {
    if (locked !== initialLocked) {
      setLocked(initialLocked);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialLocked]);

  return [locked, setLocked];
}

export default useLockedBody;
