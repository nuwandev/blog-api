/**
 * @copyright 2025 nuwandev
 * @license Apache-2.0
 */

/**
 * Node modules
 */
import winston from 'winston';
import { Logtail } from '@logtail/node';
import { LogtailTransport } from '@logtail/winston';

/**
 * Custom modules
 */
import config from '@/config';

const { combine, timestamp, json, errors, align, printf, colorize } =
  winston.format;

//define the transports array to hold different logging transports
const transports: winston.transport[] = [];

// Create a Logtail transport instance
const logtail = new Logtail(config.LOGTAIL_SOURCE_TOKEN, {
  endpoint: `https://${config.LOGTAIL_INGESTING_HOST}`,
});

if (config.NODE_ENV === 'production') {
  if (!config.LOGTAIL_SOURCE_TOKEN || !config.LOGTAIL_INGESTING_HOST) {
    throw new Error(
      'Logtail source token and ingesting host must be provided in the configuration',
    );
  }

  transports.push(new LogtailTransport(logtail));
}

// If the application is not running in production, add a console transport
if (config.NODE_ENV !== 'production') {
  transports.push(
    new winston.transports.Console({
      format: combine(
        colorize({ all: true }), // add colors to log levels
        timestamp({ format: 'YYYY-MM-DD hh:mm:ss A' }), // add timestamp logs
        align(), // align log messages
        printf(({ timestamp, level, message, ...meta }) => {
          const metaStr = Object.keys(meta).length
            ? `\n${JSON.stringify(meta)}`
            : '';
          return `${timestamp} [${level}]: ${message}${metaStr}`;
        }),
      ),
    }),
  );
}

// Create a logger instance using Winston
const logger = winston.createLogger({
  level: config.LOG_LEVEL || 'info', // Sett the default logging level to 'info'
  format: combine(timestamp(), errors({ stack: true }), json()), // use JSON format for log messages
  transports,
  silent: config.NODE_ENV === 'test', // Disable logging in test environment
});

export { logger, logtail };
