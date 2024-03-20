import mongoose from "mongoose";

export type Habit = {
  _id: mongoose.Types.ObjectId;
  owner: mongoose.Types.ObjectId;
  title: string;
  keptOnDates: mongoose.Types.Array;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};
