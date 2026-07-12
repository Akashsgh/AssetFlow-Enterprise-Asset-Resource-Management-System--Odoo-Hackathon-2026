import mongoose from 'mongoose';

const activityLogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  action: { type: String, required: true },
  entity: { type: String }, // e.g. 'Asset', 'Booking'
  entityId: { type: mongoose.Schema.Types.ObjectId },
  details: { type: String }
}, { timestamps: true });

export default mongoose.model('ActivityLog', activityLogSchema);
