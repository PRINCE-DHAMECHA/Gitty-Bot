import express from "express";
const app = express();

import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
import dotenv from "dotenv";
dotenv.config();

import "express-async-errors";
import connectDB from "./db/connect.js";
import cors from "cors";
import bodyParser from "body-parser";
import fetch from "node-fetch";

import userRouter from "./routes/User.js";

app.use(cors());
app.use(express.json());
app.use("/user", userRouter);

app.get("/test", (req, res) => {
  console.log("test called");
});

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
