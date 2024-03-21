"use client";

import React from "react";
import { signOut } from "next-auth/react";

import { FaCheck } from "react-icons/fa6";

import HabitItem from "@/components/Tracker/Habits/Habit";
import Tracker from "@/components/Tracker/Tracker";
import MonthsContainer from "@/components/Tracker/Months/MonthsContainer";
import CreateHabitModal from "@/components/Modals/CreateHabitModal";
import { Button } from "@/components/ui/button";

import { getFormattedDate } from "@/utils";
import { useTracker } from "./context/TrackerContext";
import useModal from "@/hooks/useModal";

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
      key={index + 1}
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

            return (
              <div
                key={index + 1}
                className="h-12 w-12 md:h-14 md:w-14 bg-neutral-400 flex items-center justify-center rounded-md"
              >
                <Button
                  type="button"
                  className={`h-full border-none shadow-none w-full ${
                    isMarked
                      ? "bg-green-400 hover:bg-green-300"
                      : "bg-neutral-400 hover:bg-neutral-300"
                  }`}
                >
                  {isMarked ? <FaCheck size={32} /> : null}
                </Button>
              </div>
            );
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
