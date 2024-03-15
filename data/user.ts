import User from "@/models/User";
import { connectToDB } from "@/utils/database";

export const getUserByEmail = async (email: string) => {
  try {
    await connectToDB();

    const user = await User.findOne({
      email,
    });

    return user;
  } catch (error) {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    await connectToDB();

    const user = await User.findById(id);

    return user;
  } catch (error) {
    return null;
  }
};
