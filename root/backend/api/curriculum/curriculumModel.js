import mongoose from 'mongoose';
import { colorSchema } from '../color/colorModel.js';
import { semesterSchema } from '../semester/semesterModel.js';
import { classSchema } from '../course/courseModel.js';
import { categorySchema } from '../category/categoryModel.js';
import { classDescSchema } from '../description/descriptionModel.js';


const Curriculum = new mongoose.Schema({
    degree: String,
    catalogYear: String,
    colors: [colorSchema],
    semesters: [semesterSchema],
    classes: [classSchema],
    categories: [categorySchema],
    classDesc: [classDescSchema]
  },{timestamps: true});
  

const CurriculumModel = mongoose.model('Curriculum', Curriculum);

export default CurriculumModel
