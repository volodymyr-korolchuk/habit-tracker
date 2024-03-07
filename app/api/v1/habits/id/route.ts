import Habit from "@/models/Habit";
import { connectToDB } from "@/utils/database.js";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectToDB();
    const habitId = req.nextUrl.searchParams.get("id");

    const habit = await Habit.findById({ _id: habitId });

    if (!habit) {
      return NextResponse.json(
        { error: "Habit with such id does not exist" },
        { status: 404 }
      );
    }

    return NextResponse.json(habit, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to fetch the habit" },
      {
        status: 500,
      }
    );
  }
}
