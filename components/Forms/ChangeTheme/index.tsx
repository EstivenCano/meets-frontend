"use client";

import { Select } from "@/components/Inputs/Select";
import { useThemeContext } from "@/hooks/useTheme";

import { themes } from "@/utils/constants/themes";
import { Theme } from "@/model/Theme";

const ChangeTheme = () => {
  const { setTheme, theme } = useThemeContext();

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
