import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/utils/database.js";
import { getUserById } from "@/data/user";

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const id = params.slug;

  try {
    await connectToDB();

    const user = await getUserById(id);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
