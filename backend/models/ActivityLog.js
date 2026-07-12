import mongoose from 'mongoose';

const activityLogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  action: String,
  entity: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('ActivityLog', activityLogSchema);
