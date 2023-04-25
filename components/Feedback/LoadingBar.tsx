import { FC } from "react";
import { match } from "ts-pattern";

interface LoadingBarProps {
  size?: "sm" | "md" | "lg";
}

export const LoadingBar: FC<LoadingBarProps> = ({ size = "sm" }) => {
  const sizeClass = match(size)
    .with("sm", () => "w-1 h-4")
    .with("md", () => "w-2 h-6")
    .with("lg", () => "w-3 h-8")
    .exhaustive();

  return (
    <div className='flex flex-row mx-auto space-x-4 pt-5'>
      <div
        className={`${sizeClass} bg-violet-600 rounded-full animate-[pulse_2s_ease-in-out_infinite] delay-100`}
      />
      <div
        className={`${sizeClass} bg-violet-400 rounded-full animate-[pulse_2s_ease-in-out_infinite] delay-150`}
      />
      <div
        className={`${sizeClass} bg-violet-600 rounded-full animate-[pulse_2s_ease-in-out_infinite] delay-200`}
      />
    </div>
  );
};
