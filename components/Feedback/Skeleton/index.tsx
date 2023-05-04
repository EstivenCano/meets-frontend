import { match } from "ts-pattern";
import { ProfileCardLoading } from "./ProfileCard";

import { DetailedHTMLProps, FC, HTMLAttributes } from "react";
import { PostCard } from "./PostCard";
import { Comment } from "./Comment";

interface SkeletonProps {
  type: "profile" | "post" | "comment";
}

const Skeleton: FC<
  SkeletonProps &
    DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = ({ type, ...props }) => {
  return match(type)
    .with("profile", () => <ProfileCardLoading {...props} />)
    .with("post", () => <PostCard {...props} />)
    .with("comment", () => <Comment {...props} />)
    .exhaustive();
};

export default Skeleton;
