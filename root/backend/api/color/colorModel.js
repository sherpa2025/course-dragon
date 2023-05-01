import mongoose from 'mongoose';



export const colorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
});


const Color = mongoose.model('Color', colorSchema);

export default Color
