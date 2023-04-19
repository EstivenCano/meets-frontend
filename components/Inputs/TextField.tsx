import { FC, InputHTMLAttributes } from "react";
import { match } from "ts-pattern";

interface TextFieldProps {
  label: string;
  placeholder: string;
  className?: string;
  inputSize?: "sm" | "md" | "lg" | "auto";
}

export const TextField: FC<
  TextFieldProps & InputHTMLAttributes<HTMLInputElement>
> = ({ label, placeholder, className, inputSize = "auto", ...props }) => {
  const sizeClass = match(inputSize)
    .with("sm", () => "px-2 py-1 text-sm")
    .with("md", () => "px-4 py-2 text-base")
    .with("lg", () => "px-6 py-3 text-lg")
    .with("auto", () => "px-4 py-2 text-auto w-full")
    .otherwise(() => null);

  return (
    <>
      <label className='text-text hidden'>{label}</label>
      <input
        className={`rounded-md border-2 border-violet-600 hover:border-violet-400 focus:outline-none focus:border-violet-400 text-black ${sizeClass}`}
        placeholder={placeholder}
        {...props}
      />
    </>
  );
};
