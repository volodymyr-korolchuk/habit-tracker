import React from "react";
import { Button } from "@/components/ui/button";
import { FaCheck } from "react-icons/fa6";

interface Props {
  isMarked: boolean;
}

const CheckTile: React.FC<Props> = ({ isMarked }) => {
  return (
    <div className="h-12 w-12 md:h-14 md:w-14 bg-neutral-400 flex items-center justify-center rounded-md">
      <Button
        type="button"
        className={`h-full border-none shadow-none w-full ${
          isMarked
            ? "bg-green-400 hover:bg-green-300"
            : "bg-neutral-400 hover:bg-neutral-300"
        }`}
      >
        {isMarked ? <FaCheck size={32} /> : null}
      </Button>
    </div>
  );
};

export default CheckTile;
