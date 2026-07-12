import express from 'express';
import { getAllAssets, getAssetById, createAsset, updateAsset, deleteAsset } from '../controllers/assetController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, getAllAssets);
router.get('/:id', protect, getAssetById);
router.post('/', protect, authorize('admin', 'manager'), createAsset);
router.put('/:id', protect, authorize('admin', 'manager'), updateAsset);
router.delete('/:id', protect, authorize('admin'), deleteAsset);

export default router;
