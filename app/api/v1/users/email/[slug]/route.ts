import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/utils/database.js";
import { getUserByEmail } from "@/data/user";

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const email = params.slug;

  try {
    await connectToDB();

    const user = await getUserByEmail(email);

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
