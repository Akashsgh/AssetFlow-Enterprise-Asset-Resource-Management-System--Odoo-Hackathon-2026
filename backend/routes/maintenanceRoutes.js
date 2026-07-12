import express from 'express';
import {
  createMaintenance,
  getMaintenance,
  updateMaintenance
} from '../controllers/maintenanceController.js';

const router = express.Router();

router.route('/')
  .post(createMaintenance)
  .get(getMaintenance);

router.route('/:id')
  .put(updateMaintenance);

export default router;
