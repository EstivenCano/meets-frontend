"use client";

import { MeetsTitle } from "@/components/Display/MeetsTitle";
import { useRouter } from "next/navigation";

const Title = () => {
  const router = useRouter();

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
