"use client";

import { MouseEventHandler } from "react";
import { cn } from "@/utils/cn";
import { IconType } from "react-icons/lib";

interface ButtonProps {
  text?: string;
  Icon?: IconType;
  iconSize?: number;
  expandOnHover?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  color?: "green" | "rose" | "sky" | "yellow";
}

const Button: React.FC<ButtonProps> = ({
  text,
  color = "green",
  expandOnHover = false,
  onClick,
  Icon,
  iconSize = 25,
}) => {
  const buttonClasses = cn(
    "inline-block rounded-lg text-center text-neutral-900 w-full h-12 transition group flex items-center justify-center",
    `bg-${color}-400 hover:bg-${color}-300`
  );

  const contentClasses = expandOnHover
    ? "group-hover:scale-110 transition-transform"
    : "";

  return (
    <button onClick={onClick} className={buttonClasses}>
      {Icon ? <Icon size={iconSize} className={contentClasses} /> : text}
    </button>
  );
};

export default Button;
