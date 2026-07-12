import express from 'express';
import { getAllBookings, createBooking, updateBookingStatus } from '../controllers/bookingController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, getAllBookings);
router.post('/', protect, createBooking);
router.put('/:id', protect, updateBookingStatus);

export default router;
