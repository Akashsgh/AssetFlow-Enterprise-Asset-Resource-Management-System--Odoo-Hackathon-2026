import express from 'express';
import { protect } from '../middleware/auth.js';
import { 
  getProfile, 
  updateProfile, 
  updateSettings, 
  changePassword 
} from '../controllers/userController.js';

const router = express.Router();

router.route('/profile')
  .get(protect, getProfile)
  .put(protect, updateProfile);

router.put('/settings', protect, updateSettings);
router.put('/password', protect, changePassword);

export default router;
