import mongoose from "mongoose";

export const categorySchema = new mongoose.Schema({
    name: String,
    credits: Number,
    notes: {
      type: String,
      required: false
    },
    fc_name: {
      type: String,
      required: false
    },
    fallback: {
      type: String,
      required: false
    }
  });


const Category = mongoose.model('Category', categorySchema);

export default Category


