import { cn } from "@/lib/utils";
import React from "react";
import { Path, UseFormRegister } from "react-hook-form";

type Props = {
  label: Path<any>;
  maxLength?: number;
  register: UseFormRegister<any>;
  isDark: boolean;
  requiredMessage?: string;
  maxLengthMessage?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function Input({
  register,
  maxLength,
  label,
  isDark,
  className,
  placeholder,
  requiredMessage,
  maxLengthMessage,
}: Props) {
  return (
    <input
      type="text"
      id={label}
      {...register(label, {
        ...(requiredMessage && { required: requiredMessage }),
        ...(maxLength &&
          maxLengthMessage && {
            maxLength: {
              value: maxLength,
              message: maxLengthMessage,
            },
          }),
      })}
      placeholder={placeholder}
      className={cn(
        "text-[13px] font-medium text-black px-4 py-2  placeholder-opacity-25 bg-white rounded border border-input-border focus:border-main-purple",
        {
          "bg-dark-grey text-white": isDark,
        },
        className
      )}
    />
  );
}
