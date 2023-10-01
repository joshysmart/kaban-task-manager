"use client";
import { useThemeContext } from "@/contexts";
import React from "react";
import EditBoard from "./EditBoard";

type Props = {
  board?: Board;
};

export default function NewColumn({ board }: Props) {
  const { theme } = useThemeContext();
  const isDark = theme === "dark";
  const [showEditBoard, setShowEditBoard] = React.useState(false);

  return (
    <>
      <div
        className={`min-w-[280px] flex items-center mt-[39px] rounded-md flex-col justify-center gap-3 min-h-[80dvh] shadow-card-shadow transition-all ${
          isDark
            ? "bg-new-column-gradient-dark"
            : "bg-new-column-gradient-light"
        }`}
      >
        <button
          className="text-2xl font-bold text-medium-grey hover:text-main-purple"
          onClick={() => setShowEditBoard(true)}
        >
          + New Column
        </button>
      </div>
      {showEditBoard && (
        <EditBoard
          setShowEditBoard={setShowEditBoard}
          isDark={isDark}
          board={board}
        />
      )}
    </>
  );
}
