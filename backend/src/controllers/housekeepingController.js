import { createTask, getTasks ,getTasksByAssignedTo} from '../models/housekeepingModel.js';

export const createHousekeepingTask = async (req, res) => {
    try {
        const task = req.body;
        const newTask = await createTask(task);
        res.status(200).json({ success: true, data: newTask });
    } catch (error) {
        const status = error.message.includes('Invalid') ? 400 : 500;
        res.status(status).json({ 
            success: false, 
            message: error.message 
        });
    }
};
  
  export const listHousekeepingTasks = async (req, res) => {
    try {
      const tasks = await getTasks();
      res.status(200).json({ success: true, data: tasks });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  export const listHousekeepingTasksByAssignedTo = async (req, res) => {
    try {
        const { assigned_to } = req.body;
        if (!assigned_to) {
            return res.status(400).json({ 
                success: false, 
                message: 'assigned_to is required' 
            });
        }
        const tasks = await getTasksByAssignedTo(assigned_to);
        res.status(200).json({ success: true, data: tasks });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

  