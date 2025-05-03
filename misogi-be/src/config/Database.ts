import mongoose from "mongoose";
import dotenv from "dotenv";
import logger from "./logger";
dotenv.config();

class Database {
  public async connect(): Promise<void> {
    try {
      const conn = await mongoose.connect(process.env.MONGO_URI as string);
      logger.info(
        "✅ MongoDB connected successfully on host: " + conn.connection.host,
      );
    } catch (error) {
      logger.error("❌ MongoDB connection error:", error);
      process.exit(1);
    }
  }
}

export default new Database();
