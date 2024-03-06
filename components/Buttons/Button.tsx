"use client";

import { MouseEventHandler } from "react";
import { cn } from "@/utils/cn";
import { IconType } from "react-icons/lib";

interface ButtonProps {
  text?: string;
  Icon?: IconType;
  iconSize?: number;
  expandOnHover?: boolean;
  borderEnabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  color?: "green" | "rose" | "sky" | "yellow";
}

const Button: React.FC<ButtonProps> = ({
  text,
  color = "green",
  expandOnHover = true,
  borderEnabled,
  onClick,
  Icon,
  iconSize = 25,
}) => {
  let { colorClass, hoverColorClass } = getColorClasses(color);

  const buttonClasses = cn(
    "inline-block rounded-lg text-center text-neutral-900 w-full h-14 transition group flex items-center justify-center",
    colorClass,
    hoverColorClass,
    borderEnabled && "border-2 border-neutral-700"
  );

  const contentClasses = expandOnHover
    ? "group-hover:scale-110 transition-transform"
    : "";

  return (
    <button onClick={onClick} className={buttonClasses}>
      {Icon && !text && (
        <Icon size={iconSize || 30} className={contentClasses} />
      )}

      {!Icon && text && <p className="text-2xl">{text}</p>}

      {Icon && text && (
        <span className="w-full flex items-center gap-1 justify-start px-2">
          <Icon className="text-neutral-900" size={iconSize || 30} />
          <p className="text-2xl">{text}</p>
        </span>
      )}
    </button>
  );
};

const getColorClasses = (color: string) => {
  let colorClass;
  let hoverColorClass;

  switch (color) {
    case "green":
      colorClass = "bg-green-400";
      hoverColorClass = "hover:bg-green-300";
      break;
    case "rose":
      colorClass = "bg-rose-400";
      hoverColorClass = "hover:bg-rose-300";
      break;
    case "sky":
      colorClass = "bg-sky-400";
      hoverColorClass = "hover:bg-sky-300";
      break;
    case "yellow":
      colorClass = "bg-yellow-400";
      hoverColorClass = "hover:bg-yellow-300";
      break;

    default:
      colorClass = "bg-green-400";
      hoverColorClass = "bg-green-300";
      break;
  }

  return { colorClass, hoverColorClass };
};

export default Button;
