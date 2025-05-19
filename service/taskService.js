// service/taskService.js
const taskRepository = require('../repository/taskRepository');

class TaskService {
  async getAllTasks() {
    return taskRepository.getAllTasks();
  }

  async getTaskById(id) {
    return taskRepository.getTaskById(id);
  }

  async createTask(title, description) {
    // ✅ Secure Coding: Business Logic Validation (can be added here)
    if (title && title.length > 100) {
      throw new Error('Title cannot exceed 100 characters.');
    }
    return taskRepository.createTask(title, description);
  }

  async updateTask(id, title, description, completed) {
    return taskRepository.updateTask(id, title, description, completed);
  }

  async deleteTask(id) {
    return taskRepository.deleteTask(id);
  }
}

module.exports = new TaskService();