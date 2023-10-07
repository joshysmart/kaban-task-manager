import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { IconBoard, IconHideSidebar } from "@/app/assets/icons";
import { useAuth } from "@clerk/nextjs";
import ThemeSwitcher from "./ThemeSwitcher";
import { useThemeContext } from "@/contexts";
import { cn } from "@/lib/utils";

type Props = {
  boardNames?: {
    _id: string;
    slug: string;
  }[];
  showSidebar: boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  setCreatedBoard: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SideNav({
  boardNames,
  showSidebar,
  setShowSidebar,
  setCreatedBoard,
}: Props) {
  const themeContext = useThemeContext();
  const isDark = themeContext.theme === "dark";
  const boardLength = boardNames?.length ?? 0;
  const pathname = usePathname();
  const router = useRouter();
  const { userId } = useAuth();

  const navList = boardNames
    ?.map((boardName) => boardName.slug)
    .map((slug, index) => {
      const isActive = pathname === `/${slug}`;
      return (
        <li key={slug}>
          <Link
            href={slug}
            passHref
            className={cn(
              "group flex items-center gap-4 text-[15px] font-bold px-8 py-4 max-w-[90%] rounded-[0_999px_999px_0] capitalize hover:bg-main-purple hover:bg-opacity-10 hover:text-main-purple",
              {
                "hover:bg-white hover:bg-opacity-100": isDark && !isActive,
                "bg-main-purple text-white hover:bg-opacity-100 hover:text-white":
                  isActive,
              }
            )}
          >
            <IconBoard
              fill={isActive ? "#FFF" : "#828FA3"}
              className={cn("text-lg group-hover:fill-main-purple", {
                "group-hover:fill-white": isActive,
              })}
            />
            {slug.split("-").join(" ")}
          </Link>
        </li>
      );
    });

  function handleCreateBoard() {
    if (userId) {
      setCreatedBoard(true);
      return;
    }
    return router.push("/sign-in");
  }

  return (
    <aside
      className={`md:w-[35%] lg:w-[20%] justify-between transition-colors text-medium-grey shadow hidden md:flex ${
        !showSidebar && "translate-x-[-100%] absolute"
      }  ${isDark ? "bg-dark-grey" : "bg-white"}`}
    >
      <div className="flex flex-col justify-between w-full h-full pt-6">
        <ul className="flex flex-col">
          <h4 className="px-8 text-xs font-bold uppercase text-medium-grey tracking-[2.4px] mb-5">
            All Boards {boardLength}
          </h4>
          {navList}
          <button
            className={cn(
              "lg:max-w-[90%] flex items-center gap-4 px-8 py-4 text-base font-bold text-main-purple rounded-[0_999px_999px_0] hover:bg-opacity-10 hover:text-main-purple hover:bg-main-purple",
              {
                "hover:bg-white hover:bg-opacity-100": isDark,
              }
            )}
            type="button"
            onClick={handleCreateBoard}
          >
            <IconBoard fill="#635FC7" className="text-lg" />
            <span>+ Create New Board</span>
          </button>
        </ul>
        <div className="flex flex-col gap-6 pb-12">
          <ThemeSwitcher />
          <button
            className={cn(
              "flex items-center gap-4 px-8 text-base font-bold text-medium-grey hover:bg-opacity-10 hover:text-main-purple hover:bg-main-purple rounded-[0_999px_999px_0] max-w-[90%] py-4",
              {
                "hover:bg-white hover:bg-opacity-100": isDark,
              }
            )}
            type="button"
            onClick={() => setShowSidebar(!showSidebar)}
          >
            <IconHideSidebar /> <span>Hide Sidebar</span>
          </button>
        </div>
      </div>
      <div
        className={`h-full w-[1px] transition-colors ${
          isDark ? "bg-lines-dark" : "bg-lines-light"
        }`}
      />
    </aside>
  );
}
