import Audit from '../models/Audit.js';

export const getAuditLogs = async (req, res) => {
  try {
    const audits = await Audit.find()
      .populate('department', 'name')
      .populate('inspector', 'name email')
      .sort({ createdAt: -1 });
    res.json({ success: true, count: audits.length, data: audits });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

export const getAuditById = async (req, res) => {
  try {
    const audit = await Audit.findById(req.params.id)
      .populate('department', 'name')
      .populate('inspector', 'name email');
    if (!audit) {
      return res.status(404).json({ success: false, message: 'Audit not found' });
    }
    res.json({ success: true, data: audit });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

export const createAudit = async (req, res) => {
  try {
    const newAudit = await Audit.create(req.body);
    res.status(201).json({ success: true, data: newAudit });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Validation Error', error: error.message });
  }
};

export const updateAudit = async (req, res) => {
  try {
    const audit = await Audit.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!audit) {
      return res.status(404).json({ success: false, message: 'Audit not found' });
    }
    res.json({ success: true, data: audit });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Validation Error', error: error.message });
  }
};

export const deleteAudit = async (req, res) => {
  try {
    const audit = await Audit.findByIdAndDelete(req.params.id);
    if (!audit) {
      return res.status(404).json({ success: false, message: 'Audit not found' });
    }
    res.json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};
