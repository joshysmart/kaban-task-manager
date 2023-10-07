import { IconCheck, IconVerticalEllipsis } from "@/app/assets/icons";
import React from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import Select from "./Select";
import { useOnClickOutside } from "usehooks-ts";
import { cn } from "@/lib/utils";
import TaskOptions from "./TaskOptions";
import { useAuth } from "@clerk/nextjs";
import { editTask } from "@/app/api";
import { useRouter } from "next/navigation";

type Props = {
  task: Board["columns"][number]["tasks"][number];
  isDark: boolean;
  boardColumns?: Board["columns"];
  setViewTask: React.Dispatch<React.SetStateAction<boolean>>;
  setEditTask: React.Dispatch<React.SetStateAction<boolean>>;
  setDeleteTask: React.Dispatch<React.SetStateAction<boolean>>;
};

type FormValues = {
  title: string;
  description: string;
  subtasks: {
    title: string;
    isCompleted: boolean;
  }[];
  status: string;
};

//type FormValues = {
//  subtasks: {
//    title: string;
//    isCompleted: boolean;
//  }[];
//  status: string;
//};
//
export default function ViewTask({
  task,
  isDark,
  boardColumns,
  setViewTask,
  setEditTask,
  setDeleteTask,
}: Props) {
  const { getToken } = useAuth();
  const router = useRouter();
  const ref = React.useRef(null);
  const [viewOptions, setViewOptions] = React.useState(false);
  const {
    register,
    setValue,
    watch,
    control,
    formState: {},
  } = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      subtasks: task.subtasks,
      status: task.status,
    },
  });
  const { fields } = useFieldArray({
    control,
    name: "subtasks",
  });
  const watchFieldArray = watch("subtasks");
  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      ...watchFieldArray[index],
    };
  });
  const selectDropdownOptions =
    boardColumns?.map((column) => column.name) ?? [];

  useOnClickOutside(ref, () => setViewTask(false));

  React.useEffect(() => {
    const subscription = watch(async (data) => {
      const token = await getToken();
      const updatedTask = {
        ...(data as FormValues),
        title: task.title,
        description: task.description,
        taskId: task._id,
        oldStatus: task.status,
      };

      await editTask(token, updatedTask);
      router.refresh();
    });

    return () => subscription.unsubscribe();
  }, [watch, task, router, getToken]);

  return (
    <div className="fixed top-0 left-0 flex items-center justify-center w-full h-screen bg-overlay z-[60] overflow-y-scroll pb-8 px-4 md:px-0">
      <div
        className={`md:w-[70%] lg:w-[34%] w-full  md:p-8 p-6 rounded-md z-[70] ${
          isDark ? "bg-dark-grey" : "bg-white"
        }`}
        ref={ref}
      >
        <div className="flex items-center justify-between gap-6">
          <h3
            className={`text-lg font-bold ${
              isDark ? "text-white" : "text-black"
            }`}
          >
            {task.title}
          </h3>
          <div className="relative">
            <button
              className=""
              type="button"
              onClick={() => setViewOptions(!viewOptions)}
            >
              <IconVerticalEllipsis />
            </button>
            {viewOptions && (
              <TaskOptions
                isDark={isDark}
                setViewOptions={setViewOptions}
                setEditTask={setEditTask}
                setViewTask={setViewTask}
                setDeleteTask={setDeleteTask}
              />
            )}
          </div>
        </div>
        <p className="text-medium-grey text-[13px] font-medium mt-6">
          {task.description}
        </p>
        <p className="mt-6 text-xs font-bold">
          Subtasks (
          {controlledFields.filter((field) => field.isCompleted).length} of{" "}
          {controlledFields.length})
        </p>
        <form action="" className="flex flex-col gap-2 mt-4">
          {controlledFields.map((field, index) => (
            <fieldset
              key={field.id}
              className={cn("rounded p-3 bg-light-grey-light-bg text-black", {
                "bg-very-dark-grey-dark-bg text-white": isDark,
                "hover:bg-main-purple group hover:bg-opacity-25":
                  !field.isCompleted,
              })}
            >
              <label
                htmlFor={field.id}
                className={cn(
                  "items-center flex gap-4 text-xs font-bold cursor-pointer text-medium-grey",
                  {
                    "text-white": isDark,
                  }
                )}
              >
                <input
                  {...register(`subtasks.${index}.isCompleted`)}
                  type="checkbox"
                  id={field.id}
                  hidden
                  className="peer"
                />
                <span
                  className={`flex items-center justify-center min-w-[16px] h-4 rounded-sm border border-checkbox-border peer-checked:border-0 peer-checked:bg-main-purple ${
                    isDark ? "bg-dark-grey" : "bg-white"
                  }`}
                >
                  {field.isCompleted && <IconCheck />}
                </span>
                <span
                  className={cn("opacity-50 group-hover:opacity-100", {
                    "line-through": field.isCompleted,
                  })}
                >
                  {field.title}
                </span>
              </label>
            </fieldset>
          ))}

          <p
            className={cn("mt-4 text-xs font-medium text-medium-grey", {
              "text-white": isDark,
            })}
          >
            Current Status
          </p>
          <Select
            options={selectDropdownOptions}
            isDark={isDark}
            register={register}
            setValue={setValue}
          />
        </form>
      </div>
    </div>
  );
}
