import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  className?: string;
  handleClick?: () => void;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function ButtonPrimary({
  children,
  className,
  handleClick,
  ...props
}: Props) {
  return (
    <button
      {...props}
      className={cn(
        "text-[13px] font-bold text-white bg-main-purple rounded-full py-2 hover:bg-main-purple-hover",
        className
      )}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
