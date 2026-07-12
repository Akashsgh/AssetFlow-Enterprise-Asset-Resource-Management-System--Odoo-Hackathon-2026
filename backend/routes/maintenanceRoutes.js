import express from 'express';
import { getAllMaintenance, createMaintenanceTicket, resolveTicket } from '../controllers/maintenanceController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, getAllMaintenance);
router.post('/', protect, createMaintenanceTicket);
router.put('/:id/resolve', protect, resolveTicket);

export default router;
