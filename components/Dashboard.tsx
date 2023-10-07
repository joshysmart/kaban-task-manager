import React from "react";
import EmptyBoard from "./EmptyBoard";
import BoardColumns from "./BoardColumns";

type Props = {
  board?: Board;
  user?: any;
};

export default function Dashboard({ board, user }: Props) {
  return (
    <div className="h-full dashboard">
      {board && board?.columns?.length !== 0 ? (
        <BoardColumns board={board} />
      ) : (
        <EmptyBoard board={board} />
      )}
    </div>
  );
}
