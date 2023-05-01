import express from "express";

import {
  addCurriculum,
  deleteCurriculum
} from "./curriculumController.js";



const router = express.Router();
router.post("/new", addCurriculum);
router.delete("/:id", deleteCurriculum);
export default router;