import express from "express";
const router = express.Router();

import { addAction, getAction } from "../controllers/User";
router.route("/add").post(addAction);
router.route("/get").post(getAction);

export default router;
