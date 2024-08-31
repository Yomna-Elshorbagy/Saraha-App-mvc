import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
export const connectionDb = () =>
  mongoose
    .connect(process.env.MONGODB_ATLAS)
    .then(() => console.log("db connected successfully"))
    .catch((err) => {
      console.log("fail to connect...");
    });
