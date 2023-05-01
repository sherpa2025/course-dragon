import mongoose from "mongoose";
const { Schema } = mongoose;

// Define schema for catalog item
export const catalogSchema = mongoose.Schema({
  degree: { type: String, required: true },
  catalogYear: { type: String, required: true },
  curriculumID: { type: Schema.Types.ObjectId, ref: 'Curriculum' }
  },{timestamps: true})
  

// Define model for catalog item
var CatalogItem = mongoose.model('CatalogItem', catalogSchema);

export default CatalogItem