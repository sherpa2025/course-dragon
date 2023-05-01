import express from 'express';
import mongoose from 'mongoose';
import CurriculumModel from "./curriculumModel.js";

const router = express.Router();


export const addCurriculum= async (req, res) => {
  try {
     const { degree, catalogYear } = req.body;

  // create a new degree map using the Curriculum model and the degree and catalogYear values
  const newCurriculum = new CurriculumModel({
    degree,
    catalogYear,
    colors: [],
    semesters: [],
    classes: [],
    categories: [],
    classDesc: []
  });

    // Save the new curriculum to the database
    await newCurriculum.save();

    // Respond with a success message and the newly created curriculum document
    res.status(201).json({
      success: true,
      message: 'Curriculum created successfully',
      curriculum: newCurriculum,
    });
  } catch (error) {
    // Respond with an error message and the error object
    res.status(500).json({
      success: false,
      message: 'Failed to create curriculum',
      error,
    });
  }
};

export const deleteCurriculum = async (req, res) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No catalog with id: ${id}`);
  
    await CurriculumModel.findByIdAndRemove(id);
  
    res.json({ message: "Catalog deleted successfully." });
  };

export default router;

