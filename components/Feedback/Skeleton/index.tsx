import { match } from "ts-pattern";
import { ProfileCardLoading } from "./ProfileCard";

import { DetailedHTMLProps, FC, HTMLAttributes } from "react";
import { PostCard } from "./PostCard";
import { Comment } from "./Comment";
import { Likes } from "./Likes";

interface SkeletonProps {
  type: "profile" | "post" | "comment" | "likes";
}

const Skeleton: FC<
  SkeletonProps &
    DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = ({ type, ...props }) => {
  return match(type)
    .with("profile", () => <ProfileCardLoading {...props} />)
    .with("post", () => <PostCard {...props} />)
    .with("comment", () => <Comment {...props} />)
    .with("likes", () => <Likes {...props} />)
    .exhaustive();
};

export default Skeleton;
