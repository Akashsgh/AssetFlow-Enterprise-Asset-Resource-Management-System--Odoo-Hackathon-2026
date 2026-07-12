import express from 'express';
import {
  createAudit,
  getAudits
} from '../controllers/auditController.js';

const router = express.Router();

router.route('/')
  .post(createAudit)
  .get(getAudits);

export default router;
