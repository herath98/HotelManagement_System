import express from 'express';
import { createHousekeepingTask, listHousekeepingTasks,listHousekeepingTasksByAssignedTo} from '../controllers/housekeepingController.js';
import { verifyUser, requireRole } from '../middleware/validationMiddleware.js';

const router = express.Router();


/**
 * @swagger
 * /housekeeping/task:
 *   post:
 *     summary: Create a new housekeeping task.
 *     tags:
 *       - Schedule task
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               room_id:
 *                 type: integer
 *               task_name:
 *                 type: string
 *               task_status:
 *                 type: string
 *                 enum: [Pending, Complete, Not Complete]
 *               scheduled_date:
 *                 type: string
 *                 format: date
 *               start_time:
 *                 type: string
 *                 format: time
 *                 example: "14:30:00"
 *               end_time:
 *                 type: string
 *                 format: time
 *                 example: "15:30:00"
 *               assigned_to:
 *                 type: integer
 *                 description: User ID of the person assigned to the task.
 *     responses:
 *       200:
 *         description: Housekeeping task created successfully.
 */
router.post('/housekeeping/task', verifyUser, requireRole(['admin', 'manager']), createHousekeepingTask);

/**
 * @swagger
 * /assigned/task:
 *   post:
 *     summary: Get housekeeping tasks by assigned to.
 *     tags:
 *       - Schedule task
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               assigned_to:
 *                 type: integer
 *                 description: User ID of the person assigned to the task.
 *     responses:
 *       200:
 *         description: List of housekeeping tasks.
 */
router.post('/assigned/task', verifyUser, listHousekeepingTasksByAssignedTo);


/**
 * @swagger
 * /housekeeping/task/list:
 *   get:
 *     summary: List all housekeeping tasks.
 *     tags:
 *       - Schedule task
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of housekeeping tasks.
 */
router.get('/housekeeping/task/list', verifyUser, listHousekeepingTasks );

export default router;
