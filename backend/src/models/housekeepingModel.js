import pool from '../config/database.js';

export const createTask = async (task) => {
    const { room_id, task_name, task_status, scheduled_date, start_time, end_time, assigned_to } = task;
    
    try {
        // Verify that room_id exists
        const roomCheck = await pool.query('SELECT id FROM rooms WHERE id = $1', [room_id]);
        if (roomCheck.rows.length === 0) {
            throw new Error('Invalid room_id: Room does not exist');
        }

        // Verify that assigned_to user exists
        const userCheck = await pool.query('SELECT id FROM users WHERE id = $1', [assigned_to]);
        if (userCheck.rows.length === 0) {
            throw new Error('Invalid assigned_to: User does not exist');
        }

        // Convert date and times to proper timestamp with timezone
        const startTimestamp = new Date(`${scheduled_date}T${start_time}`).toISOString();
        const endTimestamp = new Date(`${scheduled_date}T${end_time}`).toISOString();
        
        const query = `
          INSERT INTO housekeeping_tasks 
            (room_id, task_name, task_status, scheduled_date, start_time, end_time, assigned_to)
          VALUES 
            ($1, $2, $3, $4, $5, $6, $7)
          RETURNING *`;
        
        const values = [
            room_id,
            task_name,
            task_status || 'Pending',
            scheduled_date,
            startTimestamp,
            endTimestamp,
            assigned_to
        ];
        
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        if (error.constraint === 'fk_room') {
            throw new Error('Invalid room_id: Room does not exist');
        } else if (error.constraint === 'fk_user') {
            throw new Error('Invalid assigned_to: User does not exist');
        }
        throw error;
    }
};




export const getTasks = async () => {
    const query = `
        SELECT 
            ht.*,
            u.username as assigned_to_name
        FROM 
            housekeeping_tasks ht
        LEFT JOIN 
            users u ON ht.assigned_to = u.id
        ORDER BY 
            scheduled_date ASC, start_time ASC`;
    const result = await pool.query(query);
    return result.rows;
};

export const getTasksByAssignedTo = async (userId) => {
    const query = `
        SELECT 
            ht.*,
            u.username as assigned_to_name
        FROM 
            housekeeping_tasks ht
        LEFT JOIN 
            users u ON ht.assigned_to = u.id
        WHERE 
            ht.assigned_to = $1
        ORDER BY 
            scheduled_date ASC, start_time ASC`;
    const values = [userId];
    try {
        const result = await pool.query(query, values);
        return result.rows;
    } catch (error) {
        console.error('Error in getTasksByAssignedTo:', error);
        throw error;
    }
};