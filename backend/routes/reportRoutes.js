import express from 'express';
import { getGeneralReport } from '../controllers/reportController.js';

const router = express.Router();

router.get('/general', getGeneralReport);

export default router;
