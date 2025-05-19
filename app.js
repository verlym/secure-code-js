// app.js
const express = require('express');
const bodyParser = require('body-parser');
const taskController = require('./controller/taskController');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Routes
app.get('/tasks', (req, res) => taskController.getAllTasks(req, res));
app.get('/tasks/:id', (req, res) => taskController.getTaskById(req, res));
app.post('/tasks', (req, res) => taskController.createTask(req, res));
app.put('/tasks/:id', (req, res) => taskController.updateTask(req, res));
app.delete('/tasks/:id', (req, res) => taskController.deleteTask(req, res));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// ✅ Secure Coding: Rate Limiting (Basic - consider using middleware like `express-rate-limit`)
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes.',
});
app.use('/tasks', limiter); // Apply rate limiting to the /tasks routes

// ✅ Secure Coding: Helmet (Basic security headers - install with `npm install helmet`)
const helmet = require('helmet');
app.use(helmet());

// ✅ Secure Coding: Prevent Parameter Pollution (consider using middleware like `hpp`)
const hpp = require('hpp');
app.use(hpp());

// ✅ Secure Coding: CORS (Configure carefully - install with `npm install cors`)
const cors = require('cors');
const corsOptions = {
  // origin: 'https://your-allowed-origin.com', // Specific origin
  origin: '*', // For development - be specific in production
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Allow cookies etc.
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

// ✅ Secure Coding: Logging (Implement proper logging - consider using libraries like Winston or Morgan)
const morgan = require('morgan');
app.use(morgan('combined')); // Log HTTP requests