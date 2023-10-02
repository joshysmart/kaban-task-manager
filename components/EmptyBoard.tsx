"use client";
import React from "react";
import { ButtonPrimary } from "./ui/buttons";
import { useThemeContext } from "@/contexts";
import EditBoard from "./EditBoard";
import CreateBoard from "./CreateBoard";

type Props = {
  board?: Board;
  user: any;
};

export default function EmptyBoard({ board, user }: Props) {
  const { theme } = useThemeContext();
  const isDark = theme === "dark";
  const [showEditBoard, setShowEditBoard] = React.useState(false);
  const [createdBoard, setCreatedBoard] = React.useState(false);

  return (
    <>
      <div className="flex items-center justify-center h-full">
        <div className="flex flex-col items-center gap-6 px-4 md:px-6">
          {board ? (
            <p className="text-lg font-bold text-center text-medium-grey">
              This board is empty. Create a new column to get started.
            </p>
          ) : (
            <p className="text-lg font-bold text-center text-medium-grey">
              There are no boards yet. Create a new board to get started.
            </p>
          )}
          {board ? (
            <ButtonPrimary
              className="px-4 py-3"
              handleClick={() => setShowEditBoard(true)}
            >
              + Add New Column
            </ButtonPrimary>
          ) : (
            <ButtonPrimary
              className="px-4 py-3"
              handleClick={() => setCreatedBoard(true)}
            >
              + Create New Board{" "}
            </ButtonPrimary>
          )}
        </div>
      </div>
      {showEditBoard && (
        <EditBoard
          setShowEditBoard={setShowEditBoard}
          isDark={isDark}
          board={board}
          user={user}
        />
      )}
      {createdBoard && (
        <CreateBoard
          isDark={isDark}
          setCreatedBoard={setCreatedBoard}
          user={user}
        />
      )}
    </>
  );
}
