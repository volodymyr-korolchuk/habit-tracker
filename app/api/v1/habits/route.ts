import { fetchedHabitsData } from "@/data/mockFecth";
import { connectToDB } from "@/utils/database.js";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectToDB();
    // await connectToDB();
    // fecth from db

    return NextResponse.json(fetchedHabitsData, { status: 200 });
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
