"use client";

import React from "react";
import Image from "next/image";
import { useTracker } from "./context/TrackerContext";
import MonthsContainer from "./components/Months/MonthsContainer";
import HabitItem from "./components/Habits/HabitItem";
import NumberTile from "./components/Controls/Tiles/NumberTile";
import CheckboxContainer from "./components/Controls/Checkbox/CheckboxContainer";
import { NavTile } from "./components/Controls/Tiles/NavTile";
import { FaChartLine, FaRegClock, FaStopwatch } from "react-icons/fa";
import { FaNoteSticky } from "react-icons/fa6";
import Tracker from "./components/Tracker/Tracker";
const TrackerPage = () => {
  const { selectedMonth, daysOfMonth, titles, habitsToDays, months } =
    useTracker();

  let habitsCheckedDaysArrays = habitsToDays
    ? [...habitsToDays.values()]
    : null;

  const header = <MonthsContainer />;

  const sidebar = (
    <ul className="flex flex-col gap-1">
      <NavTile
        label="Stats"
        bgColorClass="bg-sky-300"
        Icon={FaChartLine}
        iconSize={30}
      />
      <NavTile
        label="Habits"
        bgColorClass="bg-green-400"
        Icon={FaRegClock}
        iconSize={30}
      />
      <NavTile
        label="Notes"
        bgColorClass="bg-yellow-300"
        Icon={FaNoteSticky}
        iconSize={30}
      />
      <NavTile
        label="Deadlines"
        bgColorClass="bg-rose-400"
        Icon={FaStopwatch}
        iconSize={30}
      />
    </ul>
  );

  const aside = (
    <>
      {titles.map((title) => (
        <HabitItem key={title} label={title} />
      ))}
    </>
  );

  const daysOfMonthArray = (
    <>
      {daysOfMonth.map((item, index) => {
        return <NumberTile key={index} value={index + 1} />;
      })}
    </>
  );

  const content = habitsCheckedDaysArrays?.map((row, index) => {
    return (
      <CheckboxContainer key={index} checkedDaysIndexes={row[selectedMonth]} />
    );
  });

  return (
    <div className="relative flex w-full h-full items-center justify-center">
      <Image
        width={1920}
        height={1080}
        src="/images/leafs-bg.jpg"
        className="absolute z-0 object-cover w-full h-full"
        alt="leafs background"
      />
      <div className="flex items-center justify-center w-full h-full">
        <Tracker
          header={header}
          aside={aside}
          content={content}
          sidebar={sidebar}
          daysOfMonth={daysOfMonthArray}
        />
      </div>
    </div>
  );
};

export default TrackerPage;
