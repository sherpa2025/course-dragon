import mongoose from 'mongoose';


export const semesterSchema = new mongoose.Schema({
    name: String
  });

const Semester = mongoose.model('Semester', semesterSchema);

export default Semester