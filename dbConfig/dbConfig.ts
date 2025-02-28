import mongoose from "mongoose";

// Global cache for mongoose connection
interface GlobalWithMongoose {
  mongoose: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  } | undefined;
}

declare const global: GlobalWithMongoose;

// Initialize cached connection
const cached = global.mongoose || (global.mongoose = { conn: null, promise: null });

export async function connect() {
  if (cached.conn) {
    console.log("Using cached MongoDB connection");
    return cached.conn;
  }

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI environment variable is not defined");
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGO_URI).then((mongoose) => {
      console.log("MongoDB connected successfully");
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;

    // Set up error handler for the connection
    cached.conn.connection.on("error", (err) => {
      console.log(
        "MongoDB connection error. Please make sure MongoDB is running. " + err
      );
      process.exit();
    });

    return cached.conn;
  } catch (error) {
    cached.promise = null;
    console.log("Something goes wrong!");
    console.log(error);
    throw error;
  }
}