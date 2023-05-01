import express from 'express';
import mongoose from 'mongoose';
import Category from './categoryModel.js';
const router = express.Router();

export const addCategory = async (req, res) => {
  try {
    const { name, credits, notes, fc_name, fallback } = req.body;
    const newCategory = new Category({
      name,
      credits,
      notes,
      fc_name,
      fallback
    });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    console.error(`Error creating category: ${error}`);
    res.status(500).json({ error: 'Error creating category' });
  }
};

export const getCategory = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default router;