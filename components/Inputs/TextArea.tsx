import useEventListener from "@/hooks/useEventListener";
import {
  ChangeEventHandler,
  ReactNode,
  TextareaHTMLAttributes,
  forwardRef,
  useMemo,
  useState,
} from "react";
import { match } from "ts-pattern";

interface TextAreaProps {
  name: string;
  icon?: ReactNode;
  showLabel?: boolean;
  error?: string;
  placeholder: string;
  className?: string;
  maxCharacters?: number;
  inputSize?: "sm" | "md" | "lg" | "auto";
}

export const TextArea = forwardRef<
  HTMLTextAreaElement,
  TextAreaProps & TextareaHTMLAttributes<HTMLTextAreaElement>
>(
  (
    {
      name,
      icon,
      showLabel = false,
      error,
      placeholder,
      className,
      maxCharacters = 320,
      inputSize = "auto",
      ...props
    },
    ref
  ) => {
    const [characterCount, setCharacterCount] = useState(0);

    const handleCharacterCount: ChangeEventHandler<HTMLTextAreaElement> = (
      e
    ) => {
      setCharacterCount(e.target.value.length);
    };

    const sizeClass = match(inputSize)
      .with("sm", () => "px-2 py-1 text-sm w-full")
      .with("md", () => "px-4 py-2 text-base w-full")
      .with("lg", () => "px-6 py-3 text-lg w-full")
      .with("auto", () => "px-4 py-2 text-auto w-full")
      .otherwise(() => null);

    const iconClass = match(!!icon)
      .with(true, () => "pl-8")
      .otherwise(() => null);

    useEventListener("reset", () => {
      setCharacterCount(0);
    });

    return (
      <div className='w-full h-full'>
        <label
          className={`text-text ${
            showLabel ? "visible" : "hidden"
          } capitalize`}>
          {name}
        </label>
        <div className='flex relative'>
          {icon && <div className='absolute flex inset-y-0 left-2'>{icon}</div>}
          <textarea
            ref={ref}
            name={name}
            onInputCapture={handleCharacterCount}
            className={`rounded-md border-2 border-violet-600 hover:border-violet-400 focus:outline-none focus:border-violet-400 text-black [&:not(:placeholder-shown):not(:focus):invalid]:border-red-600 dark:bg-gray-300/10 dark:border-violet-500/40 dark:text-text resize-none ${sizeClass} ${iconClass} ${className}`}
            placeholder={placeholder}
            {...props}
          />
        </div>
        <span className='flex justify-end items-center w-full'>
          {error && (
            <p className='text-red-600 text-sm mr-auto self-end'>{error}</p>
          )}
          <p
            className={`text-right text-sm ${
              characterCount > maxCharacters ? "text-red-600" : "text-text"
            }`}>
            {characterCount}
            {" / "}
            <span className='text-text'>{maxCharacters}</span>
          </p>
        </span>
      </div>
    );
  }
);

TextArea.displayName = "TextArea";
