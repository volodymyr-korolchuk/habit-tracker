import { Habit } from "@/types";

export const parseHabitsToMap = (habits: Habit[]) => {
  const map = new Map<string, string[]>();

  for (const habit of habits) {
    const dates = habit.keptOnDates.map((date: string) =>
      new Date(date).toISOString().slice(0, 10)
    );
    map.set(habit.title, dates);
  }

  return map;
};

export const extractHabitTitles = (habits: Habit[]) => {
  return Array(...habits.map((habit) => habit.title));
};
