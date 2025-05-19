// repository/taskRepository.js
const Task = require('../model/task');
let tasks = []; // In-memory "database"

class TaskRepository {
  generateId() {
    return Math.random().toString(36).substring(2, 15); // Simple ID generation
  }

  async getAllTasks() {
    return [...tasks]; // Return a copy to prevent direct modification
  }

  async getTaskById(id) {
    return tasks.find(task => task.id === id);
  }

  async createTask(title, description) {
    // ✅ Secure Coding: Input Validation (basic)
    if (!title || typeof title !== 'string' || title.trim() === '') {
      throw new Error('Title is required and must be a non-empty string.');
    }
    if (description && typeof description !== 'string') {
      throw new Error('Description must be a string.');
    }

    const newTask = new Task(this.generateId(), title.trim(), description ? description.trim() : '');
    tasks.push(newTask);
    return newTask;
  }

  async updateTask(id, title, description, completed) {
    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex === -1) {
      return null;
    }

    // ✅ Secure Coding: Input Validation (basic)
    if (title !== undefined && (typeof title !== 'string' || title.trim() === '')) {
      throw new Error('Title must be a non-empty string.');
    }
    if (description !== undefined && typeof description !== 'string') {
      throw new Error('Description must be a string.');
    }
    if (completed !== undefined && typeof completed !== 'boolean') {
      throw new Error('Completed must be a boolean.');
    }

    tasks[taskIndex].title = title !== undefined ? title.trim() : tasks[taskIndex].title;
    tasks[taskIndex].description = description !== undefined ? description.trim() : tasks[taskIndex].description;
    tasks[taskIndex].completed = completed !== undefined ? completed : tasks[taskIndex].completed;
    return tasks[taskIndex];
  }

  async deleteTask(id) {
    const initialLength = tasks.length;
    tasks = tasks.filter(task => task.id !== id);
    return tasks.length < initialLength;
  }
}

module.exports = new TaskRepository();