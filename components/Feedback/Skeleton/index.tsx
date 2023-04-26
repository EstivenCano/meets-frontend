import { match } from "ts-pattern";
import { ProfileCardLoading } from "./ProfileCard";

import { DetailedHTMLProps, FC, HTMLAttributes } from "react";

interface SkeletonProps {
  type: "profile" | "post" | "comment";
}

const Skeleton: FC<
  SkeletonProps &
    DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = ({ type, ...props }) => {
  return match(type)
    .with("profile", () => <ProfileCardLoading {...props} />)
    .with("post", () => <div {...props} />)
    .with("comment", () => <div {...props} />)
    .exhaustive();
};

export default Skeleton;
