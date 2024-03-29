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

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error || "Failed to create habit");
    }

    return data.habit;
  } catch (error) {
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
    const data = await habitsByUserId.json();

    if (data.error) {
      throw new Error(data.error || "Failed to get user`s habits.");
    }

    return data;
  } catch (error) {
    throw error;
  }
};

/**
 *
 * @param {string} habitId
 * ID string of a habit that belongs to a certain user.
 * @param {string} dateString
 * Date string. Should only be provided as ISO string
 */
export const markHabitKept = async (habitId: string, dateString: string) => {
  try {
    const markHabitKeptURL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/habits/markKept`;

    const response = await fetch(markHabitKeptURL, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        habitId,
        date: dateString,
      }),
    });

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error || "Failed to mark habit as kept.");
    }

    return data;
  } catch (error) {
    throw error;
  }
};

/**
 *
 * @param {string} habitId
 * ID string of a habit that belongs to a certain user.
 * @param {string} dateString
 * Date string. Should only be provided as ISO string
 */
export const discardHabitKept = async (habitId: string, dateString: string) => {
  try {
    const discardHabitKeptURL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/habits/discardKept`;

    const response = await fetch(discardHabitKeptURL, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        habitId,
        date: dateString,
      }),
    });

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error || "Failed to discard habit kept.");
    }

    return data;
  } catch (error) {
    throw error;
  }
};
