import NextLink from "next/link";
import type { LinkProps as NextLinkProps } from "next/link";
import { FC } from "react";

interface LinkProps {
  href: string;
  children: React.ReactNode;
}

export const Link: FC<LinkProps & NextLinkProps> = ({
  href,
  children,
  ...props
}) => {
  return (
    <NextLink
      href={href}
      className='text-violet-600 hover:underline hover:text-violet-500'
      {...props}>
      {children}
    </NextLink>
  );
};
