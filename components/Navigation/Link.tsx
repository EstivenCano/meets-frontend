import NextLink from "next/link";
import type { LinkProps as NextLinkProps } from "next/link";
import { FC } from "react";

interface LinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
}

export const Link: FC<LinkProps & NextLinkProps> = ({
  href,
  className,
  children,
  ...props
}) => {
  return (
    <NextLink
      href={href}
      className={`text-violet-500 hover:underline hover:text-violet-400 ${className}}`}
      {...props}>
      {children}
    </NextLink>
  );
};
