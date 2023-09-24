import { cn } from "@/lib/utils";
import React from "react";
import { Path, UseFormRegister } from "react-hook-form";

type Props = {
  isDark: boolean;
  register: UseFormRegister<any>;
  maxLength: number;
  label: Path<any>;
  requiredMessage: string;
  maxLengthMessage: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export default function Textarea({
  register,
  maxLength,
  label,
  requiredMessage,
  maxLengthMessage,
  isDark,
  placeholder,
}: Props) {
  return (
    <textarea
      id={label}
      placeholder={placeholder}
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
      className={cn(
        "text-[13px] font-medium text-black px-4 py-2  resize-none  placeholder-opacity-25 bg-white h-[112px] rounded border border-input-border focus:border-main-purple",
        {
          "bg-dark-grey text-white": isDark,
        }
      )}
    />
  );
}
