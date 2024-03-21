import HabitModel from "@/models/Habit";
import { Habit } from "@/types";
import { ObjectId } from "mongoose";

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

export const markHabitKept = async (habitId: ObjectId, date: Date) => {
  try {
    const query = { _id: habitId };
    const update = { $push: { keptOnDates: date } };

    await HabitModel.findOneAndUpdate(query, update, { new: true });
  } catch (error) {
    throw error;
  }
};

export const discardHabitKept = async (habitId: ObjectId, date: Date) => {
  try {
    const filter = { _id: habitId };
    const update = { $pull: { keptOnDates: date } };

    await HabitModel.findOneAndUpdate(filter, update, { new: true });
  } catch (error) {
    throw error;
  }
};
