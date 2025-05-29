import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () =>
      console.log("✅ Database Connected")
    );

    // Use the URI directly without appending anything
    await mongoose.connect(process.env.MONGODB_URI);
  } catch (error) {
    console.error("❌ Database connection error:", error.message);
  }
};
