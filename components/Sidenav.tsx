"use client";
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
                                "hover:bg-white hover:bg-opacity-100":
                                    isDark && !isActive,
                                "bg-main-purple text-white hover:bg-opacity-100 hover:text-white":
                                    isActive,
                            }
                        )}
                    >
                        <IconBoard
                            fill={isActive ? "#FFF" : "#828FA3"}
                            className={cn(
                                "text-lg group-hover:fill-main-purple",
                                {
                                    "group-hover:fill-white": isActive,
                                }
                            )}
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

// export const LogoLight = () => <svg width="153" height="26" xmlns="http://www.w3.org/2000/svg"><g fill="none" fillRule="evenodd"><path d="M44.56 25v-5.344l1.92-2.112L50.928 25h5.44l-6.304-10.432 6.336-7.04h-5.92l-5.92 6.304V.776h-4.8V25h4.8Zm19.36.384c2.176 0 3.925-.672 5.248-2.016V25h4.48V13.48c0-1.259-.315-2.363-.944-3.312-.63-.95-1.51-1.69-2.64-2.224-1.13-.533-2.432-.8-3.904-.8-1.856 0-3.483.427-4.88 1.28-1.397.853-2.352 2.005-2.864 3.456l3.84 1.824a4.043 4.043 0 0 1 1.424-1.856c.65-.47 1.403-.704 2.256-.704.896 0 1.605.224 2.128.672.523.448.784 1.003.784 1.664v.48l-4.832.768c-2.09.341-3.648.992-4.672 1.952-1.024.96-1.536 2.176-1.536 3.648 0 1.579.55 2.816 1.648 3.712 1.099.896 2.587 1.344 4.464 1.344Zm.96-3.52c-.597 0-1.099-.15-1.504-.448-.405-.299-.608-.715-.608-1.248 0-.576.181-1.019.544-1.328.363-.31.885-.528 1.568-.656l3.968-.704v.544c0 1.067-.363 1.973-1.088 2.72-.725.747-1.685 1.12-2.88 1.12ZM81.968 25V14.792c0-1.003.299-1.808.896-2.416.597-.608 1.365-.912 2.304-.912.939 0 1.707.304 2.304.912.597.608.896 1.413.896 2.416V25h4.8V13.768c0-1.323-.277-2.48-.832-3.472a5.918 5.918 0 0 0-2.32-2.32c-.992-.555-2.15-.832-3.472-.832-1.11 0-2.09.208-2.944.624a4.27 4.27 0 0 0-1.952 1.904V7.528h-4.48V25h4.8Zm24.16.384c1.707 0 3.232-.405 4.576-1.216a8.828 8.828 0 0 0 3.184-3.296c.779-1.387 1.168-2.923 1.168-4.608 0-1.707-.395-3.248-1.184-4.624a8.988 8.988 0 0 0-3.2-3.28c-1.344-.81-2.848-1.216-4.512-1.216-2.112 0-3.787.619-5.024 1.856V.776h-4.8V25h4.48v-1.664c.619.661 1.392 1.168 2.32 1.52a8.366 8.366 0 0 0 2.992.528Zm-.576-4.32c-1.301 0-2.363-.443-3.184-1.328-.821-.885-1.232-2.043-1.232-3.472 0-1.408.41-2.56 1.232-3.456.821-.896 1.883-1.344 3.184-1.344 1.323 0 2.41.453 3.264 1.36.853.907 1.28 2.053 1.28 3.44 0 1.408-.427 2.56-1.28 3.456-.853.896-1.941 1.344-3.264 1.344Zm17.728 4.32c2.176 0 3.925-.672 5.248-2.016V25h4.48V13.48c0-1.259-.315-2.363-.944-3.312-.63-.95-1.51-1.69-2.64-2.224-1.13-.533-2.432-.8-3.904-.8-1.856 0-3.483.427-4.88 1.28-1.397.853-2.352 2.005-2.864 3.456l3.84 1.824a4.043 4.043 0 0 1 1.424-1.856c.65-.47 1.403-.704 2.256-.704.896 0 1.605.224 2.128.672.523.448.784 1.003.784 1.664v.48l-4.832.768c-2.09.341-3.648.992-4.672 1.952-1.024.96-1.536 2.176-1.536 3.648 0 1.579.55 2.816 1.648 3.712 1.099.896 2.587 1.344 4.464 1.344Zm.96-3.52c-.597 0-1.099-.15-1.504-.448-.405-.299-.608-.715-.608-1.248 0-.576.181-1.019.544-1.328.363-.31.885-.528 1.568-.656l3.968-.704v.544c0 1.067-.363 1.973-1.088 2.72-.725.747-1.685 1.12-2.88 1.12ZM141.328 25V14.792c0-1.003.299-1.808.896-2.416.597-.608 1.365-.912 2.304-.912.939 0 1.707.304 2.304.912.597.608.896 1.413.896 2.416V25h4.8V13.768c0-1.323-.277-2.48-.832-3.472a5.918 5.918 0 0 0-2.32-2.32c-.992-.555-2.15-.832-3.472-.832-1.11 0-2.09.208-2.944.624a4.27 4.27 0 0 0-1.952 1.904V7.528h-4.48V25h4.8Z" fill="#FFF" fillRule="nonzero" /><g transform="translate(0 1)" fill="#635FC7"><rect width="6" height="25" rx="2" /><rect opacity=".75" x="9" width="6" height="25" rx="2" /><rect opacity=".5" x="18" width="6" height="25" rx="2" /></g></g></svg>

// export const LogoDark = () => <svg width="153" height="26" xmlns="http://www.w3.org/2000/svg"><g fill="none" fillRule="evenodd"><path d="M44.56 25v-5.344l1.92-2.112L50.928 25h5.44l-6.304-10.432 6.336-7.04h-5.92l-5.92 6.304V.776h-4.8V25h4.8Zm19.36.384c2.176 0 3.925-.672 5.248-2.016V25h4.48V13.48c0-1.259-.315-2.363-.944-3.312-.63-.95-1.51-1.69-2.64-2.224-1.13-.533-2.432-.8-3.904-.8-1.856 0-3.483.427-4.88 1.28-1.397.853-2.352 2.005-2.864 3.456l3.84 1.824a4.043 4.043 0 0 1 1.424-1.856c.65-.47 1.403-.704 2.256-.704.896 0 1.605.224 2.128.672.523.448.784 1.003.784 1.664v.48l-4.832.768c-2.09.341-3.648.992-4.672 1.952-1.024.96-1.536 2.176-1.536 3.648 0 1.579.55 2.816 1.648 3.712 1.099.896 2.587 1.344 4.464 1.344Zm.96-3.52c-.597 0-1.099-.15-1.504-.448-.405-.299-.608-.715-.608-1.248 0-.576.181-1.019.544-1.328.363-.31.885-.528 1.568-.656l3.968-.704v.544c0 1.067-.363 1.973-1.088 2.72-.725.747-1.685 1.12-2.88 1.12ZM81.968 25V14.792c0-1.003.299-1.808.896-2.416.597-.608 1.365-.912 2.304-.912.939 0 1.707.304 2.304.912.597.608.896 1.413.896 2.416V25h4.8V13.768c0-1.323-.277-2.48-.832-3.472a5.918 5.918 0 0 0-2.32-2.32c-.992-.555-2.15-.832-3.472-.832-1.11 0-2.09.208-2.944.624a4.27 4.27 0 0 0-1.952 1.904V7.528h-4.48V25h4.8Zm24.16.384c1.707 0 3.232-.405 4.576-1.216a8.828 8.828 0 0 0 3.184-3.296c.779-1.387 1.168-2.923 1.168-4.608 0-1.707-.395-3.248-1.184-4.624a8.988 8.988 0 0 0-3.2-3.28c-1.344-.81-2.848-1.216-4.512-1.216-2.112 0-3.787.619-5.024 1.856V.776h-4.8V25h4.48v-1.664c.619.661 1.392 1.168 2.32 1.52a8.366 8.366 0 0 0 2.992.528Zm-.576-4.32c-1.301 0-2.363-.443-3.184-1.328-.821-.885-1.232-2.043-1.232-3.472 0-1.408.41-2.56 1.232-3.456.821-.896 1.883-1.344 3.184-1.344 1.323 0 2.41.453 3.264 1.36.853.907 1.28 2.053 1.28 3.44 0 1.408-.427 2.56-1.28 3.456-.853.896-1.941 1.344-3.264 1.344Zm17.728 4.32c2.176 0 3.925-.672 5.248-2.016V25h4.48V13.48c0-1.259-.315-2.363-.944-3.312-.63-.95-1.51-1.69-2.64-2.224-1.13-.533-2.432-.8-3.904-.8-1.856 0-3.483.427-4.88 1.28-1.397.853-2.352 2.005-2.864 3.456l3.84 1.824a4.043 4.043 0 0 1 1.424-1.856c.65-.47 1.403-.704 2.256-.704.896 0 1.605.224 2.128.672.523.448.784 1.003.784 1.664v.48l-4.832.768c-2.09.341-3.648.992-4.672 1.952-1.024.96-1.536 2.176-1.536 3.648 0 1.579.55 2.816 1.648 3.712 1.099.896 2.587 1.344 4.464 1.344Zm.96-3.52c-.597 0-1.099-.15-1.504-.448-.405-.299-.608-.715-.608-1.248 0-.576.181-1.019.544-1.328.363-.31.885-.528 1.568-.656l3.968-.704v.544c0 1.067-.363 1.973-1.088 2.72-.725.747-1.685 1.12-2.88 1.12ZM141.328 25V14.792c0-1.003.299-1.808.896-2.416.597-.608 1.365-.912 2.304-.912.939 0 1.707.304 2.304.912.597.608.896 1.413.896 2.416V25h4.8V13.768c0-1.323-.277-2.48-.832-3.472a5.918 5.918 0 0 0-2.32-2.32c-.992-.555-2.15-.832-3.472-.832-1.11 0-2.09.208-2.944.624a4.27 4.27 0 0 0-1.952 1.904V7.528h-4.48V25h4.8Z" fill="#000112" fillRule="nonzero" /><g transform="translate(0 1)" fill="#635FC7"><rect width="6" height="25" rx="2" /><rect opacity=".75" x="9" width="6" height="25" rx="2" /><rect opacity=".5" x="18" width="6" height="25" rx="2" /></g></g></svg>
