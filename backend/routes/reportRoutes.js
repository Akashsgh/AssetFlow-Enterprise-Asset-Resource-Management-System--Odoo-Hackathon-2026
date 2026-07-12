import express from 'express';
import { getAssetReport, getBookingReport, getMaintenanceReport } from '../controllers/reportController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.get('/assets', getAssetReport);
router.get('/bookings', getBookingReport);
router.get('/maintenance', getMaintenanceReport);

export default router;
