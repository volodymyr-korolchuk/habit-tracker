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
import { extractHabitTitles, parseHabitsToMap } from "@/utils/data";

interface TrackerContextType {
  selectedMonth: Months;
  setSelectedMonth: (month: Months) => void;

  daysOfMonth: number[];
  habitToDateStrings: Map<string, string[]> | null;
  titles: string[];
  months: string[];
}

const TrackerContext = createContext<TrackerContextType>({
  selectedMonth: Months.JAN,
  daysOfMonth: Array(31).fill(0),
  habitToDateStrings: new Map<string, string[]>(),
  titles: [""],
  months: [""],
  setSelectedMonth: () => {},
});

export function useTracker() {
  return useContext(TrackerContext);
}

export function TrackerContextProvider({ children }: { children: ReactNode }) {
  const [selectedMonth, setSelectedMonth] = useState<number>(Months.JAN);
  const [habitToDateStrings, setHabitToDateStrings] = useState<Map<
    string,
    string[]
  > | null>(null);
  const [titles, setTitles] = useState<string[]>([]);

  useEffect(() => {
    const getHabitsData = async () => {
      try {
        const session = await getSession();
        if (!session || !session.user?.email) {
          return;
        }

        const email = session.user.email;
        const habits = await getUserHabits(email);

        const titlesToDates = parseHabitsToMap(habits);
        const habitTitles = extractHabitTitles(habits);

        setTitles(habitTitles);
        setHabitToDateStrings(titlesToDates);
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
        habitToDateStrings,
        titles,
      }}
    >
      {children}
    </TrackerContext.Provider>
  );
}
