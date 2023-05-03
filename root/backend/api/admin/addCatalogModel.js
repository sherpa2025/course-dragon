import mongoose from "mongoose";
//const { Schema } = mongoose;

export const color = new mongoose.Schema({
  name: { type: String, required: true },
  color: { type: String, required: true }
});

export const courseCategory = new mongoose.Schema({
  name: { type: String, required: true },
  credits: { type: Number, required: true },
  notes: { type: String, required: false }
});

export const courseList = new mongoose.Schema({
  name: { type: String, required: true },
  credits: { type: Number, required: true },
  prereqs: [{ type: String, required: false }],
  categoryName: { type: String, required: false },
  semester: { type: String, required: false },
  courseColor:{ type: String, required: false }
}); 
// Define schema for catalog item
export const catalogSchema = mongoose.Schema({
  degree: { type: String, required: true },
  catalogYear: { type: String, required: true },
  //curriculumID: { type: Schema.Types.ObjectId, ref: 'Curriculum' },
  colorCategory : [color],
  courseCategory : [courseCategory],
  courseList : [courseList]
  },{timestamps: true});
  

// Define model for catalog item
var CatalogItem = mongoose.model('CatalogItem', catalogSchema);

export default CatalogItem