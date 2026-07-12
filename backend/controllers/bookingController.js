import Booking from '../models/Booking.js';
import Asset from '../models/Asset.js';

export const getAllBookings = async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (status) filter.status = status;
    const skip = (page - 1) * limit;
    const [bookings, total] = await Promise.all([
      Booking.find(filter).populate('asset', 'name tag').populate('user', 'name email').populate('approvedBy', 'name').skip(skip).limit(Number(limit)).sort('-createdAt'),
      Booking.countDocuments(filter)
    ]);
    res.json({ success: true, bookings, total });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const createBooking = async (req, res) => {
  try {
    const { asset: assetId, startDate, endDate, purpose } = req.body;
    const asset = await Asset.findById(assetId);
    if (!asset) return res.status(404).json({ success: false, message: 'Asset not found' });
    if (asset.status !== 'Available') return res.status(400).json({ success: false, message: 'Asset is not available' });
    const booking = await Booking.create({ asset: assetId, user: req.user.id, startDate, endDate, purpose });
    await Asset.findByIdAndUpdate(assetId, { status: 'In Use', assignedTo: req.user.id });
    res.status(201).json({ success: true, booking });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });
    if (status === 'Completed' || status === 'Cancelled') {
      await Asset.findByIdAndUpdate(booking.asset, { status: 'Available', assignedTo: null });
    }
    res.json({ success: true, booking });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
