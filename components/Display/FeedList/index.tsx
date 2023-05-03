"use client";

import { FC, useCallback, useEffect, useRef } from "react";
import { useScrolledToBottom } from "@/hooks/useScrolledToBottom";
import { feedStore } from "@/stores/useFeed.store";
import { Feed } from "@/services/model/Feed";
import { getFeed } from "@/services/post.service";
import useSWRMutation from "swr/mutation";
import { alertStore } from "@/stores/useAlert.store";
import { PostCard } from "./PostCard";
import Skeleton from "@/components/Feedback/Skeleton";
import { userStore } from "@/stores/useUser.store";
import { NoFeed } from "./NoFeed";
import { Loading } from "@/public/icons";

interface PostListProps {
  initialFeed: Feed[];
}

const FeedList: FC<PostListProps> = ({ initialFeed }) => {
  const feed = feedStore((state) => state.feed);
  const { searchString, perPage, page, setFeed, setPage } = feedStore();
  const user = userStore((state) => state.user);
  const addAlert = alertStore((state) => state.addAlert);
  const { trigger, isMutating: loadingFeed } = useSWRMutation(
    "/posts/feed",
    getFeed,
    {
      onSuccess(response) {
        setFeed(response.data);
        setPage(page + 1);
      },
      onError(err) {
        addAlert({
          message: err.message,
          errorList: err.errorList,
          status: err.statusCode,
        });
      },
      revalidate: true,
    }
  );

  const loadMoreFeed = async () => {
    if (feed.length < perPage * page || loadingFeed) return;

    await trigger({
      page: page + 1,
      perPage: perPage,
      searchString,
    });
  };

  useScrolledToBottom(loadMoreFeed, "main-layout");

  useEffect(() => {
    setFeed(initialFeed);
  }, [initialFeed, setFeed]);

  return (
    <div className='flex flex-col w-full gap-y-6 overflow-y-auto'>
      {feed.map((post) => (
        <PostCard key={post.id} post={post} userId={user?.id} />
      ))}
      {feed.length === 0 && <NoFeed />}
      {loadingFeed && (
        <div className='relative'>
          <Skeleton type='post' />
          <Loading className='absolute top-1/2 left-1/2 w-10 h-10 stroke-violet-500' />
        </div>
      )}
    </div>
  );
};

export default FeedList;
