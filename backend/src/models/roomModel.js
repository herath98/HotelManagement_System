import pool from '../config/database.js';

export const addRoom = async (room) => {
  const {
    room_number,
    room_type,
    status,
    base_price,
    capacity,
    bed_type,
    amenities,
    room_size,
    view_type,
    floor_number,
    description,
    image_urls,
    room_category,
    maintenance_status,
    is_smoking,
    seasonal_pricing,
    tax_rate,
    discount_rules
  } = room;

  const query = `
    INSERT INTO rooms (
      room_number, room_type, status, base_price, capacity, bed_type, 
      amenities, room_size, view_type, floor_number, description, 
      image_urls, room_category, maintenance_status, is_smoking,
      seasonal_pricing, tax_rate, discount_rules
    ) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18) 
    RETURNING *`;

  const values = [
    room_number,
    room_type,
    status,
    base_price,
    capacity,
    bed_type,
    amenities,
    room_size,
    view_type,
    floor_number,
    description,
    image_urls,
    room_category,
    maintenance_status,
    is_smoking,
    seasonal_pricing,
    tax_rate,
    discount_rules
  ];

  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error('Database error:', error);
    throw new Error(`Failed to add room: ${error.message}`);
  }
};

export const updateRoom = async (id, room) => {
  const {
    room_number,
    room_type,
    status,
    base_price,
    capacity,
    bed_type,
    amenities,
    room_size,
    view_type,
    floor_number,
    description,
    image_urls,
    room_category,
    maintenance_status,
    is_smoking,
    seasonal_pricing,
    tax_rate,
    discount_rules
  } = room;

  const query = `
    UPDATE rooms 
    SET room_number = COALESCE($1, room_number), 
        room_type = COALESCE($2, room_type), 
        status = COALESCE($3, status), 
        base_price = COALESCE($4, base_price),
        capacity = COALESCE($5, capacity), 
        bed_type = COALESCE($6, bed_type), 
        amenities = COALESCE($7, amenities), 
        room_size = COALESCE($8, room_size),
        view_type = COALESCE($9, view_type), 
        floor_number = COALESCE($10, floor_number), 
        description = COALESCE($11, description),
        image_urls = COALESCE($12, image_urls), 
        room_category = COALESCE($13, room_category), 
        maintenance_status = COALESCE($14, maintenance_status),
        is_smoking = COALESCE($15, is_smoking), 
        seasonal_pricing = COALESCE($16, seasonal_pricing), 
        tax_rate = COALESCE($17, tax_rate),
        discount_rules = COALESCE($18, discount_rules)
    WHERE id = $19 
    RETURNING *`;

  const values = [
    room_number,
    room_type,
    status,
    base_price,
    capacity,
    bed_type,
    amenities,
    room_size,
    view_type,
    floor_number,
    description,
    image_urls,
    room_category,
    maintenance_status,
    is_smoking,
    seasonal_pricing,
    tax_rate,
    discount_rules,
    id
  ];

  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error('Database error:', error);
    throw new Error(`Failed to update room: ${error.message}`);
  }
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

export const getRoomById = async (id) => {
  const query = 'SELECT * FROM rooms WHERE id = $1';
  const result = await pool.query(query, [id]);
  return result.rows[0];
};
