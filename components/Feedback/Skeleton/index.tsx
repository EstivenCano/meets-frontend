import { match } from "ts-pattern";
import { ProfileCardLoading } from "./ProfileCard";

import { DetailedHTMLProps, FC, HTMLAttributes } from "react";
import { PostCard } from "./PostCard";
import { Comment } from "./Comment";
import { Likes } from "./Likes";
import { FormLoading } from "./Form";
import { Select } from "./Select";

interface SkeletonProps {
  type: "profile" | "post" | "comment" | "likes" | "form" | "select";
  numberOfFields?: number;
}

const Skeleton: FC<
  SkeletonProps &
    DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = ({ type, numberOfFields, ...props }) => {
  return match(type)
    .with("profile", () => <ProfileCardLoading {...props} />)
    .with("post", () => <PostCard {...props} />)
    .with("comment", () => <Comment {...props} />)
    .with("likes", () => <Likes {...props} />)
    .with("form", () => (
      <FormLoading numberOfFields={numberOfFields} {...props} />
    ))
    .with("select", () => <Select {...props} />)
    .exhaustive();
};

export default Skeleton;
