import { InputHTMLAttributes, ReactNode, forwardRef } from "react";
import { match } from "ts-pattern";

interface TextFieldProps {
  name: string;
  icon?: ReactNode;
  showLabel?: boolean;
  error?: string;
  placeholder: string;
  className?: string;
  inputSize?: "sm" | "md" | "lg" | "auto";
}

export const TextField = forwardRef<
  HTMLInputElement,
  TextFieldProps & InputHTMLAttributes<HTMLInputElement>
>(
  (
    {
      name,
      icon,
      showLabel = false,
      error,
      placeholder,
      className,
      inputSize = "auto",
      ...props
    },
    ref
  ) => {
    const sizeClass = match(inputSize)
      .with("sm", () => "px-2 py-1 text-sm w-full")
      .with("md", () => "px-4 py-2 text-base w-full")
      .with("lg", () => "px-6 py-3 text-lg w-full")
      .with("auto", () => "px-4 py-2 text-auto w-full")
      .otherwise(() => null);

    const iconClass = match(!!icon)
      .with(true, () => "pl-9")
      .otherwise(() => null);

    return (
      <div className='w-full h-full'>
        <label
          className={`text-text ${
            showLabel ? "visible" : "hidden"
          } capitalize`}>
          {name}
        </label>
        <div className='flex relative'>
          {icon && (
            <div className='absolute flex items-center h-full left-2'>
              {icon}
            </div>
          )}
          <input
            ref={ref}
            name={name}
            className={`rounded-md border-2 border-violet-600 hover:border-violet-400 focus:outline-none focus:border-violet-400 text-black [&:not(:placeholder-shown):not(:focus):invalid]:border-red-600 dark:bg-gray-300/10 dark:border-violet-500/40 dark:text-text  ${sizeClass} ${iconClass} ${className}`}
            placeholder={placeholder}
            {...props}
          />
        </div>
        {error && <p className='text-red-600 text-sm mt-1'>{error}</p>}
      </div>
    );
  }
);

TextField.displayName = "TextField";
