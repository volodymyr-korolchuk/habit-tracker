"use server";

import bcrypt from "bcryptjs";

import * as z from "zod";

import User from "@/models/User";

import { RegisterSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid input" };
  }

  const { username, email, password } = validatedFields.data;

  try {
    const user = await getUserByEmail(email);

    if (user) {
      return { error: "Email already in use" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({ username, email, password: hashedPassword });

    return { succeess: "New user created!" };
  } catch (error) {
    if (error instanceof Error) {
      return {
        error: "Error while creating the user: " + error.message,
      };
    }
  }
};
