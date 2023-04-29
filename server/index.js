import express from "express";
import path from "path";
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

app.use(cors());
app.use(express.json());

app.use(bodyParser.json());

const CLIENT_ID = "5e541bf08d9cb831a009";
const CLIENT_SECRET = "8679b7108e77e6638c85f3bfb862d38c7a21b593";

const port = process.env.PORT || 5000;


app.get("/getAccessToken", async (req, res) => {

  console.log("getAccessTokenCalled");
  console.log(req.query.code);

  const params = "?client_id=" + CLIENT_ID + "&client_secret=" + CLIENT_SECRET + "&code=" + req.query.code

  await fetch("https://github.com/login/oauth/access_token" + params, {
    method: "POST", headers: { "Accept": "application/json" }
  }).then(response => response.json())
    .then((data) => {
      console.log(data);
      res.json(data);
    });
});

app.get("/getUserData", async (req, res) => {
  req.get("Authorization");
  await fetch("https://api.github.com/user", {
    method: "GET",
    headers: { "Authorization": "token " + req.get("Authorization") }
  }).then((response) => response.json()).then((data) => {
    console.log(data);
    res.json(data);
  });
});

app.get("/test", (req, res) => {
  console.log("test called");

})

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
