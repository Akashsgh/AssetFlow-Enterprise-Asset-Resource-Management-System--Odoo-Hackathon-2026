import mongoose from 'mongoose';

const auditSchema = new mongoose.Schema({
  action: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  details: Object,
}, { timestamps: true });

export default mongoose.model('Audit', auditSchema);
