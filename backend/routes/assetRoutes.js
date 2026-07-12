import express from 'express';
import {
  createAsset,
  getAssets,
  getAssetById,
  updateAsset,
  deleteAsset,
} from '../controllers/assetController.js';

const router = express.Router();

router.route('/')
  .post(createAsset)
  .get(getAssets);

router.route('/:id')
  .get(getAssetById)
  .put(updateAsset)
  .delete(deleteAsset);

export default router;
