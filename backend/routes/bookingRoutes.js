import express from 'express';
import {
  createBooking,
  getBookings,
  updateBooking
} from '../controllers/bookingController.js';

const router = express.Router();

router.route('/')
  .post(createBooking)
  .get(getBookings);

router.route('/:id')
  .put(updateBooking);

export default router;
