import Asset from '../models/Asset.js';
import Booking from '../models/Booking.js';
import Maintenance from '../models/Maintenance.js';

// @desc    Generate asset summary report
// @route   GET /api/reports/assets
export const getAssetReport = async (req, res) => {
  try {
    const statusSummary = await Asset.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    const categorySummary = await Asset.aggregate([
      { $match: { category: { $ne: null } } },
      { $lookup: { from: 'categories', localField: 'category', foreignField: '_id', as: 'cat' } },
      { $unwind: '$cat' },
      { $group: { _id: '$cat.name', count: { $sum: 1 } } }
    ]);

    res.status(200).json({
      success: true,
      data: { statusSummary, categorySummary }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Generate booking report
// @route   GET /api/reports/bookings
export const getBookingReport = async (req, res) => {
  try {
    const statusSummary = await Booking.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    res.status(200).json({
      success: true,
      data: { statusSummary }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Generate maintenance report
// @route   GET /api/reports/maintenance
export const getMaintenanceReport = async (req, res) => {
  try {
    const statusSummary = await Maintenance.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 }, totalCost: { $sum: '$cost' } } }
    ]);

    res.status(200).json({
      success: true,
      data: { statusSummary }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
