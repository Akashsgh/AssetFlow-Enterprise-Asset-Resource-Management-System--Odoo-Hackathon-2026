import mongoose from 'mongoose';

const assetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  tag: { type: String, unique: true, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
  status: { type: String, default: 'available' },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  purchaseDate: Date,
  warrantyUntil: Date,
  location: String,
}, { timestamps: true });

export default mongoose.model('Asset', assetSchema);
