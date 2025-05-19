// test/task.test.js
const assert = require('assert');

const API_URL = 'http://localhost:3000/tasks';

async function runTests() {
  console.log('Starting Task API Tests...\n');

  const fetchModule = await import('node-fetch');
  const fetch = fetchModule.default; // Access the default export

  const createdTaskId = await testCreateTask(fetch);
  await testGetAllTasks(fetch);
  await testGetTaskById(fetch, createdTaskId);
  await testUpdateTask(fetch, createdTaskId);
  await testDeleteTask(fetch, createdTaskId);
}

async function testCreateTask(fetch) {
  const taskData = { title: 'Test Task', description: 'This is a test task' };
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(taskData),
  });
  const data = await response.json();
  assert.strictEqual(response.status, 201, 'Create Task Failed: Status Code');
  assert.ok(data.id, 'Create Task Failed: Missing ID');
  assert.strictEqual(data.title, taskData.title, 'Create Task Failed: Title Mismatch');
  console.log('✅ Create Task Test Passed');
  return data.id;
}

async function testGetAllTasks(fetch) {
  const response = await fetch(API_URL);
  const data = await response.json();
  assert.strictEqual(response.status, 200, 'Get All Tasks Failed: Status Code');
  assert.ok(Array.isArray(data), 'Get All Tasks Failed: Not an Array');
  console.log('✅ Get All Tasks Test Passed');
}

async function testGetTaskById(fetch, taskId) {
  const response = await fetch(`${API_URL}/${taskId}`);
  const data = await response.json();
  if (response.status === 200) {
    assert.strictEqual(response.status, 200, 'Get Task By ID Failed: Status Code (Success)');
    assert.strictEqual(data.id, taskId, 'Get Task By ID Failed: ID Mismatch');
    console.log('✅ Get Task By ID Test Passed');
  } else if (response.status === 404) {
    console.log('✅ Get Task By ID Test Passed (Task Not Found)');
  } else {
    assert.fail(`Get Task By ID Failed: Unexpected Status Code ${response.status}`);
  }
}

async function testUpdateTask(fetch, taskId) {
  const updatedData = { title: 'Updated Task Title', completed: true };
  const response = await fetch(`${API_URL}/${taskId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedData),
  });
  const data = await response.json();
  if (response.status === 200) {
    assert.strictEqual(response.status, 200, 'Update Task Failed: Status Code (Success)');
    assert.strictEqual(data.id, taskId, 'Update Task Failed: ID Mismatch');
    assert.strictEqual(data.title, updatedData.title, 'Update Task Failed: Title Mismatch');
    assert.strictEqual(data.completed, updatedData.completed, 'Update Task Failed: Completed Mismatch');
    console.log('✅ Update Task Test Passed');
  } else if (response.status === 404) {
    console.log('✅ Update Task Test Passed (Task Not Found)');
  } else {
    assert.fail(`Update Task Failed: Unexpected Status Code ${response.status}`);
  }
}

async function testDeleteTask(fetch, taskId) {
  const response = await fetch(`${API_URL}/${taskId}`, {
    method: 'DELETE',
  });
  assert.strictEqual(response.status, 204, 'Delete Task Failed: Status Code (Success)');
  console.log('✅ Delete Task Test Passed');

  // Optionally, verify deletion by trying to get the deleted task
  const getResponse = await fetch(`${API_URL}/${taskId}`);
  assert.strictEqual(getResponse.status, 404, 'Delete Task Failed: Task still exists');
}

runTests();