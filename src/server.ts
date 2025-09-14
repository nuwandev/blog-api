/**
 * @copyright 2025 nuwandev
 * @license Apache-2.0
 */

/**
 * Node modules
 */
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import helmet from 'helmet';

/**
 * Custom modules
 */
import config from '@/config';
import limiter from '@/lib/express_rate_limit';

/**
 * Router
 */
import v1Router from '@/routes/v1';

/**
 * Types
 */
import type { CorsOptions } from 'cors';

/**
 * Express app initial
 */
const app = express();

// Configure COORS options
const corsOptions: CorsOptions = {
  origin(origin, callback) {
    if (
      config.NODE_ENV === 'development' ||
      !origin ||
      config.WHITELIST_ORIGINS.includes(origin)
    ) {
      callback(null, true);
    } else {
      //reject requests from non-whitelisted origins
      callback(
        new Error(`CORS error: ${origin} is not allowed by CORS`),
        false,
      );
      console.log(`CORS error: ${origin} is not allowed by CORS`);
    }
  },
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Enable JSON request body parsing
app.use(express.json());

// enable url-encoded request body parsing with extended mode
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// enable response compression reduce payload size and improve performance
app.use(
  compression({
    threshold: 1024, //only compress responses large than 1kb
  }),
);

// use helmet to enhance security by setting various http headers
app.use(helmet());

// apply rate limiting middleware to prevent excessive requests and enhance security
app.use(limiter);

/**
 * Immediately Invoked Async function expression (IIFE) to start the server
 */
(async () => {
  try {
    app.use('/api/v1', v1Router);

    app.listen(config.PORT, () => {
      console.log(`Server running: http://localhost:${config.PORT}`);
    });
  } catch (err) {
    console.log('Failed to start the server', err);

    if (config.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
})();

/**
 * Handles server shutdown gracefully by disconnecting from the database.
 */
const handleServerShutdown = async () => {
  try {
    console.log('Server SHUTDOWN');
    process.exit(0);
  } catch (err) {
    console.log('Error during server shutdown', err);
  }
};

/**
 * Listens for termination signals ('SIGTERM' and 'SIGINT').
 */
process.on('SIGTERM', handleServerShutdown);
process.on('SIGINT', handleServerShutdown);
