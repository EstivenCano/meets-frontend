import { createInstance } from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next/initReactI18next";
import { getOptions } from "./settings";
import { match } from "ts-pattern";

const initI18next = async (lng: string, ns: string) => {
  const i18nInstance = createInstance();
  await i18nInstance
    .use(initReactI18next)
    .use(
      resourcesToBackend(
        (language: string, namespace: string) =>
          import(`./locales/${language}/${namespace}.json`)
      )
    )
    .init(getOptions(lng, ns));
  return i18nInstance;
};

export async function useTranslation(
  lng: string,
  ns: string,
  options: Record<string, string> = {}
) {
  const i18nextInstance = await initI18next(lng, ns);
  const isArray = Array.isArray(ns);
  return {
    t: i18nextInstance.getFixedT(
      lng,
      match(isArray)
        .with(true, () => ns[0])
        .otherwise(() => ns),
      options.keyPrefix
    ),
    i18n: i18nextInstance,
  };
}
