"use client";

import React from "react";

import TinyButton from "@/components/Buttons/TinyButton";
import { useTracker } from "@/app/tracker/context/TrackerContext";
import { Months } from "@/constants/months";

const MonthsContainer: React.FC = () => {
  const { months, selectedMonth, setSelectedMonth } = useTracker();

  const handleOnClick = (value: Months) => {
    setSelectedMonth(value);
  };

  return (
    <div className="flex flex-col flex-1 h-full md:h-auto md:flex-row gap-1 justify-around">
      {months.map((month, index) => {
        return (
          <TinyButton
            key={month}
            label={month}
            primary={selectedMonth === index}
            onClick={() => handleOnClick(index as Months)}
          />
        );
      })}
    </div>
  );
};

export default MonthsContainer;
