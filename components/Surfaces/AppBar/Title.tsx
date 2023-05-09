"use client";

import { MeetsTitle } from "@/components/Display/MeetsTitle";
import { useRouterLocale } from "@/hooks/useRouter";

const Title = () => {
  const router = useRouterLocale();

  const goToFeed = () => {
    router.push("/social/feed");
  };

  return (
    <MeetsTitle
      size='sm'
      className='cursor-pointer select-none'
      onClick={goToFeed}
    />
  );
};

export default Title;
