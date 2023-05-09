"use client";

import { useParams, useRouter } from "next/navigation";

export const useRouterLocale = () => {
  const router = useRouter();
  const { lng } = useParams();

  class NewRouter {
    constructor() {}

    push(path: string) {
      router.push(`/${lng}${path.replace(`/${lng}`, "")}`);
    }

    replace(path: string) {
      router.replace(`/${lng}${path.replace(`/${lng}`, "")}`);
    }

    refresh() {
      router.refresh();
    }

    back() {
      router.back();
    }

    prefetch(path: string) {
      router.prefetch(`/${lng}${path.replace(`/${lng}`, "")}`);
    }

    forward() {
      router.forward();
    }
  }

  return new NewRouter();
};
