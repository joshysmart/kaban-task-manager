import { IconDarkTheme, IconLightTheme } from "@/app/assets/icons";
import { useThemeContext } from "@/contexts/theme-provider";
import { cn } from "@/lib/utils";
import React from "react";

type Props = {};

export default function ThemeSwitcher({}: Props) {
  const themeContext = useThemeContext();
  const isDark = themeContext.theme === "dark";
  const [dark, setDark] = React.useState(isDark);

  const handleChange = () => {
    setDark(!dark);
    themeContext.setTheme(dark ? "light" : "dark");
  };

  return (
    <div className={`px-4 md:px-6 ${isDark && "bg-main"}`}>
      <div
        className={`flex items-center justify-center gap-6 py-4 rounded-lg transition-colors ${
          isDark ? "bg-very-dark-grey-dark-bg" : "bg-light-grey-light-bg"
        }`}
      >
        <IconLightTheme />
        <label className="relative flex items-center w-10 h-5 px-1">
          <input
            type="checkbox"
            name=""
            id=""
            onChange={() => handleChange()}
            hidden
            className="input__toggle"
            defaultChecked={dark}
          />
          <span
            className={cn(
              "absolute w-[14px] h-[14px] rounded-full bg-white duration-500 z-50",
              {
                "transform translate-x-[18px]": dark,
              }
            )}
          ></span>
          <span className="absolute top-0 bottom-0 left-0 right-0 duration-500 rounded-full cursor-pointer bg-main-purple"></span>
        </label>
        <IconDarkTheme />
      </div>
    </div>
  );
}
