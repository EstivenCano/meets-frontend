import { MeetsTitle } from "@/components/Display/MeetsTitle";
import { useTranslation } from "../../../i18n";
import Link from "next/link";

export default async function About({
  params: { lng },
}: {
  params: { lng: string };
}) {
  const { t } = await useTranslation(lng, "about");

  return (
    <main className='relative flex overflow-x-hidden max-w-6xl h-full max-h-full flex-col items-center w-full py-2 px-2'>
      <MeetsTitle size='md' className='text-center' />
      <h2 className='text-lg text-center mb-4'>{t("slogan")}</h2>
      <div className='flex w-fit h-fit flex-wrap justify-center gap-4 overflow-y-auto text-justify p-4 bg-background rounded-xl shadow-md shadow-violet-400/30'>
        <section className='w-full lg:w-1/2 p-4 space-y-4 max-w-md'>
          <h3 className='text-xl text-violet-400 font-semibold'>
            {t("about")}
          </h3>
          <hr />
          <p>
            <strong className='text-violet-400'>Meets</strong> {t("aboutP1")}
          </p>
          <p>{t("aboutP2")}</p>
          <p>
            {t("developedWith")}{" "}
            <Link
              target='_blank'
              href='https://github.com/EstivenCano'
              className='text-violet-400 underline'>
              Estiven Cano.
            </Link>
          </p>
        </section>
        <section className='w-full lg:w-1/2 p-4 space-y-4 max-w-md'>
          <h3 className='text-xl text-violet-400 font-semibold'>
            {t("contact")}
          </h3>
          <hr />
          <p>{t("contactP1")}</p>
          <ul>
            <li className='flex gap-2'>
              <strong>{t("repository")}</strong>
              <Link
                target='_blank'
                href='https://github.com/EstivenCano/meets-frontend'
                className='text-violet-400 underline'>
                {t("clickHere")}
              </Link>
            </li>
            <li className='flex gap-2'>
              <strong>{t("email")}</strong>
              <Link
                target='_blank'
                href='mailto:meets.tailsoft@gmail.com'
                className='text-violet-400 underline'>
                meets.tailsoft@gmail.com
              </Link>
            </li>
          </ul>
          <p>{t("contactP1")}</p>
          <p>{t("contactP2")}</p>
        </section>
      </div>
    </main>
  );
}
