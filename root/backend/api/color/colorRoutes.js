import express from "express";

import {
  addColors,
  getColors
} from "./colorController.js";

const router = express.Router();


router.post("/add-colors", addColors);
router.get("/view", getColors);

export default router;