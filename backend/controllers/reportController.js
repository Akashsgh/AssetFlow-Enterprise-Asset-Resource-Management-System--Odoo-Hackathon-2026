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
        assetsByCategory: assetsByCategory.map(item => ({ category: item._id, count: item.count })),
        monthlyCosts: [
          { name: 'Jan', maintenance: 1200, newAssets: 4500 },
          { name: 'Feb', maintenance: 1900, newAssets: 3200 },
          { name: 'Mar', maintenance: 800, newAssets: 7800 },
          { name: 'Apr', maintenance: 2400, newAssets: 1500 },
          { name: 'May', maintenance: 1100, newAssets: 5600 },
          { name: 'Jun', maintenance: 3200, newAssets: 2100 }
        ]
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};
