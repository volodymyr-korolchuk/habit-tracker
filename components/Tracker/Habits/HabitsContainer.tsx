"use client";

import React from "react";

interface Props {
  children: React.ReactNode | React.ReactNode[];
}

const HabitsContainer: React.FC<Props> = ({ children }) => {
  const handleCreateHabit = () => {
    console.log("clicked");
  };

  return (
    <div className="flex flex-col justify-start border-neutral-400 border-r-2">
      {/* HABIT label */}
      <div className="flex items-center justify-center bg-white p-[5px]">
        <div className="flex items-center justify-center w-full md:h-[64px] h-[50px] text-2xl text-neutral-900 ">
          <p>HABIT</p>
        </div>
      </div>

      {/* habits list */}
      <div className="bg-white p-[5px] border-t-2 border-neutral-400">
        {children}
      </div>
    </div>
  );
};

export default HabitsContainer;
