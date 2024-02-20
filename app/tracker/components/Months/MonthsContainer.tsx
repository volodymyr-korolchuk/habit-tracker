"use client";

import React from "react";

import MonthButton from "./MonthButton";
import { useTracker } from "@/app/tracker/context/TrackerContext";
import { Months } from "@/constants/months";

const MonthsContainer: React.FC = () => {
  const { months, selectedMonth, setSelectedMonth } = useTracker();

  const handleOnClick = (value: Months) => {
    setSelectedMonth(value);
  };

  return (
    <div className="w-full flex gap-2 justify-around">
      {months.map((month, index) => {
        return (
          <MonthButton
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
