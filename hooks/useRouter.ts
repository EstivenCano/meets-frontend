"use client";

import { routerStore } from "@/stores/useRouter.store";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export const useRouterLocale = () => {
  const router = useRouter();
  const { setLoadingRoute } = routerStore();
  const { lng } = useParams();
  const pathname = usePathname();

  useEffect(() => {
    setLoadingRoute(false);
  }, [pathname, setLoadingRoute]);

  class NewRouter {
    constructor() {}

    push(path: string) {
      const route = `/${lng}${path.replace(`/${lng}`, "")}`;
      setLoadingRoute(true);
      router.push(route);
    }

    replace(path: string) {
      const route = `/${lng}${path.replace(`/${lng}`, "")}`;
      setLoadingRoute(true);
      router.replace(route);
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
