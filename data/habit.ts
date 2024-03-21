import HabitModel from "@/models/Habit";
import { Habit } from "@/types";

export const createHabit = async (title: string) => {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/habits/create`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to create habit");
    }

    const data = await response.json();
    return data.habit;
  } catch (error) {
    console.error("Error creating habit:", error);
    throw error;
  }
};

export const getUserHabits = async (email: string): Promise<Habit[]> => {
  try {
    const userByEmailURL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/users/email/${email}`;

    const userByEmail = await fetch(userByEmailURL);
    const user = await userByEmail.json();

    const habitsByUserIdURL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/habits/${user._id}`;

    const habitsByUserId = await fetch(habitsByUserIdURL);
    const habits = await habitsByUserId.json();

    return habits;
  } catch (error) {
    throw error;
  }
};

export const markHabitKept = async (habitId: string, date: Date) => {
  try {
    const markHabitKeptURL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/habits/markKept/${habitId}/${date}`;

    const response = await fetch(markHabitKeptURL, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        habitId,
        date,
      }),
    });
    const result = await response.json();
    return result.habit;
  } catch (error) {
    throw error;
  }
};

export const discardHabitKept = async (habitId: string, date: Date) => {
  // try {
  //   const filter = { _id: habitId };
  //   const update = { $pull: { keptOnDates: date } };
  //   await HabitModel.findOneAndUpdate(filter, update, { new: true });
  // } catch (error) {
  //   throw error;
  // }
};
