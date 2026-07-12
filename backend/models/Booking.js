import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  asset: { type: mongoose.Schema.Types.ObjectId, ref: 'Asset' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  startDate: Date,
  endDate: Date,
  status: { type: String, default: 'pending' },
}, { timestamps: true });

export default mongoose.model('Booking', bookingSchema);
