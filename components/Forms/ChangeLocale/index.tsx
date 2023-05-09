"use client";

import { useTranslation } from "@/app/i18n/client";
import { Select } from "@/components/Inputs/Select";
import { setCookie } from "cookies-next";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const ChangeLocale = () => {
  const { t } = useTranslation("settings");
  const router = useRouter();
  const { lng } = useParams();
  const pathname = usePathname();

  const languages = [
    { value: "en", label: t("en") },
    { value: "es", label: t("es") },
  ];

  useEffect(() => {
    setCookie("i18next", lng);
  }, [lng]);

  const handleChangeLocale = (e: React.ChangeEvent<HTMLSelectElement>) => {
    router.replace(`/${e.target.value}${pathname.replace(`/${lng}`, "")}`);
  };

  return (
    <Select
      label='language'
      name='language'
      onChange={handleChangeLocale}
      options={languages}
      value={lng}
    />
  );
};

export default ChangeLocale;
