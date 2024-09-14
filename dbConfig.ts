import mongoose from "mongoose";

export function connect() {
  try {
    // Connect to database
    mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("conneted to the mongodb");
    });
    connection.on("error", (error) => {
      console.log("Error in connecting to database", error);
      process.exit(1);
    });
  } catch (error) {
    console.log("Error in connecting to database", error);
  }
}
