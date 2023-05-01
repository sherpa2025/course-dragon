import express from "express";

import {
  addDescription,
  getClassDescriptions
} from "./descriptionController.js";

const router = express.Router();

router.post("/add-description", addDescription);
router.get("/view",getClassDescriptions);

export default router;