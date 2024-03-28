"use client";

import React, { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { IoCreate } from "react-icons/io5";
import { useTrackerStore } from "@/contexts/store";
import { getDaysInMonth } from "@/utils/date";
import Day from "./Days/Day";
import MonthsContainer from "./Months/MonthsContainer";

interface Props {
  habitTitles?: ReactNode | ReactNode[];
  checkTiles?: ReactNode | ReactNode[];
  openModal: () => void;
}

const Tracker: React.FC<Props> = ({ habitTitles, checkTiles, openModal }) => {
  const { daysInSelectedMonth } = useTrackerStore();

  const daysTiles = Array.from({ length: daysInSelectedMonth }, (_, index) => (
    <Day key={index} value={index + 1} />
  ));

  return (
    <div className="flex items-center justify-center w-[95%]">
      <div className="bg-blue-100/20 border-[1px] border-white rounded-lg flex md:flex-col items-center flex-1 max-w-[1000px] h-[500px] overflow-hidden relative">
        <div className="md:sticky md:top-0 h-full md:h-auto md:w-full">
          <nav className="p-1 md:h-auto h-full backdrop-blur-sm">
            <MonthsContainer />
          </nav>
        </div>

        <div className="flex justify-between items-start h-full overflow-auto w-full bg-neutral-100">
          <div className="flex w-[250px] flex-col items-start justify-between gap-y-1 px-1 pb-1">
            <h2 className="text-center flex justify-center items-center md:w-60 w-36 md:h-16 h-14 font-bold md:text-3xl text-2xl">
              HABITS
            </h2>
            {habitTitles}
            <Button
              onClick={openModal}
              className="w-full md:h-14 h-12 rounded-md font-normal text-lg"
            >
              <p className="pr-2">New Habit</p> <IoCreate size={20} />
            </Button>
          </div>

          <section className="flex flex-col">
            <div className="flex gap-x-1 items-center justify-start px-1 md:h-auto h-14 p-1">
              {daysTiles}
            </div>

            <div className="w-full h-screen flex-1 flex flex-col justify-between gap-y-1 p-1">
              {checkTiles}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Tracker;
