import { ButtonHTMLAttributes, FC } from "react";
import { match } from "ts-pattern";

interface ButtonProps {
  children: React.ReactNode;
  size?: "xs" | "sm" | "md" | "lg" | "auto";
  color?: "violet" | "green" | "red";
  variant?: "solid" | "outline";
  loading?: boolean;
  className?: string;
}

export const Button: FC<
  ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>
> = ({
  children,
  size = "auto",
  color = "violet",
  variant = "solid",
  loading = false,
  className,
  ...props
}) => {
  const sizeClasses = match(size)
    .with("xs", () => "px-1 py-1 text-xs")
    .with("sm", () => "px-2 py-1 text-sm")
    .with("md", () => "px-4 py-2 text-base")
    .with("lg", () => "px-6 py-3 text-lg")
    .with("auto", () => "px-4 py-2 text-auto w-full")
    .exhaustive();

  const colorClasses = match(color)
    .with(
      "violet",
      () =>
        `${
          variant === "outline"
            ? "bg-transparent text-text"
            : "bg-violet-600 text-white"
        } border-violet-600 hover:bg-violet-500`
    )
    .with(
      "green",
      () =>
        `${
          variant === "outline"
            ? "bg-transparent text-text"
            : "bg-green-700 text-white"
        } border-green-700 hover:bg-green-600`
    )
    .with(
      "red",
      () =>
        `${
          variant === "outline"
            ? "bg-transparent text-text"
            : "bg-red-600 text-white"
        } border-red-600 hover:bg-red-500`
    )
    .exhaustive();

  const variantClasses = match(variant)
    .with("solid", () => "border-none")
    .with("outline", () => "border-2 text-text")
    .exhaustive();

  const loadingClasses = match(loading)
    .with(true, () => "opacity-50 animate-pulse")
    .otherwise(() => "");

  return (
    <button
      disabled={loading}
      className={`flex flex-row items-center justify-center space-x-2 px-4 py-2 font-semibold rounded-md hover:text-white ${sizeClasses} ${colorClasses} ${variantClasses} ${loadingClasses} ${className}`}
      {...props}>
      {children}
    </button>
  );
};
