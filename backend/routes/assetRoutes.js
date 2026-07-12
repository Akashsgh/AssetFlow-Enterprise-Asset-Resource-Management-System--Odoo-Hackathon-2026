import express from 'express';
import { getAssets } from '../controllers/assetController.js';

const router = express.Router();

router.get('/', getAssets);

export default router;
