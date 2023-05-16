"use client";

import { FC, useEffect, useState } from "react";
import { useScrolledToBottom } from "@/hooks/useScrolledToBottom";
import FeedProvider, { useFeedStore } from "@/stores/FeedStore/FeedContext";
import { Feed } from "@/model/Feed";
import { getFeed } from "@/services/post.service";
import useSWRMutation from "swr/mutation";
import { alertStore } from "@/stores/useAlert.store";
import { PostCard } from "./PostCard";
import { userStore } from "@/stores/useUser.store";
import { NoFeed } from "./NoFeed";
import { LoadingFeed } from "./LoadingFeed";
import { useTranslation } from "@/app/i18n/client";

interface PostListProps {
  initialFeed: Feed[];
  byAuthor?: number;
}

const FeedList: FC<PostListProps> = ({ initialFeed, byAuthor }) => {
  const { t } = useTranslation("feed");
  const { feed, perPage, setFeed, searchString } = useFeedStore(
    (state) => state
  );
  const [page, setPage] = useState(1);
  const user = userStore((state) => state.user);
  const addAlert = alertStore((state) => state.addAlert);
  const {
    data: lastFeed,
    trigger,
    isMutating: loadingFeed,
  } = useSWRMutation("/posts/feed", getFeed, {
    onSuccess(response) {
      setFeed(response.data);
      if (response.data.length < perPage) {
        addAlert({
          message: t("noMorePost"),
          status: 100,
        });
        return;
      }
      setPage(page + 1);
    },
    onError(err) {
      addAlert({
        message: err.message,
        errorList: err.errorList,
        status: err.statusCode,
      });
    },
  });

  const loadMoreFeed = async () => {
    if (loadingFeed) return;

    if (!!lastFeed && lastFeed.data.length < perPage) return;

    // Add 1 to the actual page to search the next one
    await trigger({
      page: page + 1,
      perPage: perPage,
      searchString,
      byAuthor,
    });
  };

  useScrolledToBottom(loadMoreFeed, "main-layout");

  useEffect(() => {
    setFeed(initialFeed);
  }, [initialFeed, setFeed]);

  return (
    <div className='flex flex-col w-full gap-y-6 overflow-y-auto overflow-x-hidden'>
      {feed.map((post) => (
        <PostCard key={post.id} post={post} userId={user?.id} />
      ))}
      {feed.length === 0 && <NoFeed />}
      <LoadingFeed loading={loadingFeed} />
    </div>
  );
};

const FeedWithProvider: FC<PostListProps> = (props) => {
  return (
    <FeedProvider>
      <FeedList {...props} />
    </FeedProvider>
  );
};

export default FeedWithProvider;
