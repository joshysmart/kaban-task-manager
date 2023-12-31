import { useThemeContext } from "@/contexts/theme-provider";
import React from "react";
import { ViewTask, EditTask, DeleteModal } from ".";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { deleteTask } from "@/app/api";
import Box from "./Box";

type Task = Board["columns"][number]["tasks"][number];

type Props = {
  task: Task;
  board?: Board;
  index: number;
};

export default function TaskCard({ task, board, index }: Props) {
  const [viewTask, setViewTask] = React.useState(false);
  const [editTask, setEditTask] = React.useState(false);
  const [showDeleteTask, setShowDeleteTask] = React.useState(false);
  const themeContext = useThemeContext();
  const isDark = themeContext.theme === "dark";

  const router = useRouter();
  const { userId, getToken } = useAuth();

  async function handleDeleteTask() {
    console.log("delete task");

    const token = await getToken();
    if (!userId) {
      return router.push("/sign-in");
    }
    const deletedTask = {
      taskId: task._id,
      status: task.status,
    };
    await deleteTask(token, deletedTask);
    router.refresh();
    setShowDeleteTask(false);
  }

  return (
    <>
      <Box
        isDark={isDark}
        task={task}
        setViewTask={setViewTask}
        type="task"
        index={index}
      />
      {viewTask && (
        <ViewTask
          task={task}
          isDark={isDark}
          setViewTask={setViewTask}
          setEditTask={setEditTask}
          setDeleteTask={setShowDeleteTask}
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
      {showDeleteTask && (
        <DeleteModal
          isDark={isDark}
          title="Delete this task?"
          setShowDeleteModal={setShowDeleteTask}
          description={`Are you sure you want to delete the '${task.title}' task and its subtasks? This action cannot be reversed.`}
          handleDelete={handleDeleteTask}
        />
      )}
    </>
  );
}
