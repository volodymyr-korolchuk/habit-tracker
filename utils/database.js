import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("🍃 MongoDB is already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "db",
    });

    isConnected = true;

    console.log("🍃 MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};

mongoose.connection.on("error", (error) => {
  console.error("MongoDB Error", error.message);
});

mongoose.connection.on("disconnected", () => {
  isConnected = false;
  console.log("MongoDB disconnected");
});

export default mongoose;
