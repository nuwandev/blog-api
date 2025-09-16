/**
 * @copyright 2025 nuwandev
 * @license Apache-2.0
 */

/**
 * Node modules
 */
import dotenv from 'dotenv';

dotenv.config();

const config = {
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV,
  WHITELIST_ORIGINS: ['https://docs.blog-apai.codewithsadee.com'],
  MONGO_URI: process.env.MONGO_URI,
};

export default config;
