import mongoose from 'mongoose';

const maintenanceSchema = new mongoose.Schema({
  asset: { type: mongoose.Schema.Types.ObjectId, ref: 'Asset', required: true },
  description: { type: String, required: true },
  cost: { type: Number, default: 0 },
  scheduledDate: { type: Date, required: true },
  completedDate: { type: Date },
  status: { 
    type: String, 
    enum: ['scheduled', 'in-progress', 'completed', 'cancelled'], 
    default: 'scheduled' 
  },
  performedBy: { type: String }
}, { timestamps: true });

export default mongoose.model('Maintenance', maintenanceSchema);
