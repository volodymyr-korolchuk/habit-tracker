import { Schema, model, models } from "mongoose";

const HabitSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      required: [true, "Habit title is required"],
    },
    keptOnDates: {
      type: [Date],
      default: [],
    },
  },
  { timestamps: true }
);

const Habit = models.Habit || model("Habit", HabitSchema);

export default Habit;
