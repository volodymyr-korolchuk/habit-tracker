"use client";

import React from "react";
import { signOut } from "next-auth/react";

import { Button } from "@/components/ui/button";

import { useTracker } from "./context/TrackerContext";

import Habit from "@/components/Tracker/Habits/Habit";
import Tracker from "@/components/Tracker/Tracker";
import MonthsContainer from "@/components/Tracker/Months/MonthsContainer";
import CreateHabitModal from "@/components/Modals/CreateHabitModal";

import useModal from "@/hooks/useModal";
import { FaCheck } from "react-icons/fa6";

const TrackerPage = () => {
  let titles = [
    "Ride a bike",
    "Play an instrument",
    "Run",
    "Eat salads",
    "Go swimming",
    "Reading",
  ];

  const { isOpened, openModal, closeModal } = useModal();

  const header = <MonthsContainer />;

  const aside = titles.map((title) => <Habit key={title} label={title} />);

  const { daysOfMonth } = useTracker();

  const days = daysOfMonth.map((_, index) => (
    <div
      key={index + 1}
      className="md:h-14 md:w-14 h-12 w-12 bg-neutral-300 flex items-center justify-center text-2xl rounded-sm"
    >
      {index + 1}
    </div>
  ));

  const content = Array(titles.length)
    .fill(1)
    .map((title) => (
      <div key={title} className="flex items-center gap-1 w-full">
        {daysOfMonth.map((_, index) => (
          <div
            key={index + 1}
            className="h-12 w-12 md:h-14 md:w-14 bg-neutral-400 flex items-center justify-center rounded-md"
          >
            <Button
              type="button"
              className={`h-full border-none shadow-none w-full ${
                index % 2 === 0
                  ? "bg-green-500 hover:bg-green-300"
                  : "bg-transparent hover:bg-neutral-300"
              }`}
            >
              {index % 2 === 0 ? <FaCheck size={32} /> : null}
            </Button>
          </div>
        ))}
      </div>
    ));

  return (
    <div className="relative flex w-full h-screen items-center justify-center bg-neutral-900">
      <CreateHabitModal isOpened={isOpened} onClose={closeModal} />
      <Tracker
        aside={aside}
        header={header}
        content={content}
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
