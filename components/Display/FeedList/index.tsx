"use client";

import { FC, useEffect } from "react";
import { useScrolledToBottom } from "@/hooks/useScrolledToBottom";
import { feedStore } from "@/stores/useFeed.store";
import { Feed } from "@/services/model/Feed";
import { GetFeed } from "@/services/post.service";
import useSWRMutation from "swr/mutation";
import { alertStore } from "@/stores/useAlert.store";
import { PostCard } from "./PostCard";
import Skeleton from "@/components/Feedback/Skeleton";
import Image from "next/image";
import { userStore } from "@/stores/useUser.store";
import { NoFeed } from "./NoFeed";

interface PostListProps {
  post: Feed[];
}

const FeedList: FC<PostListProps> = ({ post }) => {
  const { feed, searchString, perPage, page, setFeed, setPage } = feedStore();
  const user = userStore((state) => state.user);
  const addAlert = alertStore((state) => state.addAlert);
  const { trigger, isMutating: loadingFeed } = useSWRMutation(
    "/posts/feed",
    GetFeed,
    {
      onSuccess(response) {
        setFeed(response.data);
      },
      onError(err) {
        addAlert({
          message: err.message,
          errorList: err.errorList,
          status: err.statusCode,
        });
      },
    }
  );

  useEffect(() => {
    setFeed(post);
  }, [post, setFeed]);

  useEffect(() => {
    if (feed.length < perPage * page) return;

    setPage(page + 1);
  }, [feed, page, perPage, setPage]);

  const loadMoreFeed = async () => {
    console.log("loadMoreFeed");
    if (feed.length < perPage * page || loadingFeed) return;

    // trigger({
    //   page,
    //   perPage,
    //   searchString,
    // });
  };

  useScrolledToBottom(loadMoreFeed);

  return (
    <div className='flex flex-col w-full gap-y-6 overflow-y-auto'>
      {post.map((post) => (
        <PostCard key={post.id} post={post} userId={user?.id} />
      ))}
      {post.length === 0 && <NoFeed />}
      {loadingFeed && (
        <div className='relative'>
          <Skeleton type='post' />
          <Image
            src='/loading.svg'
            alt='Loading icon'
            width={40}
            height={40}
            className='absolute top-1/2 left-1/2'
          />
        </div>
      )}
    </div>
  );
};

export default FeedList;
