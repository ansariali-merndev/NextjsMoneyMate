import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;

export const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log("DB Already Connected");
      return;
    }
    await mongoose.connect(uri, {
      dbName: "ExpenseTracker",
    });
    console.log("DB connected successfully");
  } catch (error) {
    console.log("Failed to connect DB");
  }
};
