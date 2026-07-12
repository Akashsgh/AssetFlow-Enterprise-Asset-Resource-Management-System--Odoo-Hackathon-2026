import mongoose from 'mongoose';

const auditSchema = new mongoose.Schema({
  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
  departmentName: { type: String, required: true },
  inspector: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['In Progress', 'Completed', 'Incomplete'], default: 'In Progress' },
  totalExpected: { type: Number, default: 0 },
  totalScanned: { type: Number, default: 0 },
  accuracy: { type: Number, default: 0 },
  startedAt: { type: Date, default: Date.now },
  completedAt: { type: Date },
  notes: { type: String },
}, { timestamps: true });

export default mongoose.model('Audit', auditSchema);
