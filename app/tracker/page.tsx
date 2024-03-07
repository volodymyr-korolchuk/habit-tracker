"use client";

import React from "react";
import Image from "next/image";

import { useTracker } from "./context/TrackerContext";
import { FaNoteSticky } from "react-icons/fa6";
import { FaChartLine, FaRegClock, FaStopwatch } from "react-icons/fa";

import CheckboxContainer from "../../components/Checkbox/CheckboxContainer";
import MonthsContainer from "../../components/Tracker/Months/MonthsContainer";
import Habit from "../../components/Tracker/Habits/Habit";
import Tracker from "../../components/Tracker/Tracker";
import Button from "@/components/Buttons/Button";
import CreateHabitModal from "@/components/Modals/CreateHabitModal";
import useModal from "@/hooks/useModal";

const TrackerPage = () => {
  const { selectedMonth, daysOfMonth, titles, habitsToDays, months } =
    useTracker();

  const { isOpened, openModal, closeModal } = useModal();

  let habitsCheckedDaysArrays = habitsToDays ? [...habitsToDays.values()] : [];

  const header = <MonthsContainer />;

  const sidebar = (
    <ul className="flex flex-col gap-1">
      <Button text="Stats" color="sky" Icon={FaChartLine} iconSize={30} />
      <Button text="Habits" color="green" Icon={FaRegClock} iconSize={30} />
      <Button text="Notes" color="yellow" Icon={FaNoteSticky} iconSize={30} />
      <Button text="Deadlines" color="rose" Icon={FaStopwatch} iconSize={30} />
    </ul>
  );

  const aside = titles.map((title) => <Habit key={title} label={title} />);

  const daysOfMonthArray = daysOfMonth.map((item, index) => (
    <div
      key={item}
      className="flex items-center justify-center md:w-16 w-12 md:h-full h-12 bg-neutral-300 rounded-sm text-[30px]"
    >
      <p>{index + 1}</p>
    </div>
  ));

  const content = habitsCheckedDaysArrays?.map((row, index) => (
    <CheckboxContainer key={index} checkedDaysIndexes={row[selectedMonth]} />
  ));

  return (
    <div className="relative flex w-full h-full items-center justify-center">
      <Image
        width={1920}
        height={1080}
        src="/images/leafs-bg.jpg"
        className="absolute z-0 object-cover w-full h-full"
        loading="eager"
        alt="leafs background"
      />
      <CreateHabitModal isOpened={isOpened} onClose={closeModal} />
      <div className="flex items-center justify-center w-full h-full">
        <Tracker
          header={header}
          aside={aside}
          content={content}
          sidebar={sidebar}
          daysOfMonth={daysOfMonthArray}
          openModal={openModal}
        />
      </div>
    </div>
  );
};

export default TrackerPage;
