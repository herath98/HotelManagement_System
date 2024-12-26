import express from 'express';
import { createRoom, getRoomAvailability, getRoomNotCleaned, updateRoom } from '../controllers/roomController.js';
import { verifyUser, requireRole } from '../middleware/validationMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * /rooms:
 *   post:
 *     summary: Add a new room.
  *     tags:
 *       - Rooms
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               room_number:
 *                 type: string
 *               room_type:
 *                 type: string
 *               status:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       200:
 *         description: Room added successfully.
 */
router.post('/rooms', verifyUser, requireRole(['admin','manager']), createRoom);

/**
 * @swagger
 * /rooms/availability:
 *   get:
 *     summary: Get available rooms.
 *     tags:
 *       - Rooms
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of rooms by status.
 */
router.get('/rooms/availability', verifyUser, requireRole(['admin','manager']), getRoomAvailability);
/**
 * @swagger
 * /rooms/not_cleaned/list:
 *   get:
 *     summary: Get not cleaned rooms.
 *     tags:
 *       - Rooms
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of rooms by status.
 */
router.get('/rooms/not_cleaned/list', verifyUser, requireRole(['admin','manager']), getRoomNotCleaned);

/**
 * @swagger
 * /rooms/status:
 *   post:
 *     summary: Update room status.
  *     tags:
 *       - Rooms
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Room status updated successfully.
 */
router.post('/rooms/status', verifyUser, requireRole(['admin']), updateRoom);

export default router;
