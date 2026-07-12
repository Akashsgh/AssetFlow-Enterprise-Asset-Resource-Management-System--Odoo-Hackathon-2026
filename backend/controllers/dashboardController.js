import Asset from '../models/Asset.js';
import Booking from '../models/Booking.js';
import Maintenance from '../models/Maintenance.js';

// @desc    Get dashboard metrics and KPIs
// @route   GET /api/dashboard/metrics
export const getDashboardMetrics = async (req, res) => {
  try {
    const totalAssets = await Asset.countDocuments();
    const availableAssets = await Asset.countDocuments({ status: 'available' });
    const assetsInUse = await Asset.countDocuments({ status: 'in-use' });
    const assetsInMaintenance = await Asset.countDocuments({ status: 'maintenance' });
    
    const pendingBookings = await Booking.countDocuments({ status: 'pending' });
    
    const activeMaintenance = await Maintenance.countDocuments({ 
      status: { $in: ['scheduled', 'in-progress'] } 
    });

    res.status(200).json({
      success: true,
      data: {
        totalAssets,
        availableAssets,
        assetsInUse,
        assetsInMaintenance,
        pendingBookings,
        activeMaintenance
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
