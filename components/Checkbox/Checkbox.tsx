import { useState } from "react";

import { IoClose } from "react-icons/io5";
import { MdDone } from "react-icons/md";

interface Props {
  checked: boolean;
  onChange?: () => void;
}

const Checkbox: React.FC<Props> = ({ checked, onChange }) => {
  const [isChecked, setIsChecked] = useState(checked);

  const classes = `
    flex absolute z-10 top-0 h-full w-full items-center rounded-lg justify-center transition hover:outline-dashed outline-2 -outline-offset-2
    ${
      checked
        ? "bg-green-400 hover:bg-rose-400"
        : "bg-neutral-400 hover:bg-neutral-200"
    }
  `;

  const handleChecked = () => {
    setIsChecked((prev) => !prev);
  };

  return (
    <div className="relative md:w-16 w-12 md:h-16 h-12 outline-none group">
      <div className={classes} onClick={handleChecked}>
        {checked && (
          <>
            <MdDone className="transition group-hover:hidden" size={40} />
            <IoClose
              className="transition group-hover:block hidden"
              size={40}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Checkbox;
