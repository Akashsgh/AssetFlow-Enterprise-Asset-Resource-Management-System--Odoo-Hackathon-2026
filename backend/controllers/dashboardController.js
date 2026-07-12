import Asset from '../models/Asset.js';
import Booking from '../models/Booking.js';
import Maintenance from '../models/Maintenance.js';
import User from '../models/User.js';

export const getStats = async (req, res) => {
  try {
    const [totalAssets, activeBookings, inMaintenance, totalUsers] = await Promise.all([
      Asset.countDocuments(),
      Booking.countDocuments({ status: 'Active' }),
      Maintenance.countDocuments({ status: { $ne: 'Resolved' } }),
      User.countDocuments({ isActive: true })
    ]);
    const assetsByCategory = await Asset.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);
    const assetsByStatus = await Asset.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);
    res.json({
      success: true,
      stats: { totalAssets, activeBookings, inMaintenance, totalUsers },
      assetsByCategory,
      assetsByStatus
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getRecentActivity = async (req, res) => {
  try {
    const [recentBookings, recentMaintenance, recentAssets] = await Promise.all([
      Booking.find().populate('asset', 'name').populate('user', 'name').sort('-createdAt').limit(5),
      Maintenance.find().populate('asset', 'name').populate('reportedBy', 'name').sort('-createdAt').limit(5),
      Asset.find().sort('-createdAt').limit(5)
    ]);
    res.json({ success: true, recentBookings, recentMaintenance, recentAssets });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
