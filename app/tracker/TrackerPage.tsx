"use client";
import React from "react";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useTracker } from "./context/TrackerContext";
import Habit from "@/components/Tracker/Habits/Habit";
import Tracker from "@/components/Tracker/Tracker";
import MonthsContainer from "@/components/Tracker/Months/MonthsContainer";
import CreateHabitModal from "@/components/Modals/CreateHabitModal";
import CheckboxContainer from "@/components/Checkbox/CheckboxContainer";
import useModal from "@/hooks/useModal";
import { FaChartLine } from "react-icons/fa6";

export const TrackerPage = () => {
  const { selectedMonth, daysOfMonth, titles, habitsToDays, months } =
    useTracker();

  const { isOpened, openModal, closeModal } = useModal();

  let habitsCheckedDaysArrays = habitsToDays ? [...habitsToDays.values()] : [];

  const header = <MonthsContainer />;

  const sidebar = (
    <ul className="flex flex-col gap-1">
      {/*
            
            
            
            
            
      
            */}
      <Button>
        <FaChartLine />
      </Button>
      <Button>
        <FaRegClock />
      </Button>
      <Button>
        <FaNoteSticky />
      </Button>
      <Button>
        <FaStopwatch />
      </Button>
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
        <button
          onClick={() => signOut()}
          className="z-50 absolute bottom-2 bg-rose-700 rounded-md p-2 px-2 m-2 text-xl"
        >
          Sign out
        </button>
      </div>
    </div>
  );
};
