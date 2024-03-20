"use client";

import React, { useEffect, useState } from "react";
import { getSession, signOut } from "next-auth/react";

import { FaCheck } from "react-icons/fa6";
import toast from "react-hot-toast";

import HabitItem from "@/components/Tracker/Habits/Habit";
import Tracker from "@/components/Tracker/Tracker";
import MonthsContainer from "@/components/Tracker/Months/MonthsContainer";
import CreateHabitModal from "@/components/Modals/CreateHabitModal";
import { Button } from "@/components/ui/button";

import { getUserHabits } from "@/data/habit";
import { getDateByIndex } from "@/utils";
import { useTracker } from "./context/TrackerContext";
import useModal from "@/hooks/useModal";
import { Habit } from "@/types";

const TrackerPage = () => {
  const [titles, setTitles] = useState<string[]>([]);
  const aside = titles.map((title) => <HabitItem key={title} label={title} />);

  const { isOpened, openModal, closeModal } = useModal();
  const { daysOfMonth, selectedMonth } = useTracker();

  const header = <MonthsContainer />;

  const days = daysOfMonth.map((_, index) => (
    <div
      key={index + 1}
      className="md:h-14 md:w-14 h-12 w-12 bg-neutral-300 flex items-center justify-center text-2xl rounded-sm"
    >
      {index + 1}
    </div>
  ));

  const checkboxes = Array(titles.length)
    .fill(0)
    .map((title) => (
      <div key={title} className="flex items-center gap-1 w-full">
        {daysOfMonth.map((_, index) => (
          <div
            key={index + 1}
            className="h-12 w-12 md:h-14 md:w-14 bg-neutral-400 flex items-center justify-center rounded-md"
          >
            <Button
              type="button"
              // if the date is included in habits -> mark it
              className={`h-full border-none shadow-none w-full ${
                getDateByIndex(selectedMonth, index) === Date.now()
                  ? "bg-green-400 hover:bg-green-300"
                  : "bg-neutral-400 hover:bg-neutral-300"
              }`}
            >
              {index % 2 === 0 ? <FaCheck size={32} /> : null}
            </Button>
          </div>
        ))}
      </div>
    ));

  useEffect(() => {
    const getHabitsData = async () => {
      try {
        const session = await getSession();
        if (!session || !session.user?.email) {
          return;
        }

        const email = session.user.email;
        const habits: Habit[] = await getUserHabits(email);

        setTitles([...habits.map((habit) => habit.title)]);
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        }
      }
    };

    getHabitsData();
  }, []);

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
