import Maintenance from '../models/Maintenance.js';
import Asset from '../models/Asset.js';

export const getAllMaintenance = async (req, res) => {
  try {
    const { status, priority } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    const tickets = await Maintenance.find(filter).populate('asset', 'name tag').populate('reportedBy', 'name').populate('resolvedBy', 'name').sort('-createdAt');
    res.json({ success: true, tickets });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const createMaintenanceTicket = async (req, res) => {
  try {
    const ticket = await Maintenance.create({ ...req.body, reportedBy: req.user.id });
    await Asset.findByIdAndUpdate(req.body.asset, { status: 'Under Maintenance' });
    res.status(201).json({ success: true, ticket });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const resolveTicket = async (req, res) => {
  try {
    const ticket = await Maintenance.findByIdAndUpdate(
      req.params.id,
      { status: 'Resolved', resolvedBy: req.user.id, resolvedAt: new Date(), notes: req.body.notes, cost: req.body.cost },
      { new: true }
    );
    if (!ticket) return res.status(404).json({ success: false, message: 'Ticket not found' });
    await Asset.findByIdAndUpdate(ticket.asset, { status: 'Available' });
    res.json({ success: true, ticket });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
