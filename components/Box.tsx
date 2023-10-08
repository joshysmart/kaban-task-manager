import capitalize from "@/utils/capitalize";
import React from "react";
import { useDrag } from "react-dnd";

type Task = Board["columns"][number]["tasks"][number];

type BoxProps = {
  type: string;
  name: string;
  isDark: boolean;
  task: Task;
  index: number;
  setViewTask: React.Dispatch<React.SetStateAction<boolean>>;
};

const Box: React.FC<BoxProps> = React.memo(function Box({
  type,
  index,
  isDark,
  task,
  setViewTask,
}) {
  const completedSubTasks = task.subtasks.filter(
    (subtask) => subtask.isCompleted
  ).length;
  const numberOfTasks = task.subtasks.length;
  const [{ opacity }, drag] = useDrag(
    () => ({
      type,
      item: { task, columnIndex: index },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.9 : 1,
      }),
    }),
    [type]
  );

  return (
    <div
      ref={drag}
      className={`py-[23px] px-4 flex flex-col gap-2 w-[280px] shadow-card-shadow transition-colors rounded-lg cursor-move ${
        isDark ? "bg-dark-grey" : "bg-white"
      }`}
      role="button"
      title="Drag to move task or click to view"
      onClick={() => setViewTask(true)}
    >
      <p
        className={`text-base font-bold transition-colors ${
          isDark ? "text-white" : "text-black"
        }`}
      >
        {" "}
        {capitalize(task.title)}
      </p>
      <p className="text-xs font-bold text-medium-grey">
        {completedSubTasks} of {numberOfTasks} subtasks
      </p>
    </div>
  );
});

export default Box;
