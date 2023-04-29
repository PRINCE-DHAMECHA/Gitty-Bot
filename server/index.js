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

import { config } from "./config.js";

app.use(cors());
app.use(express.json());

app.use(bodyParser.json());

const port = process.env.PORT || 5000;
const client_id = process.env.CLIENT_ID;
const redirect_uri = process.env.REDIRECT_URI;
const client_secret = process.env.CLIENT_SECRET;


app.post("/authenticate", (req, res) => {
  const { code } = req.body;

  const data = new FormData();
  data.append("client_id", client_id);
  data.append("client_secret", client_secret);
  data.append("code", code);
  data.append("redirect_uri", redirect_uri);

  // Request to exchange code for an access token
  fetch(`https://github.com/login/oauth/access_token`, {
    method: "POST",
    body: data,
  })
    .then((response) => response.text())
    .then((paramsString) => {
      let params = new URLSearchParams(paramsString);
      const access_token = params.get("access_token");

      // Request to return data of a user that has been authenticated
      return fetch(`https://api.github.com/user`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      });
    })
    .then((response) => response.json())
    .then((response) => {
      return res.status(200).json(response);
    })
    .catch((error) => {
      return res.status(400).json(error);
    });
});


// app.get("/getAccessToken", async (req, res) => {

//   console.log("getAccessTokenCalled");
//   console.log(req.query.code);

//   const params = "?client_id=" + CLIENT_ID + "&client_secret=" + CLIENT_SECRET + "&code=" + req.query.code

//   await fetch("https://github.com/login/oauth/access_token" + params, {
//     method: "POST", headers: { "Accept": "application/json" }
//   }).then(response => response.json())
//     .then((data) => {
//       console.log(data);
//       res.json(data);
//     });
// });

// app.get("/getUserData", async (req, res) => {
//   req.get("Authorization");
//   await fetch("https://api.github.com/user", {
//     method: "GET",
//     headers: { "Authorization": "token " + req.get("Authorization") }
//   }).then((response) => response.json()).then((data) => {
//     console.log(data);
//     res.json(data);
//   });
// });

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
