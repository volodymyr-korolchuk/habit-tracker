"use client";

import React, { useEffect, useMemo } from "react";
import { getSession, signOut } from "next-auth/react";

import HabitItem from "@/components/Tracker/Habits/Habit";
import Tracker from "@/components/Tracker/Tracker";
import MonthsContainer from "@/components/Tracker/Months/MonthsContainer";
import CreateHabitModal from "@/components/Modals/CreateHabitModal";
import CheckTile from "@/components/Buttons/CheckTile";
import Day from "@/components/Tracker/Days/Day";

import useModal from "@/hooks/useModal";
import { useTracker } from "./context/TrackerContext";

import { getFormattedISODateString, getLocalDateString } from "@/utils/date";
import toast from "react-hot-toast";
import { discardHabitKept, getUserHabits, markHabitKept } from "@/data/habit";
import { useTrackerStore } from "@/contexts/store";

const TrackerPage = () => {
  const { isOpened, openModal, closeModal } = useModal();
  const { habits, pushKeptOnDate, removeKeptOnDate, setHabits } =
    useTrackerStore();
  const { daysOfMonth, selectedMonth } = useTracker();

  useEffect(() => {
    const getHabitsData = async () => {
      try {
        const session = await getSession();
        if (!session || !session.user?.email) {
          return;
        }

        const email = session.user.email;
        const habits = await getUserHabits(email);

        setHabits(habits);
      } catch (error) {
        if (error instanceof Error) {
          throw error;
        }
      }
    };

    getHabitsData();
  }, []);

  const aside = habits.map((habit) => (
    <HabitItem key={habit.title} label={habit.title} />
  ));

  const header = <MonthsContainer />;

  const days = daysOfMonth.map((_, index) => (
    <Day key={index} value={index + 1} />
  ));

  const handleMarkKept = async (habitId: string, day: number) => {
    const date = new Date(new Date().getFullYear(), selectedMonth, day);

    const formattedDate = getFormattedISODateString(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );

    try {
      pushKeptOnDate(habitId, formattedDate);

      await markHabitKept(habitId, formattedDate);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
      removeKeptOnDate(habitId, formattedDate);
    }
  };

  const handleDiscardKept = async (habitId: string, day: number) => {
    const date = new Date(new Date().getFullYear(), selectedMonth, day);

    const formattedDate = getFormattedISODateString(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );

    try {
      removeKeptOnDate(habitId, formattedDate);

      await discardHabitKept(habitId, formattedDate);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
      pushKeptOnDate(habitId, formattedDate);
    }
  };

  const checkboxes = !habits
    ? null
    : habits.map((habit) => (
        <div
          key={habit._id.toString()}
          className="flex items-center gap-1 w-full"
        >
          {daysOfMonth.map((_, index) => {
            const isMarked = habit.keptOnDates.includes(
              getFormattedISODateString(
                new Date().getFullYear(),
                selectedMonth,
                index + 1
              )
            );
            return (
              <CheckTile
                key={index}
                isMarked={isMarked}
                onClick={
                  !isMarked
                    ? () => {
                        handleMarkKept(habit._id.toString(), index + 1);
                      }
                    : () => handleDiscardKept(habit._id.toString(), index + 1)
                }
              />
            );
          })}
        </div>
      ));

  return (
    <div className="relative flex w-full h-screen items-center justify-center bg-neutral-900">
      <CreateHabitModal isOpened={isOpened} onClose={closeModal} />
      <Tracker
        aside={aside}
        header={header}
        daysOfMonth={days}
        content={checkboxes}
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
