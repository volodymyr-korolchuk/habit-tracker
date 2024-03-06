"use client";

import { MouseEventHandler } from "react";
import { cn } from "@/utils/cn";

interface ButtonProps {
  text?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  color?: "green" | "red" | "sky" | "dark" | "white";
  colorIntensity?: 300 | 400 | 600;
}

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  color = "white",
  colorIntensity = 300,
}) => {
  const classes = cn(
    "rounded-lg text-center text-neutral-900 w-full h-12 transition",
    `bg-${color}-${colorIntensity}`
  );

  return (
    <button onClick={onClick} className={classes}>
      {text}
    </button>
  );
};

export default Button;
