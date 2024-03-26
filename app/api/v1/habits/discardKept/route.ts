import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/auth";

import Habit from "@/models/Habit";
import { connectToDB } from "@/utils/database";

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { habitId, date } = body;

    if (!habitId) {
      return NextResponse.json(
        { error: "Habit ID was not provided." },
        {
          status: 400,
        }
      );
    }

    if (!date) {
      return NextResponse.json(
        { error: "Date was not provided." },
        {
          status: 400,
        }
      );
    }

    await connectToDB();

    const query = { _id: habitId };
    const update = { $pull: { keptOnDates: date } };

    const updatedHabit = await Habit.findOneAndUpdate(query, update, {
      new: true,
    });

    return NextResponse.json(updatedHabit, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      return NextResponse.json(
        { error: "Failed to create a new habit. " + error.message },
        {
          status: 500,
        }
      );
    }
  }
}
