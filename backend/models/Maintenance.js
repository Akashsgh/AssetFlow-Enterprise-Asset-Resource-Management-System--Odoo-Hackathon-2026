import mongoose from 'mongoose';

const maintenanceSchema = new mongoose.Schema({
  asset: { type: mongoose.Schema.Types.ObjectId, ref: 'Asset' },
  type: String,
  description: String,
  scheduledDate: Date,
  completedAt: Date,
  status: { type: String, default: 'scheduled' },
}, { timestamps: true });

export default mongoose.model('Maintenance', maintenanceSchema);
