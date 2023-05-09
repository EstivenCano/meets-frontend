"use client";

import { useTranslation } from "@/app/i18n/client";
import { Select } from "@/components/Inputs/Select";
import { useThemeContext } from "@/hooks/useTheme";

import { Theme } from "@/model/Theme";

const ChangeTheme = () => {
  const { t } = useTranslation("settings");
  const { setTheme, theme } = useThemeContext();

  const themes = [
    { value: "light", label: t("light") },
    { value: "dark", label: t("dark") },
  ];

  const handleChangeTheme = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(e.target.value as Theme);
  };

  return (
    <Select
      label='theme'
      name='theme'
      onChange={handleChangeTheme}
      options={themes}
      value={theme}
    />
  );
};

export default ChangeTheme;
