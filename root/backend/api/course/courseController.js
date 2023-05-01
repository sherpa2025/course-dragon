import express from "express";
import mongoose from "mongoose";
import Class from "./courseModel.js";


const router = express.Router();


export const addClasses = async (req, res) => {
  try {
    const { name, credits, semesters, color } = req.body;
    const newClass = new Class({
      name,
      credits,
      semesters,
      color
    });
    await newClass.save();
    res.status(201).json(newClass);
  } catch (error) {
    console.error(`Error creating class: ${error}`);
    res.status(500).json({ error: 'Error creating class' });
  }
};

export const getClasses = async (req, res) => {
  try {
    const classes = await Class.find({});
    res.status(200).json(classes);
  } catch (error) {
    console.error(`Error getting classes: ${error}`);
    res.status(500).json({ error: 'Error getting classes' });
  }
};

export default router;