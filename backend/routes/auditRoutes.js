import express from 'express';
import { 
  getAuditLogs, 
  getAuditById, 
  createAudit, 
  updateAudit, 
  deleteAudit 
} from '../controllers/auditController.js';
// Add auth middleware if needed later
// import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(getAuditLogs)
  .post(createAudit);

router.route('/:id')
  .get(getAuditById)
  .put(updateAudit)
  .delete(deleteAudit);

export default router;
