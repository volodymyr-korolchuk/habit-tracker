"use client";

import React from "react";

import TinyButton from "@/components/Buttons/TinyButton";
import { Months } from "@/constants/months";
import { useTrackerStore } from "@/contexts/store";

const MonthsContainer: React.FC = () => {
  const { selectedMonth, setSelectedMonth } = useTrackerStore();

  const handleOnClick = (value: Months) => {
    setSelectedMonth(value);
  };

  const months = Object.values(Months).filter(
    (value) => typeof value === "string"
  ) as string[];

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
