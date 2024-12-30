import pool from '../config/database.js';

export const addRoom = async (room) => {
  const { room_number, room_type, status, price } = room;
  const query = 'INSERT INTO rooms (room_number, room_type, status, price) VALUES ($1, $2, $3, $4) RETURNING *';
  const values = [room_number, room_type, status, price];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const getRoomsByStatus = async (status) => {
  const query = 'SELECT * FROM rooms WHERE status = $1';
  const result = await pool.query(query, [status]);
  return result.rows;
};

export const updateRoomStatus = async (id, status) => {
  const query = 'UPDATE rooms SET status = $1 WHERE id = $2 RETURNING *';
  const result = await pool.query(query, [status, id]);
  return result.rows[0];
};

export const deleteRoom = async (id) => {
  const query = 'DELETE FROM rooms WHERE id = $1 RETURNING *';
  const result = await pool.query(query, [id]);
  return result.rows[0];
};
