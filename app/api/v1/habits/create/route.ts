import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/auth";
import { getUserByEmail } from "@/data/user";

import Habit from "@/models/Habit";

export async function POST(req: NextRequest) {
  try {
    const response = await auth();

    if (!response || !response?.user?.email) {
      return NextResponse.json(
        { error: "No active session." },
        { status: 403 }
      );
    }

    const user = await getUserByEmail(response.user.email);

    if (!user) {
      return NextResponse.json(
        { error: "User does not exist." },
        { status: 403 }
      );
    }

    const { title } = await req.json();

    if (!title) {
      return NextResponse.json(
        { error: "Habit title was not provided." },
        { status: 400 }
      );
    }

    const habitDoesExist = await Habit.findOne({ title });

    if (habitDoesExist) {
      return NextResponse.json({
        error: "Habit with such name already exists.",
      });
    }

    const newHabit = new Habit({ owner: user._id, title: title });

    await newHabit.save();

    return NextResponse.json({ habit: newHabit }, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }

    return NextResponse.json(
      { message: "Failed to create a new habit." },
      {
        status: 500,
      }
    );
  }
}
