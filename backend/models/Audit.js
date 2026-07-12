import mongoose from 'mongoose';

const auditSchema = new mongoose.Schema({
  asset: { type: mongoose.Schema.Types.ObjectId, ref: 'Asset', required: true },
  auditor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  auditDate: { type: Date, default: Date.now },
  status: { 
    type: String, 
    enum: ['pass', 'fail', 'missing', 'needs-repair'], 
    required: true 
  },
  remarks: { type: String }
}, { timestamps: true });

export default mongoose.model('Audit', auditSchema);
