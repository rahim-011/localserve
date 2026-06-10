import express from 'express'
import tokenValidator from '../middlewares/authMiddleware.js';
import {addBooking,deleteBooking,getUserBookings} from '../controllers/bookingController.js';

export const bookingRouter = express.Router();
bookingRouter.post('/',tokenValidator,addBooking);
bookingRouter.get('/all',tokenValidator,getUserBookings);
bookingRouter.delete('/:deletedId',tokenValidator,deleteBooking);