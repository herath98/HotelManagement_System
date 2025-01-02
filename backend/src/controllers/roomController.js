import { addRoom, updateRoom, getRoomsByStatus, updateRoomStatus, deleteRoom } from '../models/roomModel.js';
import cloudinary from '../config/cloudinary.js';
import fs from 'fs/promises';

export const createRoom = async (req, res) => {
  try {
    const roomData = req.body;
    const files = req.files;
    
    console.log('Files received:', files);
    
    const imageUrls = [];
    if (files && files.length > 0) {
      try {
        for (const file of files) {
          console.log('Processing file:', file.originalname);
          
          // Read file buffer
          const fileBuffer = await fs.readFile(file.path);
          console.log('File buffer read, size:', fileBuffer.length);
          
          // Create a promise wrapper for cloudinary upload
          const uploadResult = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
              {
                folder: 'hotel-rooms',
                resource_type: 'auto'
              },
              (error, result) => {
                if (error) reject(error);
                else resolve(result);
              }
            );
            
            // Write buffer to stream
            uploadStream.end(fileBuffer);
          });
          
          console.log('Cloudinary upload result:', uploadResult);
          
          imageUrls.push(uploadResult.secure_url);
          
          // Clean up local file
          await fs.unlink(file.path);
          console.log('Local file cleaned up:', file.path);
        }
      } catch (uploadError) {
        console.error('Upload error:', uploadError);
        // Clean up any remaining files if upload fails
        for (const file of files) {
          try {
            await fs.unlink(file.path);
          } catch (cleanupError) {
            console.error('Error cleaning up file:', cleanupError);
          }
        }
        throw uploadError;
      }
    }

    // Set image URLs in room data (use empty array instead of null)
    roomData.image_urls = imageUrls;
    
    // Parse numeric fields
    roomData.base_price = parseFloat(roomData.base_price) || 0;
    roomData.capacity = parseInt(roomData.capacity) || 0;
    roomData.floor_number = roomData.floor_number ? parseInt(roomData.floor_number) : null;
    roomData.tax_rate = roomData.tax_rate ? parseFloat(roomData.tax_rate) : 0;
    roomData.room_size = parseInt(roomData.room_size) || 0;

    // Parse JSON fields with defaults
    try {
      roomData.amenities = roomData.amenities ? JSON.parse(roomData.amenities) : [];
      roomData.seasonal_pricing = roomData.seasonal_pricing ? JSON.parse(roomData.seasonal_pricing) : {};
      roomData.discount_rules = roomData.discount_rules ? JSON.parse(roomData.discount_rules) : {};
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      // If JSON parsing fails, set defaults
      roomData.amenities = [];
      roomData.seasonal_pricing = {};
      roomData.discount_rules = {};
    }

    // Set other defaults
    roomData.status = roomData.status || 'Available';
    roomData.maintenance_status = roomData.maintenance_status || 'Operational';
    roomData.is_smoking = roomData.is_smoking === 'true';
    roomData.view_type = roomData.view_type || null;
    roomData.description = roomData.description || null;
    roomData.room_category = roomData.room_category || null;

    console.log('Final room data:', roomData);

    const newRoom = await addRoom(roomData);
    res.status(201).json({ success: true, data: newRoom });
  } catch (error) {
    console.error('Final error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateRoomDetails = async (req, res) => {
  try {
    const { id } = req.body;
    const roomData = req.body;
    const files = req.files;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Room ID is required'
      });
    }

    console.log('Files received for update:', files);
    
    // Handle image uploads if new images are provided
    if (files && files.length > 0) {
      const imageUrls = [];
      try {
        for (const file of files) {
          console.log('Processing update file:', file.originalname);
          
          // Read file buffer
          const fileBuffer = await fs.readFile(file.path);
          console.log('Update file buffer read, size:', fileBuffer.length);
          
          // Create a promise wrapper for cloudinary upload
          const uploadResult = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
              {
                folder: 'hotel-rooms',
                resource_type: 'auto'
              },
              (error, result) => {
                if (error) reject(error);
                else resolve(result);
              }
            );
            
            // Write buffer to stream
            uploadStream.end(fileBuffer);
          });
          
          console.log('Cloudinary update result:', uploadResult);
          
          imageUrls.push(uploadResult.secure_url);
          
          // Clean up local file
          await fs.unlink(file.path);
          console.log('Local update file cleaned up:', file.path);
        }
        roomData.image_urls = imageUrls;
      } catch (uploadError) {
        console.error('Update upload error:', uploadError);
        // Clean up any remaining files if upload fails
        for (const file of files) {
          try {
            await fs.unlink(file.path);
          } catch (cleanupError) {
            console.error('Error cleaning up update file:', cleanupError);
          }
        }
        throw uploadError;
      }
    }

    // Parse numeric fields
    if (roomData.base_price) roomData.base_price = parseFloat(roomData.base_price);
    if (roomData.capacity) roomData.capacity = parseInt(roomData.capacity);
    if (roomData.floor_number) roomData.floor_number = parseInt(roomData.floor_number);
    if (roomData.tax_rate) roomData.tax_rate = parseFloat(roomData.tax_rate);
    if (roomData.room_size) roomData.room_size = parseInt(roomData.room_size);

    // Parse JSON fields
    try {
      if (roomData.amenities) roomData.amenities = JSON.parse(roomData.amenities);
      if (roomData.seasonal_pricing) roomData.seasonal_pricing = JSON.parse(roomData.seasonal_pricing);
      if (roomData.discount_rules) roomData.discount_rules = JSON.parse(roomData.discount_rules);
    } catch (parseError) {
      console.error('JSON parse error during update:', parseError);
      return res.status(400).json({
        success: false,
        message: 'Invalid JSON format in one of the fields'
      });
    }

    // Handle boolean fields
    if (roomData.is_smoking !== undefined) {
      roomData.is_smoking = roomData.is_smoking === 'true';
    }

    console.log('Final update room data:', roomData);

    const updatedRoom = await updateRoom(id, roomData);
    if (!updatedRoom) {
      return res.status(404).json({ 
        success: false, 
        message: 'Room not found' 
      });
    }

    res.status(200).json({ 
      success: true, 
      data: updatedRoom 
    });
    
  } catch (error) {
    console.error('Final update error:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};
  

export const getRoomAvailability = async (req, res) => {
    try {
      
      const rooms = await getRoomsByStatus('Available');
      res.status(200).json({ success: true, data: rooms });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
export const getRoomNotCleaned = async (req, res) => {
    try {
      
      const rooms = await getRoomsByStatus('Available Not Cleaned');
      res.status(200).json({ success: true, data: rooms });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

export const updateRoomByStatus = async (req, res) => {
    try {
      const {  id, status } = req.body;
      const updatedRoom = await updateRoomStatus(id, status);
      if (!updatedRoom) {
        return res.status(404).json({ success: false, message: 'Room not found' });
      }
      res.status(200).json({ success: true, data: updatedRoom });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

export const deleteRoomById = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedRoom = await deleteRoom(id);
      if (!deletedRoom) {
        return res.status(404).json({ success: false, message: 'Room not found' });
      }
      res.status(200).json({ success: true, data: deletedRoom });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
