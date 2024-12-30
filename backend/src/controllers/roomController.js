import { addRoom, getRoomsByStatus, updateRoomStatus, deleteRoom } from '../models/roomModel.js';

export const createRoom = async (req, res) => {
  try {
    const room = req.body;
    const newRoom = await addRoom(room);
    res.status(200).json({ success: true, data: newRoom });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
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

export const updateRoom = async (req, res) => {
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
