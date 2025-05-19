Okay, here are all the `curl` commands gathered from the manual testing guide for the task management app:

**1. Retrieve All Tasks:**

```bash
curl http://localhost:3000/tasks
```

**2. Retrieve Task by ID (replace `your_task_id` with an actual ID):**

```bash
curl http://localhost:3000/tasks/your_task_id
```

**3. Create a New Task (example with "Buy milk"):**

```bash
curl -X POST -H "Content-Type: application/json" -d '{"title": "Buy milk", "description": "From the supermarket"}' http://localhost:3000/tasks
```

\*\* - Test case: Missing title:\*\*

```bash
curl -X POST -H "Content-Type: application/json" -d '{"description": "No title provided"}' http://localhost:3000/tasks
```

\*\* - Test case: Empty title:\*\*

```bash
curl -X POST -H "Content-Type: application/json" -d '{"title": "", "description": "Empty title"}' http://localhost:3000/tasks
```

\*\* - Test case: Non-string title:\*\*

```bash
curl -X POST -H "Content-Type: application/json" -d '{"title": 123, "description": "Number as title"}' http://localhost:3000/tasks
```

\*\* - Test case: Non-string description:\*\*

```bash
curl -X POST -H "Content-Type: application/json" -d '{"title": "Valid Title", "description": true}' http://localhost:3000/tasks
```

**4. Update an Existing Task (replace `existing_task_id` with an actual ID):**

\*\* - Example updating title and completion status:\*\*

```bash
curl -X PUT -H "Content-Type: application/json" -d '{"title": "Walk the dog", "completed": true}' http://localhost:3000/tasks/existing_task_id
```

\*\* - Example updating only the description:\*\*

```bash
curl -X PUT -H "Content-Type: application/json" -d '{"description": "Walk the dog in the park"}' http://localhost:3000/tasks/existing_task_id
```

\*\* - Test case: Updating title to empty string:\*\*

```bash
curl -X PUT -H "Content-Type: application/json" -d '{"title": ""}' http://localhost:3000/tasks/existing_task_id
```

\*\* - Test case: Invalid `completed` type:\*\*

```bash
curl -X PUT -H "Content-Type: application/json" -d '{"completed": "yes"}' http://localhost:3000/tasks/existing_task_id
```

\*\* - Test case: Invalid `title` type:\*\*

```bash
curl -X PUT -H "Content-Type: application/json" -d '{"title": 456}' http://localhost:3000/tasks/existing_task_id
```

\*\* - Test case: Invalid `description` type:\*\*

```bash
curl -X PUT -H "Content-Type: application/json" -d '{"description": null}' http://localhost:3000/tasks/existing_task_id
```

**5. Delete a Task (replace `task_to_delete_id` with an actual ID):**

```bash
curl -X DELETE http://localhost:3000/tasks/task_to_delete_id
```

This collection provides a comprehensive set of `curl` commands to test the various functionalities and some basic validation scenarios of your task management API. Remember to replace the placeholder IDs with actual IDs from your application when testing specific tasks.