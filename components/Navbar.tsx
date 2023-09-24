"use client";
import React from "react";
import {
    IconAddTaskMobile,
    IconChevronDown,
    IconChevronUp,
    IconVerticalEllipsis,
    LogoDark,
    LogoLight,
    LogoMobile,
} from "@/app/assets/icons";
import { usePathname, useRouter } from "next/navigation";
import BoardOptions from "./BoardOptions";
import { useNavHeightContext, useThemeContext } from "@/contexts";
import { useAuth } from "@clerk/nextjs";
import { ButtonPrimary } from "./ui/buttons";
import MobileNav from "./MobileNav";

type Props = {
    board: Board;
    createdBoard: boolean;
    boardNames?: {
        _id: string;
        slug: string;
    }[];
    setCreatedBoard: React.Dispatch<React.SetStateAction<boolean>>;
    setShowAddNewTask: React.Dispatch<React.SetStateAction<boolean>>;
    setShowEditBoard: React.Dispatch<React.SetStateAction<boolean>>;
    setShowDeleteBoard: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Navbar({
    board,
    createdBoard,
    boardNames,
    setCreatedBoard,
    setShowAddNewTask,
    setShowEditBoard,
    setShowDeleteBoard,
}: Props) {
    const pathname = usePathname();
    const navbarEl: React.RefObject<HTMLDivElement> = React.useRef(null);
    const { setNavbarHeight, navbarHeight } = useNavHeightContext();
    const { theme } = useThemeContext();
    const isDark = theme === "dark";
    const selectedBoard = pathname.replace("/", "").split("-").join(" ");
    const [showDropDown, setShowDropDown] = React.useState(false);
    const { userId } = useAuth();
    const router = useRouter();
    const [showMobileNav, setShowMobileNav] = React.useState(false);
    // const isEmptyBoard = board.columns.length === 0 || !board;
    const isEmptyBoard = true;

    React.useEffect(() => {
        if (navbarEl.current) {
            setNavbarHeight(navbarEl.current.clientHeight);
        }
    }, [setNavbarHeight]);

    function handleAddNewTask() {
        if (userId) {
            setShowAddNewTask((prev) => !prev);
            return;
        }
        return router.push("/sign-in");
    }

    return (
        <nav
            className={`fixed top-0 right-0 w-full transition-colors h-24 flex items-center ${
                isDark ? "bg-dark-grey text-white" : "bg-white text-black"
            } z-50`}
            ref={navbarEl}
        >
            <div className="md:w-[35%] lg:w-[20%] flex justify-between h-full">
                <div className="flex items-center px-4 md:px-5 lg:px-6">
                    <div className="hidden md:block">
                        {isDark ? <LogoLight /> : <LogoDark />}
                    </div>
                    <div className="md:hidden">
                        <LogoMobile />
                    </div>
                </div>
                <div
                    className={`h-full w-[1px] transition-colors hidden md:block ${
                        isDark ? "bg-lines-dark" : "bg-lines-light"
                    }`}
                />
            </div>
            <div className="flex items-center justify-between pr-4 w-full md:w-[65%] lg:w-[80%] md:px-6 lg:px-8 relative">
                <div
                    className="flex items-center gap-2 cursor-pointer"
                    role="button"
                    onClick={() => setShowMobileNav((prev) => !prev)}
                >
                    <h1 className="text-lg font-bold capitalize md:text-xl lg:text-2xl">
                        {selectedBoard}
                    </h1>
                    {showMobileNav ? (
                        <IconChevronUp className="md:hidden" />
                    ) : (
                        <IconChevronDown className="md:hidden" />
                    )}
                </div>
                <div className="relative flex items-center gap-4 md:gap-5">
                    <div className="hidden md:block">
                        <ButtonPrimary
                            className="px-5 py-[14px] disabled:bg-main-purple-hover disabled:cursor-not-allowed"
                            handleClick={handleAddNewTask}
                            type="button"
                            disabled={isEmptyBoard}
                        >
                            + Add New Task
                        </ButtonPrimary>
                    </div>
                    <div className="md:hidden">
                        <ButtonPrimary
                            className="px-5 py-[14px]"
                            handleClick={handleAddNewTask}
                            type="button"
                        >
                            <IconAddTaskMobile />
                        </ButtonPrimary>
                    </div>
                    <button
                        className=""
                        type="button"
                        onClick={() => setShowDropDown(!showDropDown)}
                    >
                        <IconVerticalEllipsis />
                    </button>
                    {showDropDown && (
                        <BoardOptions
                            setShowDropDown={setShowDropDown}
                            isDark={isDark}
                            setShowEditBoard={setShowEditBoard}
                            setShowDeleteBoard={setShowDeleteBoard}
                        />
                    )}
                </div>
            </div>
            {showMobileNav && (
                <div
                    className="fixed bottom-0 w-full bg-[#00000080] md:hidden flex justify-center"
                    style={{
                        height: `calc(100vh - ${navbarHeight}px)`,
                    }}
                >
                    <MobileNav
                        setCreatedBoard={setCreatedBoard}
                        setShowMobileNav={setShowMobileNav}
                        showMobileNav={showMobileNav}
                        boardNames={boardNames}
                        isDark={isDark}
                    />
                </div>
            )}
        </nav>
    );
}
