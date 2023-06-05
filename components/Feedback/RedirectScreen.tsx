import { useTranslation } from "@/app/i18n";
import { Loading } from "@/public/icons";
import { FC } from "react";

interface RedirectScreenProps {
  lng: string;
  text: string;
}

export default async function RedirectScreen({
  lng,
  text = "loading",
}: RedirectScreenProps) {
  const { t } = await useTranslation(lng, "common");

  return (
    <div className='flex items-center gap-x-2 justify-center w-full h-screen'>
      <Loading className='w-12 h-12 stroke-current' />
      <p className='text-md font-semibold'>{t(text)}</p>
    </div>
  );
}
