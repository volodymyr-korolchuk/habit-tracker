"use client";

import React from "react";
import { signOut } from "next-auth/react";

import HabitItem from "@/components/Tracker/Habits/Habit";
import Tracker from "@/components/Tracker/Tracker";
import MonthsContainer from "@/components/Tracker/Months/MonthsContainer";
import CreateHabitModal from "@/components/Modals/CreateHabitModal";
import CheckTile from "@/components/Buttons/CheckTile";

import useModal from "@/hooks/useModal";
import { useTracker } from "./context/TrackerContext";

import { getFormattedDate } from "@/utils/date";

const TrackerPage = () => {
  const { isOpened, openModal, closeModal } = useModal();
  const {
    daysOfMonth,
    selectedMonth,
    titles,
    habitToDateStrings: habitToDates,
  } = useTracker();

  const aside = titles.map((title) => <HabitItem key={title} label={title} />);

  const header = <MonthsContainer />;

  const days = daysOfMonth.map((_, index) => (
    <div
      key={index}
      className="md:h-14 md:w-14 h-12 w-12 bg-neutral-300 flex items-center justify-center text-2xl rounded-sm"
    >
      {index + 1}
    </div>
  ));

  const checkboxes =
    habitToDates &&
    [...habitToDates].map((habit) => {
      return (
        <div key={habit[0]} className="flex items-center gap-1 w-full">
          {daysOfMonth.map((_, index) => {
            // NEEDS TO BE OPTIMIZED
            const isMarked = habit[1].includes(
              getFormattedDate(selectedMonth, index)
            );

            return <CheckTile isMarked={isMarked} />;
          })}
        </div>
      );
    });

  return (
    <div className="relative flex w-full h-screen items-center justify-center bg-neutral-900">
      <CreateHabitModal isOpened={isOpened} onClose={closeModal} />
      <Tracker
        aside={aside}
        header={header}
        content={checkboxes}
        daysOfMonth={days}
        openModal={openModal}
      />
      <button
        onClick={() => signOut()}
        className="z-50 absolute top-2 right-2 bg-rose-700 rounded-md p-2 px-2 m-2 text-xl"
      >
        Sign out
      </button>
    </div>
  );
};

export default TrackerPage;
