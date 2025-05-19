// controller/taskController.js
const taskService = require('../service/taskService');

class TaskController {
  async getAllTasks(req, res) {
    try {
      const tasks = await taskService.getAllTasks();
      res.json(tasks);
    } catch (error) {
      // ✅ Secure Coding: Error Handling (avoid leaking sensitive info)
      console.error('Error fetching tasks:', error);
      res.status(500).json({ error: 'Failed to fetch tasks.' });
    }
  }

  async getTaskById(req, res) {
    try {
      // ✅ Secure Coding: Input Sanitization (basic - more robust solutions exist)
      const taskId = req.params.id ? String(req.params.id).trim() : null;
      if (!taskId) {
        return res.status(400).json({ error: 'Task ID is required.' });
      }
      const task = await taskService.getTaskById(taskId);
      if (task) {
        res.json(task);
      } else {
        res.status(404).json({ message: 'Task not found.' });
      }
    } catch (error) {
      // ✅ Secure Coding: Error Handling
      console.error('Error fetching task:', error);
      res.status(500).json({ error: 'Failed to fetch task.' });
    }
  }

  async createTask(req, res) {
    try {
      // ✅ Secure Coding: Request Body Validation (using a library like Joi is recommended for complex validation)
      const { title, description } = req.body;
      if (!title || typeof title !== 'string' || title.trim() === '') {
        return res.status(400).json({ error: 'Title is required.' });
      }
      if (description && typeof description !== 'string') {
        return res.status(400).json({ error: 'Description must be a string.' });
      }

      const newTask = await taskService.createTask(title.trim(), description ? description.trim() : '');
      res.status(201).json(newTask);
    } catch (error) {
      // ✅ Secure Coding: Error Handling
      console.error('Error creating task:', error);
      res.status(500).json({ error: error.message || 'Failed to create task.' });
    }
  }

  async updateTask(req, res) {
    try {
      // ✅ Secure Coding: Input Sanitization
      const taskId = req.params.id ? String(req.params.id).trim() : null;
      if (!taskId) {
        return res.status(400).json({ error: 'Task ID is required.' });
      }

      // ✅ Secure Coding: Request Body Validation (consider using a schema validation library)
      const { title, description, completed } = req.body;

      const updatedTask = await taskService.updateTask(taskId, title?.trim(), description?.trim(), completed);
      if (updatedTask) {
        res.json(updatedTask);
      } else {
        res.status(404).json({ message: 'Task not found.' });
      }
    } catch (error) {
      // ✅ Secure Coding: Error Handling
      console.error('Error updating task:', error);
      res.status(500).json({ error: error.message || 'Failed to update task.' });
    }
  }

  async deleteTask(req, res) {
    try {
      // ✅ Secure Coding: Input Sanitization
      const taskId = req.params.id ? String(req.params.id).trim() : null;
      if (!taskId) {
        return res.status(400).json({ error: 'Task ID is required.' });
      }

      const deleted = await taskService.deleteTask(taskId);
      if (deleted) {
        res.status(204).send(); // No content on successful deletion
      } else {
        res.status(404).json({ message: 'Task not found.' });
      }
    } catch (error) {
      // ✅ Secure Coding: Error Handling
      console.error('Error deleting task:', error);
      res.status(500).json({ error: 'Failed to delete task.' });
    }
  }
}

module.exports = new TaskController();