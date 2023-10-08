"use client";
import React from "react";
import Col from "./Col";
import NewColumn from "./NewColumn";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { editTask } from "@/app/api";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { toast } from "react-toastify";

type Props = {
  board?: Board;
};

type Column = Board["columns"][0];
type Task = Column["tasks"][0];

export default function BoardColumns({ board }: Props) {
  const [columns, setColumns] = React.useState(board?.columns);
  const router = useRouter();
  const { getToken } = useAuth();

  const handleDrop = React.useCallback(
    async (
      index: number,
      item: {
        task: Task;
        columnIndex: number;
      }
    ) => {
      const draggedTaskIndex = columns?.[item.columnIndex]?.tasks?.findIndex(
        (task) => task._id === item.task._id
      ) as number;
      const token = await getToken();

      columns?.[item.columnIndex].tasks.splice(draggedTaskIndex, 1);
      columns?.[index].tasks.push(item.task);
      setColumns([...(columns ?? [])]);

      const updatedTask = {
        ...item.task,
        taskId: item.task._id,
        status: columns?.[index].name as string,
        oldStatus: columns?.[item.columnIndex].name as string,
      };
      await editTask(token, updatedTask);
      router.refresh();
      toast("Wow so easy! Board updated");
    },
    []
  );

  return (
    <div className="flex gap-6 p-4 py-6 overflow-x-scroll md:p-6">
      <DndProvider backend={HTML5Backend}>
        {columns?.map((col: Column, i: number) => (
          <Col
            col={col}
            index={i}
            key={col.name}
            board={board}
            ondDrop={(item) => handleDrop(i, item)}
          />
        ))}
      </DndProvider>
      <NewColumn board={board} />
    </div>
  );
}
