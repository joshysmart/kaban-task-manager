import { IconChevronDown } from "@/app/assets/icons";
import { cn } from "@/lib/utils";
import React from "react";
import { UseFormRegister, useForm } from "react-hook-form";

type Props = {
  options: string[];
  isDark: boolean;
};

export default function Select({ options, isDark }: Props) {
  const { register } = useForm({
    defaultValues: {
      status: options[0],
    },
  });
  const [selected, setSelected] = React.useState(options[0]);
  const [dropDown, setDropDown] = React.useState(false);

  function handleSelect(option: string) {
    setSelected(option);
    setDropDown(false);
  }

  return (
    <div className="relative flex flex-col">
      <button
        className={cn(
          "flex items-center justify-between px-4 py-2 border rounded cursor-pointer border-input-border",
          {
            "border border-main-purple": dropDown,
          }
        )}
        onClick={() => setDropDown(!dropDown)}
        type="button"
      >
        <input
          type="text"
          id="status"
          value={selected}
          readOnly
          className={cn(
            "w-full cursor-pointer text-[13px] font-medium bg-white text-black focus:border-none focus:outline-main-purple",
            {
              "bg-dark-grey text-white": isDark,
            }
          )}
          {...register("status", { required: true })}
        />
        <IconChevronDown />
      </button>
      <ul
        className={cn(
          "w-full flex flex-col gap-2 absolute shadow p-4 top-[calc(100%+.5rem)] rounded bg-white",
          {
            "bg-very-dark-grey-dark-bg": isDark,
            hidden: !dropDown,
          }
        )}
      >
        {options.map((option, index) => (
          <li
            key={index}
            onClick={() => handleSelect(option)}
            className="text-[13px] font-medium leading-5 text-medium-grey"
            role="button"
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
}
