import mongoose from 'mongoose';

const departmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: String,
}, { timestamps: true });

export default mongoose.model('Department', departmentSchema);
