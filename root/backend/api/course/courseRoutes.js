import express from "express";

import {
  addClasses,
  getClasses
} from "./courseController.js";

const router = express.Router();


router.post("/add-class", addClasses);
router.get("/view", getClasses);

export default router;