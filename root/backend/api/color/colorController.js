import express from 'express';
import mongoose from 'mongoose';
import Color from "./colorModel.js";


const router = express.Router();

export const addColors = async (req, res) => {
  const { name, code } = req.body;

  // Create a new color document
  const color = new Color({
    name,
    code,
  });

  // Save the new color document
  color.save()
    .then((savedColor) => {
      res.status(201).json(savedColor);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

export const getColors = async (req, res) => {
  try {
    const colors = await Color.find();
    res.json(colors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default router;