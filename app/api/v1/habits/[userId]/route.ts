import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/utils/database.js";
import { getUserById } from "@/data/user";
import Habit from "@/models/Habit";

export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  const id = params.userId;

  try {
    await connectToDB();

    const userHabits = await Habit.find({ owner: id });

    return NextResponse.json(userHabits, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
