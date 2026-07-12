import Asset from '../models/Asset.js';
import { generateAssetTag } from '../utils/generateAssetTag.js';

// @desc    Create new asset
// @route   POST /api/assets
// @access  Private
export const createAsset = async (req, res) => {
  try {
    const { name, category, department, assignedTo, purchaseDate, warrantyUntil, location, status } = req.body;
    let tag = req.body.tag;

    if (!name) {
      return res.status(400).json({ success: false, message: 'Asset name is required' });
    }

    if (!tag) {
      tag = generateAssetTag();
    } else {
      const existingAsset = await Asset.findOne({ tag });
      if (existingAsset) {
        return res.status(400).json({ success: false, message: 'Asset tag already exists' });
      }
    }

    const asset = await Asset.create({
      name,
      tag,
      category: category || null,
      department: department || null,
      assignedTo: assignedTo || null,
      purchaseDate,
      warrantyUntil,
      location,
      status: status || 'available'
    });

    res.status(201).json({ success: true, data: asset });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all assets
// @route   GET /api/assets
// @access  Private
export const getAssets = async (req, res) => {
  try {
    // Basic filtering based on query params
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    if (req.query.department) filter.department = req.query.department;
    if (req.query.category) filter.category = req.query.category;

    const assets = await Asset.find(filter)
      .populate('category', 'name')
      .populate('department', 'name')
      .populate('assignedTo', 'name email');
    
    res.status(200).json({ success: true, count: assets.length, data: assets });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single asset
// @route   GET /api/assets/:id
// @access  Private
export const getAssetById = async (req, res) => {
  try {
    const asset = await Asset.findById(req.params.id)
      .populate('category', 'name')
      .populate('department', 'name')
      .populate('assignedTo', 'name email');

    if (!asset) {
      return res.status(404).json({ success: false, message: 'Asset not found' });
    }

    res.status(200).json({ success: true, data: asset });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update asset
// @route   PUT /api/assets/:id
// @access  Private
export const updateAsset = async (req, res) => {
  try {
    let asset = await Asset.findById(req.params.id);

    if (!asset) {
      return res.status(404).json({ success: false, message: 'Asset not found' });
    }

    // Check if tag is being changed and if it already exists
    if (req.body.tag && req.body.tag !== asset.tag) {
      const existingAsset = await Asset.findOne({ tag: req.body.tag });
      if (existingAsset) {
        return res.status(400).json({ success: false, message: 'Asset tag already exists' });
      }
    }

    asset = await Asset.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
      .populate('category', 'name')
      .populate('department', 'name')
      .populate('assignedTo', 'name email');

    res.status(200).json({ success: true, data: asset });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete asset
// @route   DELETE /api/assets/:id
// @access  Private
export const deleteAsset = async (req, res) => {
  try {
    const asset = await Asset.findById(req.params.id);

    if (!asset) {
      return res.status(404).json({ success: false, message: 'Asset not found' });
    }

    await asset.deleteOne();

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
