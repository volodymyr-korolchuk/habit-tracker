"use client";

import { ChangeEventHandler } from "react";

interface Props {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  type?: "text" | "password" | "email" | "search" | "number";
  placeholder?: string;
  maxLength?: number;
}

const TextInput: React.FC<Props> = ({
  onChange,
  type = "text",
  value,
  maxLength,
  placeholder,
}) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder || ""}
      className="h-14 w-80 px-4 text-2xl rounded-md"
      maxLength={maxLength || 32}
    />
  );
};

export default TextInput;
