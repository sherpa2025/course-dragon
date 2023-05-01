import mongoose from 'mongoose';

export const classSchema = new mongoose.Schema({
    name: { type: String, required: true },
    credits: { type: String, required: true },
    semesters: { type: String, required: true },
    color: { type: String, required: true },
  });

  const Class = mongoose.model('Class', classSchema);

export default Class