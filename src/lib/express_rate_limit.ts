/**
 * @copyright 2025 nuwandev
 * @license Apache-2.0
 */

/**
 * Node modules
 */
import { rateLimit } from 'express-rate-limit';

// configure rate limiting middleware to prevent abuse
const limiter = rateLimit({
  windowMs: 6000, // 1-minute time windows for request limiting
  limit: 60, // allow a maximum of 50 requests per window per IP
  standardHeaders: 'draft-8', // use the latest standard rate-limit headers
  legacyHeaders: false, // disable deprecated X-RateLimit headers
  message: {
    error:
      'You have sent too many requests in a given amount of time. Please try again later.',
  },
});

export default limiter;