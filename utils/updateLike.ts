import { Feed } from "@/services/model/Feed";
import { match } from "ts-pattern";

export const updateLike = (post: Feed, like: boolean, userId: number) => {
  return {
    ...post,
    ...match(like)
      .with(true, () => ({
        likedBy: [...post.likedBy, { id: userId }],
        _count: {
          ...post._count,
          likedBy: post._count.likedBy + 1,
        },
      }))
      .otherwise(() => ({
        likedBy: [],
        _count: {
          ...post._count,
          likedBy: post._count.likedBy - 1,
        },
      })),
  };
};
