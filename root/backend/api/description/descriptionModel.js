import mongoose from "mongoose";

export const classDescSchema = new mongoose.Schema({
  class: { type: String, required: true },
  name: { type: String, required: true },
  credits: { type: String, required: true },
  description: { type: String, required: true },
  fulfills: { type: String, required: true },
  prereqs: [{ type: String, required: false }]
});

const ClassDesc = mongoose.model('ClassDesc', classDescSchema);

export default ClassDesc