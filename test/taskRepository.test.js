// taskRepository.test.js
const TaskRepository = require("../repository/taskRepository");

describe("TaskRepository", () => {
  beforeEach( async () => {
    // Clear tasks array before each test
     await TaskRepository.deleteTask(); // Clear tasks array
  });

  describe("generateId", () => {
    it("should generate a unique ID", () => {
      const id = TaskRepository.generateId();
      expect(id).toBeDefined();
      expect(typeof id).toBe("string");
    });
  });

  describe("getAllTasks", () => {
    it("should return an empty array when no tasks exist", async () => {
      const tasks = await TaskRepository.getAllTasks();
      expect(tasks).toEqual([]);
    });

    it("should return all tasks", async () => {
      // Arrange
      const task1 = await TaskRepository.createTask("Task1", "Description1");
      const task2 = await TaskRepository.createTask("Task2", "Description2");

      // Act
      const tasks = await TaskRepository.getAllTasks();

      // Assert
      expect(tasks).toHaveLength(2);
      expect(tasks).toContainEqual(task1);
      expect(tasks).toContainEqual(task2);
    });
  });

  describe("getTaskById", () => {
    it("should return null for non-existing task", async () => {
      const task = await TaskRepository.getTaskById("non-existing-id");
      expect(task).toBeNull();
    });

    it("should return a task by ID", async () => {
      // Arrange
      const task = await TaskRepository.createTask("Task", "Description");

      // Act
      const foundTask = await TaskRepository.getTaskById(task.id);

      // Assert
      expect(foundTask).not.toBeNull();
      expect(foundTask.id).toBe(task.id);
    });
  });

  describe("createTask", () => {
    it("should create a task with title and description", async () => {
      // Act
      const task = await TaskRepository.createTask(
        "Task Title",
        "Task Description"
      );

      // Assert
      expect(task).toHaveProperty("id");
      expect(task.title).toBe("Task Title");
      expect(task.description).toBe("Task Description");
    });

    it("should throw an error for empty title", async () => {
      await expect(
        TaskRepository.createTask("", "Description")
      ).rejects.toThrowError(
        "Title is required and must be a non-empty string."
      );
    });

    it("should handle optional description", async () => {
      const task = await TaskRepository.createTask("Task Title");
      expect(task.description).toBe("");
    });
  });

  describe("updateTask", () => {
    it("should update a task", async () => {
      // Arrange
      const task = await TaskRepository.createTask(
        "Old Title",
        "Old Description"
      );

      // Act
      const updatedTask = await TaskRepository.updateTask(
        task.id,
        "New Title",
        "New Description",
        true
      );

      // Assert
      expect(updatedTask.title).toBe("New Title");
      expect(updatedTask.description).toBe("New Description");
      expect(updatedTask.completed).toBe(true);
    });

    it("should return null for non-existing task", async () => {
      const result = await TaskRepository.updateTask(
        "non-existing-id",
        "New Title",
        "New Description"
      );
      expect(result).toBeNull();
    });

    it("should throw an error for invalid inputs", async () => {
      const task = await TaskRepository.createTask("Task", "Description");

      await expect(
        TaskRepository.updateTask(task.id, "", "Description")
      ).rejects.toThrowError("Title must be a non-empty string.");
      await expect(
        TaskRepository.updateTask(task.id, "New Title", 123)
      ).rejects.toThrowError("Description must be a string.");
      await expect(
        TaskRepository.updateTask(
          task.id,
          "New Title",
          "New Description",
          "invalid-boolean"
        )
      ).rejects.toThrowError("Completed must be a boolean.");
    });
  });

  describe("deleteTask", () => {
    // taskRepository.test.js
    it("should delete a task", async () => {
      // Arrange
      const task = await TaskRepository.createTask("Task1", "Description1");

      // Act
      const result = await TaskRepository.deleteTask(task.id);

      // Assert
      expect(result).toBe(true);
    });

    it("should return false if task does not exist", async () => {
      const result = await TaskRepository.deleteTask("non-existing-id");
      expect(result).toBe(false);
    });
  });
});
