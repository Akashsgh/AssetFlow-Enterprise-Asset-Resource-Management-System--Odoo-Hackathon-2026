import Booking from '../models/Booking.js';
import Asset from '../models/Asset.js';

// @desc    Create new booking
// @route   POST /api/bookings
export const createBooking = async (req, res) => {
  try {
    const { asset, user, startDate, endDate, purpose } = req.body;

    const booking = await Booking.create({
      asset,
      user,
      startDate,
      endDate,
      purpose,
      status: 'pending'
    });

    res.status(201).json({ success: true, data: booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all bookings
// @route   GET /api/bookings
export const getBookings = async (req, res) => {
  try {
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    if (req.query.user) filter.user = req.query.user;
    if (req.query.asset) filter.asset = req.query.asset;

    const bookings = await Booking.find(filter)
      .populate('asset', 'name tag')
      .populate('user', 'name email');
    
    res.status(200).json({ success: true, count: bookings.length, data: bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update booking status (approve, reject, return)
// @route   PUT /api/bookings/:id
export const updateBooking = async (req, res) => {
  try {
    const { status, remarks } = req.body;
    let booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    booking.status = status || booking.status;
    booking.remarks = remarks || booking.remarks;

    await booking.save();

    // Optionally update Asset status if booking is approved or returned
    if (status === 'approved') {
      await Asset.findByIdAndUpdate(booking.asset, { status: 'in-use', assignedTo: booking.user });
    } else if (status === 'returned') {
      await Asset.findByIdAndUpdate(booking.asset, { status: 'available', assignedTo: null });
    }

    res.status(200).json({ success: true, data: booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
