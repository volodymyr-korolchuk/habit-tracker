"use client";

import React, { useEffect, useMemo } from "react";
import { signOut } from "next-auth/react";

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
import { markHabitKept } from "@/data/habit";
import { Habit } from "@/types";

const TrackerPage = () => {
  const { isOpened, openModal, closeModal } = useModal();
  const { daysOfMonth, selectedMonth, habits, setHabits } = useTracker();
  let prevHabitState: Habit;

  const aside = habits.map((habit) => (
    <HabitItem key={habit.title} label={habit.title} />
  ));

  const header = <MonthsContainer />;

  const days = daysOfMonth.map((_, index) => (
    <Day key={index} value={index + 1} />
  ));

  const updateOptimistic = (habitId: string, date: Date) => {
    // try using useReducer

    setHabits((prev) => {
      const indexOfUpdated = prev.findIndex(
        (x) => x._id.toString() === habitId
      );
      if (indexOfUpdated === -1) return prev;

      prevHabitState = prev[indexOfUpdated];

      return prev.map((habit, index) => {
        if (index !== indexOfUpdated) return habit;

        return {
          ...habit,
          keptOnDates: [
            ...habit.keptOnDates,
            getLocalDateString(date.getMonth(), date.getDate()),
          ],
        };
      });
    });
  };

  const resetOptimistic = (habitId: string) => {
    setHabits((prev) => {
      return prev.map((habit) => {
        if (habit._id.toString() === habitId) {
          return prevHabitState;
        }
        return habit;
      });
    });
  };

  const handleClick = async (habitId: string, day: number) => {
    const date = new Date(new Date().getFullYear(), selectedMonth, day);

    const formattedDate = getFormattedISODateString(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );

    try {
      updateOptimistic(habitId, date);

      await markHabitKept(habitId, formattedDate);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
      resetOptimistic(habitId);
    }
  };

  const checkboxes = useMemo(() => {
    if (!habits) return null;

    return habits.map((habit) => (
      <div
        key={habit._id.toString()}
        className="flex items-center gap-1 w-full"
      >
        {daysOfMonth.map((_, index) => {
          const isMarked = habit.keptOnDates.includes(
            getLocalDateString(selectedMonth, index + 1)
          );
          return (
            <CheckTile
              key={index}
              isMarked={isMarked}
              onClick={() => handleClick(habit._id.toString(), index + 1)}
            />
          );
        })}
      </div>
    ));
  }, [habits, selectedMonth, setHabits]);

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
