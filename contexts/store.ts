import { Months } from "@/constants/months";
import { getUserHabits } from "@/data/habit";
import { Habit } from "@/types";
import { getDaysInMonth } from "@/utils/date";
import { create } from "zustand";

type State = {
  habits: Habit[];
  selectedMonth: Months;
  daysInSelectedMonth: number;
};

type Actions = {
  fetch: (email: string) => void;
  setHabits: (habits: Habit[]) => void;
  addHabit: (habit: Habit) => void;
  setSelectedMonth: (month: Months) => void;
  pushKeptOnDate: (habitId: string, date: string) => void;
  removeKeptOnDate: (habitId: string, date: string) => void;
};

enum UpdateAction {
  ADD,
  REMOVE,
}

const updateHabitDate = (
  habits: Habit[],
  habitId: string,
  date: string,
  updateAction: UpdateAction
) => {
  return habits.map((habit) => {
    if (habit._id.toString() === habitId) {
      const updatedDates =
        updateAction === UpdateAction.ADD
          ? [...habit.keptOnDates, date]
          : habit.keptOnDates.filter((x: string) => x !== date);

      return { ...habit, keptOnDates: updatedDates };
    }
    return habit;
  });
};

export const useTrackerStore = create<State & Actions>((set) => ({
  habits: [],
  selectedMonth: Months.JAN,
  daysInSelectedMonth: 31,

  setSelectedMonth: (month: Months) =>
    set(() => ({
      selectedMonth: month,
      daysInSelectedMonth: getDaysInMonth(new Date().getFullYear(), month),
    })),

  fetch: async (email: string) => {
    try {
      const habits = await getUserHabits(email);
      set({ habits: habits });
    } catch (error) {
      throw error;
    }
  },

  setHabits: (habits) => set(() => ({ habits })),

  addHabit: (habit) => set((state) => ({ habits: { ...state.habits, habit } })),

  pushKeptOnDate: (habitId, date) =>
    set((state) => ({
      habits: updateHabitDate(state.habits, habitId, date, UpdateAction.ADD),
    })),

  removeKeptOnDate: (habitId, date) =>
    set((state) => ({
      habits: updateHabitDate(state.habits, habitId, date, UpdateAction.REMOVE),
    })),
}));
