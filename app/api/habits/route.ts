import { NextApiRequest, NextApiResponse } from "next";

import { fetchedHabitsData } from "@/data/mockFecth";

export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    req = req;
    // await connectToDB();
    // fecth from db

    return new Response(JSON.stringify(fetchedHabitsData));
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch habits data", {
      status: 500,
    });
  }
};
