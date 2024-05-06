import express from 'express';
import cors from 'cors';
import allRouter from './allRouter.js';
import dotenv from 'dotenv';
import options from './swagger.js';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import jwt from 'jsonwebtoken';
import * as userService from './APP/Service/UserService.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { SequelizeInstance } from './APP/utility/DbHelper.js';
import * as loggingService from './APP/Service/LoggingService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const specs = swaggerJSDoc(options);
const app = express();
const PORT = process.env.PORT || 5000;
const SECRET_KEY = process.env.SECRET_KEY;
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON request bodies

const getUserInfoMiddleware = async (req, res, next) => {
  const accessToken =
    req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (!accessToken) {
    return res.status(401).json({
      error: 'Unauthorized - Access token missing',
      accessToken: accessToken,
    });
  }
  try {
    const decodedToken = jwt.verify(accessToken, SECRET_KEY);
    const userId = decodedToken.user_id;
    const [loginUser] = await userService.getUserInfoById(userId);
    console.log(loginUser);
    req.loginUser = loginUser;
    next();
  } catch (error) {
    res.status(401).json({
      error: 'Unauthorized - Invalid access token',
      message: error.message,
    });
  }
};

// Define an array of routes that require authentication
const authenticatedRoutes = ['/api/auth/'];

// Middleware for authentication
app.use(async (req, res, next) => {
  const requestedRoute = req.path;
  const authCheck = authenticatedRoutes.some((prefix) =>
    requestedRoute.includes(prefix),
  );
  if (authCheck) {
    await getUserInfoMiddleware(req, res, next);
  } else {
    next();
  }
});

// Routes
app.get('/', (req, res, next) => {
  res.send('Welcome to the PC_GEAR_CAPSTONE');
});

// Middleware function to check and modify numeric fields to be non-negative
function checkNonNegativeFields(req, res, next) {
  const fieldsToCheck = [];

  // Add numeric fields from req.params to fieldsToCheck array
  Object.entries(req.params).forEach(([key, value]) => {
    if (typeof value === 'number' && value < 0) {
      fieldsToCheck.push({ source: 'params', key });
    }
  });

  // Add numeric fields from req.query to fieldsToCheck array
  Object.entries(req.query).forEach(([key, value]) => {
    if (typeof value === 'number' && value < 0) {
      fieldsToCheck.push({ source: 'query', key });
    }
  });

  // Add numeric fields from req.body to fieldsToCheck array
  Object.entries(req.body).forEach(([key, value]) => {
    if (typeof value === 'number' && value < 0) {
      fieldsToCheck.push({ source: 'body', key });
    }
  });

  // Modify negative numeric fields to be 0
  fieldsToCheck.forEach(({ source, key }) => {
    if (req[source][key] < 0) {
      console.log(
        `Found negative numeric field '${key}' in ${source}: ${req[source][key]}. Setting it to 0.`,
      );
      req[source][key] = 0; // Set the value to 0 in the corresponding source (params, query, or body)
    }
  });

  console.log('~~~~~~~~~~~VALIDATED');
  next(); // Proceed to the next middleware or route handler
}

app.use(checkNonNegativeFields);

app.use(allRouter);

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(err.status || 500).json({
    errors: {
      message: err.message,
      error: {},
    },
  });
  next();
});
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
