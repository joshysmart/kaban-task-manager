import { IconBoard } from "@/app/assets/icons";
import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import ThemeSwitcher from "./ThemeSwitcher";

type Props = {
  boardNames?: {
    _id: string;
    slug: string;
  }[];
  showMobileNav: boolean;
  isDark: boolean;
  setShowMobileNav: React.Dispatch<React.SetStateAction<boolean>>;
  setCreatedBoard: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function MobileNav({
  boardNames,
  showMobileNav,
  setShowMobileNav,
  setCreatedBoard,
  isDark,
}: Props) {
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
              "group flex items-center gap-4 text-[15px] font-bold px-6 py-4 max-w-[90%] rounded-[0_999px_999px_0] capitalize hover:bg-main-purple hover:bg-opacity-10 hover:text-main-purple",
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
      setShowMobileNav(false);
      return;
    }
    return router.push("/sign-in");
  }

  return (
    <div
      className={cn(
        "absolute top-4 flex flex-col justify-between w-[300px] pt-6 rounded-lg bg-white z-50",
        {
          "bg-dark-grey": isDark,
        }
      )}
    >
      <ul className="flex flex-col">
        <h4 className="px-8 text-xs font-bold uppercase text-medium-grey tracking-[2.4px] mb-5">
          All Boards {boardLength}
        </h4>
        {navList}
        <button
          className={cn(
            "max-w-[90%] flex items-center gap-4 px-8 py-4 text-base font-bold text-main-purple rounded-[0_999px_999px_0] hover:bg-opacity-10 hover:text-main-purple hover:bg-main-purple",
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
      <div className="flex flex-col gap-6 pb-4 md:pb-4">
        <ThemeSwitcher />
      </div>
    </div>
  );
}
