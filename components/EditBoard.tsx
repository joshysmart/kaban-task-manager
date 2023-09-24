import { IconCross } from "@/app/assets/icons";
import React from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { useOnClickOutside } from "usehooks-ts";
import { ButtonPrimary, ButtonSecondary } from "./ui/buttons";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { Input } from "./ui/input";

type Props = {
  board?: Board;
  setShowEditBoard: React.Dispatch<React.SetStateAction<boolean>>;
  isDark: boolean;
};

type FormValues = {
  name: string;
  columns: {
    name: string;
  }[];
};

export default function EditBoard({ board, setShowEditBoard, isDark }: Props) {
  const ref = React.useRef(null);
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      name: board?.name,
      columns: board?.columns,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "columns",
  });
  const router = useRouter();
  const { userId } = useAuth();

  useOnClickOutside(ref, () => setShowEditBoard(false));

  function handleEditBoard(data: FormValues, id?: string) {
    if (!userId) {
      return router.push("/sign-in");
    }
  }

  return (
    <div className="fixed right-0 top-0 flex items-center justify-center w-full h-screen bg-overlay z-[60] px-4 md:px-0">
      <form
        className={`md:w-[70%] w-full lg:w-[33%] p-6 md:p-8 rounded-md z-[70] max-h-[500px] overflow-y-scroll ${
          isDark ? "bg-dark-grey" : "bg-white"
        }`}
        ref={ref}
        onSubmit={handleSubmit((data) => handleEditBoard(data, board?.id))}
      >
        <h3
          className={`text-lg font-bold ${
            isDark ? "text-white" : "text-black"
          }`}
        >
          Edit Board
        </h3>

        <fieldset className="flex flex-col gap-2 mt-6">
          <label
            htmlFor="name"
            className={`text-xs font-bold ${
              isDark ? "text-white" : "text-medium-grey"
            }`}
          >
            Board Name
          </label>
          <Input
            register={register}
            label="name"
            maxLength={20}
            placeholder="e.g. Web Design"
            isDark={isDark}
            maxLengthMessage="Board name cannot be more than 20 characters"
            requiredMessage="Please enter a name for the board"
          />
          {errors.name && (
            <p className="text-xs text-red">{errors.name.message}</p>
          )}
        </fieldset>
        <fieldset className="flex flex-col gap-2 mt-6">
          <label
            htmlFor="name"
            className={`text-xs font-bold ${
              isDark ? "text-white" : "text-medium-grey"
            }`}
          >
            Board Columns
          </label>
          <div className="flex flex-col gap-3">
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-4">
                <Input
                  label={`columns.${index}.name`}
                  maxLength={20}
                  register={register}
                  placeholder="e.g. Web Design"
                  className="w-full"
                  isDark={isDark}
                  maxLengthMessage="Column name cannot be more than 20 characters"
                  requiredMessage="Please enter a name for the column"
                />
                <button type="button" onClick={() => remove(index)}>
                  <IconCross />
                </button>
              </div>
            ))}
            {errors.columns && (
              <p className="text-xs text-red">{errors.columns.message}</p>
            )}
            <ButtonSecondary
              isDark={isDark}
              name="+ Add New Column"
              handleClick={() => append({ name: "Column" })}
              type="button"
              className="mt-3"
            />
          </div>
        </fieldset>

        <fieldset className="flex flex-col w-full mt-6">
          <ButtonPrimary type="submit">Save Changes</ButtonPrimary>
        </fieldset>
      </form>
    </div>
  );
}
