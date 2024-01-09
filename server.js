import express from 'express';
import cors from 'cors';
import allRouter from './allRouter.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON request bodies

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the PC_GEAR_CAPSTONE');
});

app.use(allRouter);

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(err.status || 500).json({
    errors: {
      message: err.message,
      error: {},
    },
  });
});

app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
