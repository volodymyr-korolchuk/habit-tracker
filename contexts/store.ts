import { Habit } from "@/types";
import { create } from "zustand";

type State = {
  habits: Habit[];
};

type Actions = {
  setHabits: (habits: Habit[]) => void;
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
  setHabits: (habits) => set(() => ({ habits })),
  pushKeptOnDate: (habitId, date) =>
    set((state) => ({
      habits: updateHabitDate(state.habits, habitId, date, UpdateAction.ADD),
    })),
  removeKeptOnDate: (habitId, date) =>
    set((state) => ({
      habits: updateHabitDate(state.habits, habitId, date, UpdateAction.REMOVE),
    })),
}));
