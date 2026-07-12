import mongoose from 'mongoose';

const assetSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  tag: { type: String, unique: true, required: true, uppercase: true },
  category: { type: String, required: true, enum: ['Hardware', 'Software', 'Furniture', 'Vehicle', 'Infrastructure'] },
  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
  status: { type: String, enum: ['Available', 'In Use', 'Under Maintenance', 'Retired'], default: 'Available' },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  purchaseDate: { type: Date },
  purchasePrice: { type: Number, default: 0 },
  warrantyUntil: { type: Date },
  location: { type: String, trim: true },
  description: { type: String, trim: true },
  serialNumber: { type: String, trim: true },
  manufacturer: { type: String, trim: true },
  model: { type: String, trim: true },
  image: { type: String },
}, { timestamps: true });

assetSchema.index({ name: 'text', tag: 'text', serialNumber: 'text' });

export default mongoose.model('Asset', assetSchema);
