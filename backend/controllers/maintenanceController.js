import Maintenance from '../models/Maintenance.js';
import Asset from '../models/Asset.js';

// @desc    Schedule new maintenance
// @route   POST /api/maintenance
export const createMaintenance = async (req, res) => {
  try {
    const { asset, description, scheduledDate, performedBy } = req.body;

    const maintenance = await Maintenance.create({
      asset,
      description,
      scheduledDate,
      performedBy,
      status: 'scheduled'
    });

    // Automatically update the asset status to 'maintenance'
    await Asset.findByIdAndUpdate(asset, { status: 'maintenance' });

    res.status(201).json({ success: true, data: maintenance });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all maintenance tasks
// @route   GET /api/maintenance
export const getMaintenance = async (req, res) => {
  try {
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    if (req.query.asset) filter.asset = req.query.asset;

    const maintenanceList = await Maintenance.find(filter)
      .populate('asset', 'name tag location');
    
    res.status(200).json({ success: true, count: maintenanceList.length, data: maintenanceList });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update maintenance status (e.g. mark completed)
// @route   PUT /api/maintenance/:id
export const updateMaintenance = async (req, res) => {
  try {
    const { status, cost, completedDate } = req.body;
    let maintenance = await Maintenance.findById(req.params.id);

    if (!maintenance) {
      return res.status(404).json({ success: false, message: 'Maintenance record not found' });
    }

    maintenance.status = status || maintenance.status;
    maintenance.cost = cost !== undefined ? cost : maintenance.cost;
    
    if (status === 'completed' && !maintenance.completedDate) {
      maintenance.completedDate = completedDate || new Date();
    }

    await maintenance.save();

    // If maintenance is completed, make the asset available again
    if (status === 'completed') {
      await Asset.findByIdAndUpdate(maintenance.asset, { status: 'available' });
    }

    res.status(200).json({ success: true, data: maintenance });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
