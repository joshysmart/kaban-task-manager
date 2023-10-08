import { cn } from "@/lib/utils";
import TaskCard from "./TaskCard";
import { useDrop } from "react-dnd";
import React from "react";

type Props = {
  col: Board["columns"][number];
  index: number;
  board?: Board;
  ondDrop: (item: any, monitor: any) => void;
};
export default function Col({ col, index, board, ondDrop }: Props) {
  const keyColors: {
    [key: number]: string;
  } = {
    0: "todo-blue",
    1: "doing-purple",
    2: "done-green",
  };
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: "task",
    drop: ondDrop,
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  }));
  const isActive = isOver && canDrop;

  return (
    <div
      ref={drop}
      className={cn("flex flex-col gap-6", {
        "border border-dashed border-input-border": isActive,
      })}
    >
      <div className="flex items-center gap-3 w-[280px]">
        <div
          className={`w-[15px] h-[15px] rounded-full bg-${keyColors[index]}`}
        />
        <p className="text-xs font-bold uppercase tracking-[2.4px] text-medium-grey">
          {col.name} ({col.tasks.length})
        </p>
      </div>
      <div className="flex flex-col gap-5">
        {col.tasks.map((task, i) => (
          <TaskCard
            task={task}
            key={`${task.description}${i}`}
            board={board}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
