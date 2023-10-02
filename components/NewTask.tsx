import { IconCross } from "@/app/assets/icons";
import React from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { useOnClickOutside } from "usehooks-ts";
import Select from "./Select";
import { cn } from "@/lib/utils";
import { ButtonPrimary, ButtonSecondary } from "./ui/buttons";
import { Input, Textarea } from "./ui/input";
import { createTask } from "@/app/api";
import { useRouter } from "next/navigation";

type Props = {
  setShowAddNewTask: React.Dispatch<React.SetStateAction<boolean>>;
  isDark: boolean;
  boardColumns?: Board["columns"];
  boardId?: string;
  user: any;
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

export default function NewTask({
  setShowAddNewTask,
  isDark,
  user,
  boardColumns,
  boardId,
}: Props) {
  const router = useRouter();
  const ref: React.MutableRefObject<null> = React.useRef(null);
  const {
    register,
    setValue,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      title: "",
      description: "",
      subtasks: [
        {
          title: "",
          isCompleted: false,
        },
        {
          title: "",
          isCompleted: false,
        },
      ],
      status: boardColumns?.[0].name,
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "subtasks",
  });
  const selectDropdownOptions =
    boardColumns?.map((column) => column.name) ?? [];

  useOnClickOutside(ref, () => setShowAddNewTask(false));

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const url = `${process.env.NEXT_PUBLIC_DB_HOST}/user/task`;
    const task = {
      ...data,
      userId: user?.id,
      id: boardId,
    };

    const res = await createTask(url, task);
    router.refresh();
    if (res) {
      setShowAddNewTask(false);
    }
  };

  return (
    <div className="fixed top-0 flex items-center justify-center w-full h-screen bg-overlay z-[60] px-4 md:px-0">
      <form
        className={`md:w-[70%] lg:w-[34%] w-full p-6 md:p-8 rounded-md z-[70] max-h-[675px] overflow-y-scroll ${
          isDark ? "bg-dark-grey" : "bg-white"
        }`}
        ref={ref}
        onSubmit={handleSubmit(onSubmit)}
      >
        <h3
          className={`text-lg font-bold ${
            isDark ? "text-white" : "text-black"
          }`}
        >
          Add New Task
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
            maxLength={50}
            maxLengthMessage="Task title cannot be more than 20 characters"
            requiredMessage="Please enter a title for the task"
            placeholder="e.g. Take a 15 minute break"
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
            maxLength={200}
            requiredMessage="Please enter a description for the task"
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
                  maxLength={150}
                  maxLengthMessage="subtask cannot be more than 150 characters"
                  requiredMessage="Please enter subtask"
                  register={register}
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
          <Select
            options={selectDropdownOptions}
            isDark={isDark}
            register={register}
            setValue={setValue}
          />
        </fieldset>

        <fieldset className="flex flex-col w-full mt-6">
          <ButtonPrimary type="submit">Create Task</ButtonPrimary>
        </fieldset>
      </form>
    </div>
  );
}
