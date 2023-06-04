"use client";

import { useTranslation } from "@/app/i18n/client";
import { Button } from "@/components/Inputs/Button";
import { Link } from "@/components/Navigation/Link";
import { usePathname } from "next/navigation";

const SocialTabs = () => {
  const { t } = useTranslation("feed");
  const pathname = usePathname();

  const tabs = [
    { link: "/social/feed", name: "feed" },
    { link: "/social/news", name: "news" },
  ];

  return (
    <nav className='flex max-w-6xl p-1 mt-2 rounded-md gap-x-4 decoration-transparent'>
      {tabs.map(({ link, name }) => (
        <Link key={name} href={link}>
          <Button
            variant='outline'
            size='sm'
            className={pathname.includes(link) ? "bg-violet-600" : ""}>
            {t(name)}
          </Button>
        </Link>
      ))}
    </nav>
  );
};

export default SocialTabs;
