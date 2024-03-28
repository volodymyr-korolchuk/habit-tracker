"use client";

import React, { useEffect } from "react";
import { getSession } from "next-auth/react";
import toast from "react-hot-toast";

import HabitItem from "@/components/Tracker/Habits/Habit";
import Tracker from "@/components/Tracker/Tracker";
import CreateHabitModal from "@/components/Modals/CreateHabitModal";
import CheckTile from "@/components/Buttons/CheckTile";

import { discardHabitKept, markHabitKept } from "@/data/habit";
import { getDaysInMonth, getFormattedISODateString } from "@/utils/date";
import { useTrackerStore } from "@/contexts/store";
import { useModal } from "@/hooks/useModal";
import Background from "@/components/Tracker/Background/Background";
import Island from "@/components/Island/Island";
import AsideSkeleton from "@/components/Skeletons/AsideSkeleton";
import ContentSkeleton from "@/components/Skeletons/ContentSkeleton";

const TrackerPage = () => {
  const { isOpened, openModal, closeModal } = useModal();
  const {
    habits,
    selectedMonth,
    daysInSelectedMonth,
    pushKeptOnDate,
    removeKeptOnDate,
    setHabits,
    fetch,
  } = useTrackerStore();

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const session = await getSession();
        if (!session || !session.user?.email) {
          return;
        }

        fetch(session.user.email);
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        }
      }
    };

    fetchHabits();
  }, []);

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

  const titles =
    habits.length > 0 ? (
      habits.map((habit) => <HabitItem key={habit.title} label={habit.title} />)
    ) : (
      <AsideSkeleton />
    );

  const checkTiles =
    habits.length > 0 ? (
      habits.map((habit) => (
        <div
          key={habit._id.toString()}
          className="flex items-center gap-1 w-full"
        >
          {Array.from({ length: daysInSelectedMonth }, (_, index) => {
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
                  isMarked
                    ? () => handleDiscardKept(habit._id.toString(), index + 1)
                    : () => handleMarkKept(habit._id.toString(), index + 1)
                }
              />
            );
          })}
        </div>
      ))
    ) : (
      <ContentSkeleton />
    );

  return (
    <div className="relative flex w-full h-screen items-center justify-center bg-gradient-to-br overflow-hidden from-green-900/80 via-green-500/60 to-green-800/80">
      <Background />
      <Island />
      <CreateHabitModal isOpened={isOpened} onClose={closeModal} />
      <Tracker
        habitTitles={titles}
        checkTiles={checkTiles}
        openModal={openModal}
      />
    </div>
  );
};

export default TrackerPage;
