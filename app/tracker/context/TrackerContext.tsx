"use client";

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { Months } from "@/constants/months";
import { getSession } from "next-auth/react";
import { getUserHabits } from "@/data/habit";
import { getDaysInMonth } from "@/utils/date";
import { Habit } from "@/types";

interface TrackerContextType {
  selectedMonth: Months;
  setSelectedMonth: (month: Months) => void;

  daysOfMonth: number[];
  habits: Habit[];
  months: string[];
}

const TrackerContext = createContext<TrackerContextType>({
  selectedMonth: Months.JAN,
  daysOfMonth: Array(31).fill(0),
  months: [],
  habits: [],
  setSelectedMonth: () => {},
});

export function useTracker() {
  return useContext(TrackerContext);
}

export function TrackerContextProvider({ children }: { children: ReactNode }) {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<number>(Months.JAN);

  useEffect(() => {
    const getHabitsData = async () => {
      try {
        const session = await getSession();
        if (!session || !session.user?.email) {
          return;
        }

        const email = session.user.email;
        const habits = await getUserHabits(email);

        const habitsWithLocalDateStrings = habits.map((habit) => ({
          ...habit,
          keptOnDates: habit.keptOnDates.map((date: string) =>
            new Date(date).toLocaleDateString()
          ),
        }));

        setHabits(habitsWithLocalDateStrings);
      } catch (error) {
        if (error instanceof Error) {
          throw error;
        }
      }
    };

    getHabitsData();
  }, []);

  const months = Object.values(Months).filter(
    (value) => typeof value === "string"
  ) as string[];

  const daysOfMonth = Array(
    getDaysInMonth(new Date().getFullYear(), selectedMonth)
  ).fill(0);

  const handleSetSelectedMonth = (month: Months) => {
    setSelectedMonth(month);
  };

  return (
    <TrackerContext.Provider
      value={{
        selectedMonth,
        setSelectedMonth: handleSetSelectedMonth,
        daysOfMonth,
        months,
        habits,
      }}
    >
      {children}
    </TrackerContext.Provider>
  );
}
