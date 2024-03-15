import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: [true, "Username is already taken"],
      required: [true, "This username is required"],
    },
    email: {
      type: String,
      unique: [true, "This email is already taken"],
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = models?.User || model("User", UserSchema);

export default User;
