import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  name: string;
  isDark: boolean;
  className?: string;
  handleClick?: () => void;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function ButtonSecondary({
  name,
  isDark,
  className,
  handleClick,
  ...props
}: Props) {
  return (
    <button
      {...props}
      className={cn(
        "text-[13px] font-bold text-main-purple py-2 rounded-full bg-button-secondary-idle",
        {
          "bg-white": isDark,
          "hover:bg-button-secondary-hover": !isDark,
        },
        className
      )}
      onClick={handleClick}
    >
      {name}
    </button>
  );
}
