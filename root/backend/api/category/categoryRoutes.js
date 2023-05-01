import express from "express";

import {
  addCategory,
  getCategory
} from "./categoryController.js";

const router = express.Router();

router.get("/view", getCategory);
router.post("/add-category", addCategory);

export default router;