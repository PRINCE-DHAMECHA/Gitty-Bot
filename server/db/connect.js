import mongoose from "mongoose";

const connectDB = (url) => {
  mongoose.set("strictQuery", false);
  return mongoose.connect(url);
};
export default connectDB;
