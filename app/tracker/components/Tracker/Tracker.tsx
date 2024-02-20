"use client";

import React, { Suspense, useState, ReactNode } from "react";
import { FaGripLines } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import CreateHabitButton from "../Controls/Buttons/CreateHabitButton";
import DaysOfMonthSkeleton from "../Skeletons/DaysOfMonthSkeleton";
import ContentSkeleton from "../Skeletons/ContentSkeleton";

interface TrackerProps {
  header?: ReactNode | ReactNode[];
  aside?: ReactNode | ReactNode[];
  sidebar?: ReactNode | ReactNode[];
  content?: ReactNode | ReactNode[];
  daysOfMonth?: ReactNode | ReactNode[];
}

const Sidebar = ({ children }: { children?: ReactNode | ReactNode[] }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const containerClasses = `h-full
    ${isCollapsed ? "bg-transparent hidden" : ""}
  `;

  const buttonClasses = `p-2 h-8 rounded-md hover:bg-neutral-300 bg-neutral-400 flex justify-center
    ${isCollapsed ? "w-8" : "w-full"}
  `;

  return (
    <div className="flex flex-col h-full justify-between gap-1">
      <button
        onClick={() => setIsCollapsed((prev) => !prev)}
        className={buttonClasses}
      >
        {isCollapsed ? <FaGripLines /> : <FaXmark />}
      </button>
      <div className={containerClasses}>{children}</div>
    </div>
  );
};

const Tracker: React.FC<TrackerProps> = ({
  header,
  aside,
  content,
  sidebar,
  daysOfMonth,
}) => {
  const handleCreateHabit = () => {};

  return (
    <>
      <div className="flex flex-col gap-2 w-[90%] h-[80%] bg-gradient-to-br from-sky-200/30 to-neutral-100/20 border-[1px] border-white/40 backdrop-blur-sm rounded-xl p-2 z-10">
        {/* header */}
        <div className="w-full rounded-md flex items-center jusify-center overflow-y-auto">
          {header}
        </div>

        {/* sidebar and main container */}
        <div className="flex flex-1 w-full h-auto rounded-lg gap-1">
          {/* sidebar */}
          <div className="bg-neutral-100 h-full rounded-lg p-1">
            <Sidebar>{sidebar}</Sidebar>
          </div>

          {/* content container */}
          <div className="bg-neutral-100 flex flex-1 h-full min-w-[180px] rounded-lg overflow-auto">
            <div className="flex h-full min-w-[180px] flex-col border-r-2 border-neutral-400 rounded-s-md">
              {/* HABIT title container */}
              <div className="min-w-36 h-16 flex items-center justify-center  border-b-2 border-neutral-400">
                <h3 className="text-center uppercase flex-1 text-2xl">Habit</h3>
              </div>

              {/* habit title list */}
              <div className="flex-1 p-[5px] flex flex-col gap-[5px] items-center justify-starts">
                {aside}
                <CreateHabitButton onClick={handleCreateHabit} />
              </div>
            </div>

            <div className="flex-1">
              {/* days of month */}
              <div className="h-16 p-[5px] gap-[5px] flex items-center justify-start border-b-2 border-neutral-400">
                {content ? daysOfMonth : <DaysOfMonthSkeleton />}
              </div>

              {/* checkbox tiles */}
              <div className="bg-white flex flex-col gap-[5px] p-[5px]">
                {content ? content : <ContentSkeleton />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tracker;
