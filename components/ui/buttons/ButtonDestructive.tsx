import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  name: string;
  className?: string;
  handleClick?: () => void;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function ButtonDestructive({
  name,
  className,
  handleClick,
  ...props
}: Props) {
  return (
    <button
      {...props}
      className={cn(
        "text-[13px] font-bold text-white bg-red rounded-full py-2 hover:bg-red-hover",
        className
      )}
      onClick={handleClick}
    >
      {name}
    </button>
  );
}
