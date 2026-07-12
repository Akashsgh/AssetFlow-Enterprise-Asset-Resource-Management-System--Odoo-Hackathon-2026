import express from 'express';
import { 
  getNotifications, 
  createNotification, 
  markAsRead, 
  markAllAsRead 
} from '../controllers/notificationController.js';

const router = express.Router();

router.route('/')
  .get(getNotifications)
  .post(createNotification);

router.put('/read-all', markAllAsRead);
router.put('/:id/read', markAsRead);

export default router;
