import Asset from '../models/Asset.js';
import Maintenance from '../models/Maintenance.js';
import Booking from '../models/Booking.js';

export const getGeneralReport = async (req, res) => {
  try {
    const totalAssets = await Asset.countDocuments();
    const assetsInUse = await Asset.countDocuments({ status: 'In Use' });
    const assetsUnderMaintenance = await Asset.countDocuments({ status: 'Under Maintenance' });
    const totalBookings = await Booking.countDocuments();
    const activeBookings = await Booking.countDocuments({ status: 'Active' });
    
    // Calculate total maintenance cost
    const maintenanceRecords = await Maintenance.find({ status: 'Resolved' });
    const totalMaintenanceCost = maintenanceRecords.reduce((sum, record) => sum + (record.cost || 0), 0);
    
    // Group assets by category for charts
    const assetsByCategory = await Asset.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);

    res.json({
      success: true,
      data: {
        totalAssets,
        assetsInUse,
        assetsUnderMaintenance,
        totalBookings,
        activeBookings,
        totalMaintenanceCost,
        assetsByCategory: assetsByCategory.map(item => ({ category: item._id, count: item.count }))
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};
