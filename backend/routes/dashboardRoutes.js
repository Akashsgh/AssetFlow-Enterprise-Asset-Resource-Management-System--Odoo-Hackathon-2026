import express from 'express';
import { getStats, getRecentActivity } from '../controllers/dashboardController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/stats', protect, getStats);
router.get('/activity', protect, getRecentActivity);

export default router;
