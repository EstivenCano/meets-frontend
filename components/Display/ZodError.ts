"use client";

import { useTranslation } from "@/app/i18n/client";

const ZodError = (messageKey?: string) => {
  const { t } = useTranslation("zod");

  if (!messageKey) return null;

  return t(messageKey);
};

export default ZodError;
