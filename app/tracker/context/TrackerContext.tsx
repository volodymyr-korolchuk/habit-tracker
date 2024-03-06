"use client";

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { Months } from "../../../constants/months";
import { parseToMap } from "../../../libs/dataParser";
import { getDaysInMonth } from "@/libs/dateUtils";

interface TrackerContextType {
  selectedMonth: Months;
  setSelectedMonth: (month: Months) => void;
  daysOfMonth: number[];
  habitsToDays: Map<string, number[][]> | null;
  titles: string[];
  months: string[];
}

const TrackerContext = createContext<TrackerContextType>({
  selectedMonth: Months.JAN,
  daysOfMonth: Array(31).fill(0),
  habitsToDays: new Map(),
  titles: [""],
  months: [""],
  setSelectedMonth: () => {},
});

export function useTracker() {
  return useContext(TrackerContext);
}

export function TrackerContextProvider({ children }: { children: ReactNode }) {
  const [selectedMonth, setSelectedMonth] = useState<number>(Months.JAN);
  const [habitsToDays, setHabitsToDays] = useState<Map<
    string,
    number[][]
  > | null>(null);

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        // change later to fetch the habits of a certain user
        const response = await fetch("/api/habits");

        if (!response.ok) {
          console.log("Response was not OK in in TrackerContext");
          return;
        }

        const data = await response.json();
        setHabitsToDays(parseToMap(data));
      } catch (error) {
        console.log(error);
      }
    };

    fetchHabits();
  }, []);

  const daysOfMonth = Array(
    getDaysInMonth(new Date().getFullYear(), selectedMonth)
  ).fill("");

  const months = Object.values(Months).filter(
    (value) => typeof value === "string"
  ) as string[];

  const titles = habitsToDays ? [...habitsToDays?.keys()] : [];

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
        habitsToDays,
        titles,
      }}
    >
      {children}
    </TrackerContext.Provider>
  );
}
