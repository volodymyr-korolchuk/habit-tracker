import Habit from "@/models/Habit";
import { connectToDB } from "@/utils/database.js";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectToDB();

    const allHabits = await Habit.find();

    return NextResponse.json(allHabits, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to fetch habits data" },
      {
        status: 500,
      }
    );
  }
}
