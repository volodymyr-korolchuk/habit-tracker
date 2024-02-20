"use client";

import { useState } from "react";
import { MdDone } from "react-icons/md";

interface CheckboxProps {
  checked: boolean;
  onChange?: () => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange }) => {
  const [isChecked, setIsChecked] = useState(checked);

  const classes = `
    flex absolute z-10 top-0 h-full w-full items-center rounded-lg justify-center 
    ${
      checked
        ? "bg-green-400 hover:bg-neutral-400"
        : "bg-neutral-400 hover:bg-neutral-200"
    }
  `;

  const handleChecked = () => {
    setIsChecked((prev) => !prev);
  };

  return (
    <div className="relative md:w-16 w-12 md:h-16 h-12 outline-none">
      <div className={classes} onClick={handleChecked}>
        {checked && <MdDone size={40} />}
      </div>
    </div>
  );
};

export default Checkbox;
