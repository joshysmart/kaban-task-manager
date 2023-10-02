import React from "react";
import { useOnClickOutside } from "usehooks-ts";
import { IconCross } from "@/app/assets/icons";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { ButtonPrimary, ButtonSecondary } from "./ui/buttons";
import { Input } from "./ui/input";
import { createBoard } from "@/app/api";
import { useRouter } from "next/navigation";

type Props = {
  user: any;
  isDark: boolean;
  setCreatedBoard: React.Dispatch<React.SetStateAction<boolean>>;
};

type FormValues = {
  name: string;
  columns: {
    name: string;
  }[];
};

export default function CreateBoard({ user, isDark, setCreatedBoard }: Props) {
  const router = useRouter();
  const ref = React.useRef(null);
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      name: "",
      columns: [
        {
          name: "Todo",
        },
        {
          name: "Doing",
        },
      ],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "columns",
  });
  useOnClickOutside(ref, () => setCreatedBoard(false));

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const url = `${process.env.NEXT_PUBLIC_DB_HOST}/user`;
    const board = {
      ...data,
      slug: data.name.toLowerCase().replace(/\s/g, "-"),
      user: user?.id,
    };
    const res = await createBoard(url, board);
    router.refresh();
    if (res) {
      setCreatedBoard(false);
    }
  };

  return (
    <div className="fixed top-0 right-0 flex items-center justify-center w-full h-screen bg-overlay z-[60] px-4 md:px-0">
      <form
        className={`md:w-[70%] w-full lg:w-[33%] p-6 md:p-8 rounded-md z-[70] max-h-[500px] overflow-y-scroll ${
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
          Add New Board
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
            label="name"
            register={register}
            maxLength={20}
            requiredMessage="Please enter a name for the board"
            maxLengthMessage="Board name cannot be more than 20 characters"
            placeholder="e.g. Web Design"
            isDark={isDark}
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
                  isDark={isDark}
                  register={register}
                  label={`columns.${index}.name`}
                  maxLength={20}
                  requiredMessage="Please enter a name for the column"
                  maxLengthMessage="Column name cannot be more than 20 characters"
                  placeholder="e.g. Web Design"
                  className="w-full"
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
          <ButtonPrimary type="submit">Create New Board</ButtonPrimary>
        </fieldset>
      </form>
    </div>
  );
}
