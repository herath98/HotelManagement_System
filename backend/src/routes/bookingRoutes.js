// routes/bookingRoutes.js
import express from 'express';
import { 
    createBooking, 
    updateBooking, 
    getBookingList,
    getBookingById,
    updateBookingStatus
} from '../controllers/bookingController.js';
import { verifyUser, requireRole } from '../middleware/validationMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * /booking/list:
 *   get:
 *     summary: Get a list of all bookings
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Filter bookings by status
 *     tags:
 *       - Booking
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of bookings
 */
router.get('/booking/list', verifyUser, requireRole(['admin', 'manager']),getBookingList);

/**
 * @swagger
 * /booking/view/{bookingId}:
 *   get:
 *     summary: Get a booking by ID
 *     parameters:
 *       - in: path
 *         name: bookingId
 *         required: true
 *         description: ID of the booking to retrieve
 *         schema:
 *           type: string
 *     tags:
 *       - Booking
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved the booking
 *       404:
 *         description: Booking not found
 */
router.get('/booking/view/:bookingId', verifyUser,requireRole(['admin', 'manager','guest']),getBookingById);

/**
 * @swagger
 * /booking/create:
 *   post:
 *     summary: Create a new booking
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               roomId:
 *                 type: string
 *               checkInDate:
 *                 type: string
 *                 format: date
 *               checkOutDate:
 *                 type: string
 *                 format: date
 *               email:
 *                 type: string
 *               status:
 *                 type: string
 *                 example: "Confirmed"
 *     tags:
 *       - Booking
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Booking created successfully
 */
router.post('/booking/create', verifyUser,requireRole(['admin', 'manager','guest']),createBooking);

/**
 * @swagger
 * /booking/update/{bookingId}:
 *   put:
 *     summary: Update an existing booking
 *     parameters:
 *       - in: path
 *         name: bookingId
 *         required: true
 *         description: ID of the booking to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               checkInDate:
 *                 type: string
 *                 format: date
 *               checkOutDate:
 *                 type: string
 *                 format: date
 *               status:
 *                 type: string
 *     tags:
 *       - Booking
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Booking updated successfully
 */
router.put('/booking/update/:bookingId',verifyUser,requireRole(['admin', 'manager','guest']), updateBooking);

/**
 * @swagger
 * /booking/status/{bookingId}:
 *   put:
 *     summary: Update booking status
 *     parameters:
 *       - in: path
 *         name: bookingId
 *         required: true
 *         description: ID of the booking to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, confirmed, cancelled, completed]
 *     tags:
 *       - Booking
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Booking status updated successfully
 */
router.put('/booking/status/:bookingId', verifyUser,requireRole(['admin', 'manager','guest']),updateBookingStatus);

export default router;