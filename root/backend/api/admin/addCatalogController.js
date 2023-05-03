import express from "express";
import mongoose from "mongoose";
import CatalogItem from "./addCatalogModel.js";

const router = express.Router();


// API endpoint for creating a new catalog item
// export const addCatalog = async (req, res) => {
//     const { degree, catalogYear } = req.body;

//     // Validate that degree and catalogYear fields are not empty
//     if (!degree || !catalogYear) {
//       return res.status(400).json({ error: "Degree and Catalog Year are required" });
//     }
  
//     // Create a new catalog item using the CatalogItem model
//     const newCatalogItem = new CatalogItem({ degree, catalogYear });

    
//     try {
//     // Save the new catalog item to the database
//     await newCatalogItem.save();

//     res.status(201).json(newCatalogItem);
//   } catch (err) {
//     console.error(err);
//     res.status(409).json({ success: false, message: 'Failed to create catalog item' });
//   }
// };
// API endpoint for creating a new catalog item
export const addCatalog = async (req, res) => {
  const { degree, catalogYear, colorCategory, courseCategory } = req.body;

  // Validate that degree and catalogYear fields are not empty
  if (!degree || !catalogYear) {
    return res.status(400).json({ error: "Degree and Catalog Year are required" });
  }

  // Create a new catalog item using the CatalogItem model
  const newCatalogItem = new CatalogItem({ degree, catalogYear, colorCategory,courseCategory });

  try {
    // Save the new catalog item to the database
    await newCatalogItem.save();

    res.status(201).json(newCatalogItem);
  } catch (err) {
    console.error(err);
    res.status(409).json({ success: false, message: 'Failed to create catalog item' });
  }
};


export const deleteCatalog = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No catalog with id: ${id}`);

  await CatalogItem.findByIdAndRemove(id);

  res.json({ message: "Catalog deleted successfully." });
};


// Controller function to get all catalog items
export const getCatalog = async (req, res) => {
  try {
    // Find all catalog items in the database
    const catalogItems = await CatalogItem.find();
    // Send the catalog items as a JSON response
    res.json(catalogItems);
  } catch (error) {
    console.error(`Error getting catalog items: ${error}`);
    // Send an error response to the client
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller function to get a single catalog item by ID
export const getCatalogItemById = async (req, res) => {
  try {
    // Find the catalog item in the database by ID
    const catalogItem = await CatalogItem.findById(req.params.id);
    // If the catalog item doesn't exist, send a 404 response to the client
    if (!catalogItem) {
      res.status(404).json({ error: 'Catalog item not found' });
    } else {
      // Send the catalog item as a JSON response
      res.json(catalogItem);
    }
  } catch (error) {
    console.error(`Error getting catalog item: ${error}`);
    // Send an error response to the client
    res.status(500).json({ error: 'Internal server error' });
  }
};

// // PUT endpoint for updating a catalog item by ID
// export const updateCatalogItem = async (req, res) => {
//   try {
//     // Find the catalog item by ID
//     const item = await CatalogItem.findById(req.params.id);

//     if (!item) {
//       return res.status(404).json({ message: 'Catalog item not found.' });
//     }

//     // Update the catalog item with the new curriculum ID
//     item.curriculumID = req.body.curriculumID;

//     // Save the updated catalog item to the database
//     const savedItem = await item.save();

//     // Send a JSON response with the saved catalog item object
//     res.json(savedItem);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error updating catalog item.' });
//   }
// };


export default router;
