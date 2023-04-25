import { Dancing_Script } from "next/font/google";
import { DetailedHTMLProps, FC, HTMLAttributes } from "react";
import { match } from "ts-pattern";

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: "700",
});

interface MeetsTitleProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  > {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const MeetsTitle: FC<MeetsTitleProps> = ({
  size = "md",
  className,
  ...props
}) => {
  const sizeClass = match(size)
    .with("sm", () => "text-4xl")
    .with("md", () => "text-6xl")
    .with("lg", () => "text-8xl")
    .exhaustive();

  return (
    <h1
      className={`${dancingScript.className} ${sizeClass} text-transparent bg-clip-text font-bold bg-gradient-to-br from-violet-500 via-violet-400 to-violet-500 ${className}`}
      {...props}>
      Meets
    </h1>
  );
};
