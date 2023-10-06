"use client";
import { useThemeContext } from "@/contexts/theme-provider";
import React from "react";
import { ViewTask, EditTask, DeleteModal } from ".";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

type Props = {
  task: Board["columns"][number]["tasks"][number];
  board?: Board;
};

export default function TaskCard({ task, board }: Props) {
  const [viewTask, setViewTask] = React.useState(false);
  const [editTask, setEditTask] = React.useState(false);
  const [deleteTask, setDeleteTask] = React.useState(false);
  const themeContext = useThemeContext();
  const isDark = themeContext.theme === "dark";

  const completedSubTasks = task.subtasks.filter(
    (subtask) => subtask.isCompleted
  ).length;
  const numberOfTasks = task.subtasks.length;

  const router = useRouter();
  const { userId } = useAuth();

  function handleDeleteTask() {
    if (!userId) {
      return router.push("/sign-in");
    }
  }

  return (
    <>
      <div
        className={`py-[23px] px-4 flex flex-col gap-2 w-[280px] shadow-card-shadow transition-colors rounded-lg ${
          isDark ? "bg-dark-grey" : "bg-white"
        }`}
        role="button"
        onClick={() => setViewTask(true)}
      >
        <p
          className={`text-base font-bold transition-colors ${
            isDark ? "text-white" : "text-black"
          }`}
        >
          {" "}
          {task.title}
        </p>
        <p className="text-xs font-bold text-medium-grey">
          {completedSubTasks} of {numberOfTasks} subtasks
        </p>
      </div>
      {viewTask && (
        <ViewTask
          task={task}
          isDark={isDark}
          setViewTask={setViewTask}
          setEditTask={setEditTask}
          setDeleteTask={setDeleteTask}
          boardColumns={board?.columns}
        />
      )}
      {editTask && (
        <EditTask
          task={task}
          isDark={isDark}
          setEditTask={setEditTask}
          boardColumns={board?.columns}
          boardId={board?._id}
        />
      )}
      {deleteTask && (
        <DeleteModal
          isDark={isDark}
          title="Delete this task?"
          setShowDeleteModal={setDeleteTask}
          description="Are you sure you want to delete the ‘Build settings UI’ task and its subtasks? This action cannot be reversed."
          handleDelete={handleDeleteTask}
        />
      )}
    </>
  );
}
