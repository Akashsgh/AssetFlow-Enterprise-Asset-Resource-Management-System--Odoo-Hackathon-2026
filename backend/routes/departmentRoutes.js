import express from 'express';
import { getDepartments, createDepartment, deleteDepartment } from '../controllers/departmentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);
router.route('/').get(getDepartments).post(createDepartment);
router.route('/:id').delete(deleteDepartment);

export default router;
