import Audit from '../models/Audit.js';
import Asset from '../models/Asset.js';

// @desc    Log a new audit result
// @route   POST /api/audits
export const createAudit = async (req, res) => {
  try {
    const { asset, auditor, status, remarks, auditDate } = req.body;

    const audit = await Audit.create({
      asset,
      auditor,
      status,
      remarks,
      auditDate
    });

    // Optionally update asset status based on audit result
    if (status === 'missing') {
      await Asset.findByIdAndUpdate(asset, { status: 'missing' });
    } else if (status === 'needs-repair') {
      await Asset.findByIdAndUpdate(asset, { status: 'maintenance' });
    }

    res.status(201).json({ success: true, data: audit });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all audits
// @route   GET /api/audits
export const getAudits = async (req, res) => {
  try {
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    if (req.query.asset) filter.asset = req.query.asset;
    if (req.query.auditor) filter.auditor = req.query.auditor;

    const audits = await Audit.find(filter)
      .populate('asset', 'name tag')
      .populate('auditor', 'name email')
      .sort('-auditDate');
    
    res.status(200).json({ success: true, count: audits.length, data: audits });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
