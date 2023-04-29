import express from "express";
const router = express.Router();

import {
  addAction,
  deleteMessage,
  getAction,
  login,
  updateMessage,
} from "../controllers/User.js";
router.route("/add").post(addAction);
router.route("/get").get(getAction);
router.route("/login").get(login);
router.route("/update").post(updateMessage);
router.route("/delete").post(deleteMessage);

export default router;
