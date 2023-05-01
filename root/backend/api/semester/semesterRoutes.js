import express from "express";

import {
  addSemesters,
  getSemesters
} from "./semesterController.js";

const router = express.Router();

router.post("/add-semester", addSemesters);
router.get("/view",getSemesters);


export default router;