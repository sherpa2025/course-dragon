import express from "express";

import {
  addCatalog,
  deleteCatalog,
  getCatalog,
  getCatalogItemById,
  updateCatalogItem
} from "./addCatalogController.js";

const router = express.Router();

router.post("/", addCatalog);
router.delete("/:id", deleteCatalog);
router.get("/",getCatalog)
router.get("/:id",getCatalogItemById)
router.put("/:id",updateCatalogItem)
export default router;