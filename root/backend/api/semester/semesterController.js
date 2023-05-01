import express from "express";
import mongoose from "mongoose";
import Semester from "./semesterModel.js";

const router = express.Router();

export const addSemesters = async (req, res) => {
  const { name } = req.body;
  const newSemester = new Semester({
    name
  });
  newSemester.save((err, savedSemester) => {
    if (err) {
      console.log(`Error saving semester: ${err}`);
      res.status(500).send('Error saving semester');
    } else {
      console.log(`Saved semester: ${savedSemester}`);
      res.send(savedSemester);
    }
  });
};
export const getSemesters = async (req, res) => {
  try {
    const semesters = await Semester.find();
    res.json(semesters);
  } catch (error) {
    console.error(`Error retrieving semesters: ${error}`);
    res.status(500).send('Error retrieving semesters');
  }
};


export default router;