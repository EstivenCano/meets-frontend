"use client";

import NextLink from "next/link";
import type { LinkProps as NextLinkProps } from "next/link";
import { useParams } from "next/navigation";
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
  const { lng } = useParams();

  return (
    <NextLink
      href={`/${lng}${href}`}
      className={`text-violet-600 dark:text-violet-400 hover:underline hover:text-violet-500 ${className}}`}
      {...props}>
      {children}
    </NextLink>
  );
};
