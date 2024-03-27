import React from "react";
import { Button } from "@/components/ui/button";
import { FaCheck } from "react-icons/fa6";

interface Props {
  isMarked: boolean;
  onClick: () => void;
}

const CheckTile: React.FC<Props> = ({ isMarked, onClick }) => {
  return (
    <div className="h-12 w-12 md:h-14 md:w-14 bg-neutral-400 flex items-center justify-center rounded-md">
      <Button
        type="button"
        onClick={onClick}
        className={`h-full border-none shadow-none w-full ${
          isMarked
            ? "bg-green-300 hover:bg-green-200"
            : "bg-neutral-400 hover:bg-neutral-300"
        }`}
      >
        {isMarked ? <FaCheck size={36} /> : null}
      </Button>
    </div>
  );
};

export default CheckTile;
