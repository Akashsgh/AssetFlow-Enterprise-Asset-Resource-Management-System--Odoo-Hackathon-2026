import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  asset: { type: mongoose.Schema.Types.ObjectId, ref: 'Asset', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  purpose: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'approved', 'rejected', 'returned', 'cancelled'], 
    default: 'pending' 
  },
  remarks: { type: String }
}, { timestamps: true });

export default mongoose.model('Booking', bookingSchema);
