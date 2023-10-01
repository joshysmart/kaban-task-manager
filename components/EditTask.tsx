import React, { use } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useOnClickOutside } from "usehooks-ts";
import { ButtonPrimary, ButtonSecondary } from "./ui/buttons";
import { IconCross } from "@/app/assets/icons";
import { cn } from "@/lib/utils";
import Select from "./Select";
import Input from "./ui/input/Input";
import { Textarea } from "./ui/input";

type Props = {
  task: Board["columns"][number]["tasks"][number];
  isDark: boolean;
  setEditTask: React.Dispatch<React.SetStateAction<boolean>>;
  boardColumns?: Board["columns"];
};

type FormValues = {
  title: string;
  description: string;
  subtasks: {
    title: string;
    isCompleted?: boolean;
  }[];
};

export default function EditTask({ task, isDark, setEditTask }: Props) {
  const ref: React.MutableRefObject<null> = React.useRef(null);

  const {
    register,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      title: task.title,
      description: task.description,
      subtasks: task.subtasks,
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "subtasks",
  });
  const selectDropdownOptions = boardColumns.map((column) => column.name);

  useOnClickOutside(ref, () => setEditTask(false));

  return (
    <div className="fixed top-0 flex right-0 items-center justify-center w-full h-screen bg-overlay z-[60] px-4 md:px-0">
      <form
        className={`md:w-[70%] lg:w-[33%] w-full p-6 md:p-8 rounded-md z-[70] max-h-[675px] overflow-y-scroll ${
          isDark ? "bg-dark-grey" : "bg-white"
        }`}
        ref={ref}
      >
        <h3
          className={`text-lg font-bold ${
            isDark ? "text-white" : "text-black"
          }`}
        >
          Edit Task
        </h3>

        <fieldset className="flex flex-col gap-2 mt-6">
          <label
            htmlFor="title"
            className={`text-xs font-bold ${
              isDark ? "text-white" : "text-medium-grey"
            }`}
          >
            Title
          </label>
          <Input
            isDark={isDark}
            label="title"
            register={register}
            requiredMessage="Please enter a title for the task"
            maxLength={20}
            maxLengthMessage="Task title cannot be more than 20 characters"
          />
          {errors.title && (
            <p className="text-xs text-red">{errors.title.message}</p>
          )}
        </fieldset>

        <fieldset className="flex flex-col gap-2 mt-6">
          <label
            htmlFor="description"
            className={`text-xs font-bold ${
              isDark ? "text-white" : "text-medium-grey"
            }`}
          >
            Description
          </label>
          <Textarea
            label="description"
            register={register}
            requiredMessage="Please enter a description for the task"
            maxLength={200}
            maxLengthMessage="Task title cannot be more than 200 characters"
            placeholder="e.g. It's always good to take a break. This 15 minute break will 
              recharge the batteries a little."
            isDark={isDark}
          />
          {errors.description && (
            <p className="text-xs text-red">{errors.description.message}</p>
          )}
        </fieldset>

        <fieldset className="flex flex-col gap-2 mt-6">
          <label
            htmlFor="subtask"
            className={`text-xs font-bold ${
              isDark ? "text-white" : "text-medium-grey"
            }`}
          >
            Subtasks
          </label>
          <div className="flex flex-col gap-3">
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-4">
                <Input
                  label={`subtasks.${index}.title`}
                  register={register}
                  maxLength={150}
                  requiredMessage="Please enter a subtask"
                  maxLengthMessage="Subtask cannot be more than 150 characters"
                  placeholder="e.g. Make coffee"
                  isDark={isDark}
                  className="w-full"
                />
                <button type="button" onClick={() => remove(index)}>
                  <IconCross />
                </button>
              </div>
            ))}
            {errors.subtasks && (
              <p className="text-xs text-red">{errors.subtasks.message}</p>
            )}
            <ButtonSecondary
              isDark={isDark}
              name="+ Add New Subtask"
              handleClick={() => append({ title: "", isCompleted: false })}
              type="button"
              className="mt-3"
            />
          </div>
        </fieldset>

        <fieldset className="flex flex-col gap-2">
          <p
            className={cn("mt-4 text-xs font-medium text-medium-grey", {
              "text-white": isDark,
            })}
          >
            Status
          </p>
          <Select options={selectDropdownOptions} isDark={isDark} />
        </fieldset>

        <fieldset className="flex flex-col w-full mt-6">
          <ButtonPrimary type="submit">Create Task</ButtonPrimary>
        </fieldset>
      </form>
    </div>
  );
}
