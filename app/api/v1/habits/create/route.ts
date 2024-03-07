import { connectToDB } from "@/utils/database.js";
import { NextRequest, NextResponse } from "next/server";

import Habit from "@/models/Habit";
import User from "@/models/User";

export async function POST(req: NextRequest) {
  try {
    await connectToDB();

    const { userId, title } = await req.json();

    if (!userId || !title) {
      return NextResponse.json(
        { error: "Habit data was not provided" },
        { status: 403 }
      );
    }

    const isUserExists = await User.findOne({ userId });

    if (!isUserExists) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 403 }
      );
    }

    const isHabitExists = await Habit.findOne({ title });

    if (isHabitExists) {
      return NextResponse.json(
        { error: "Habit with such name already exists" },
        { status: 403 }
      );
    }

    const newHabit = new Habit({ owner: userId, title: title });

    await newHabit.save();

    return NextResponse.json({ habit: newHabit }, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }

    return NextResponse.json(
      { message: "Failed to create a new habit" },
      {
        status: 500,
      }
    );
  }
}
