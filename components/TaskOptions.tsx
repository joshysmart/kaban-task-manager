import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React from "react";
import { useOnClickOutside } from "usehooks-ts";

type Props = {
  isDark: boolean;
  setViewOptions: React.Dispatch<React.SetStateAction<boolean>>;
  setEditTask: React.Dispatch<React.SetStateAction<boolean>>;
  setViewTask: React.Dispatch<React.SetStateAction<boolean>>;
  setDeleteTask: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function TaskOptions({
  isDark,
  setViewOptions,
  setEditTask,
  setViewTask,
  setDeleteTask,
}: Props) {
  const ref = React.useRef(null);
  const { userId } = useAuth();
  const router = useRouter();

  useOnClickOutside(ref, () => setViewOptions(false));

  function handleEditTask() {
    if (userId) {
      setViewOptions(false);
      setViewTask(false);
      setEditTask(true);
      return;
    }
    return router.push("/sign-in");
  }

  function handleDeleteTask() {
    setViewTask(false);
    setDeleteTask(true);
  }

  return (
    <div
      className={cn(
        "absolute top-[calc(100%+.5rem)] left-[-90px] shadow rounded-lg w-[192px] flex flex-col gap-4 bg-white p-4",
        {
          "bg-very-dark-grey-dark-bg": isDark,
        }
      )}
      ref={ref}
    >
      <button
        type="button"
        className="text-[13px] font-medium leading-6 text-medium-grey text-left"
        onClick={() => handleEditTask()}
      >
        Edit Task
      </button>
      <button
        type="button"
        className="text-red text-[13px] font-medium leading-6 text-left"
        onClick={handleDeleteTask}
      >
        Delete Task
      </button>
    </div>
  );
}
