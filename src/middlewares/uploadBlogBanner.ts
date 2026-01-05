/**
 * @copyright 2025 nuwandev
 * @license Apache-2.0
 */

/**
 * Custom modules
 */
import { logger } from '@/lib/winston';
import uploadToCloudinary from '@/lib/cloudinary';

/**
 * Models
 */
import Blog from '@/models/blog';

/**
 * Types
 */
import type { Request, Response, NextFunction } from 'express';
import type { UploadApiErrorResponse } from 'cloudinary';

/**
 * Constants
 */
const MAX_FILE_SIZE = 2 * 1023 * 1024; // 2 MB

const uploadBlogBanner = (method: 'post' | 'put') => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (method === 'put' && !req.file) {
      next();
      return;
    }

    if (!req.file) {
      res.status(400).json({
        code: 'ValidationError',
        message: 'Blog banner is required',
      });
      return;
    }

    if (req.file.size > MAX_FILE_SIZE) {
      res.status(413).json({
        code: 'ValidationError',
        message: 'File size must be less than 2MB',
      });
      return;
    }

    try {
      const { blogId } = req.params;
      const blog = await Blog.findById(blogId).select('banner.publicId').exec();

      const data = await uploadToCloudinary(
        req.file.buffer,
        blog?.banner.publicId.replace('blog-api/', ''),
      );

      if (!data) {
        res.status(500).json({
          code: 'ServerError',
          message: 'Internal server error',
        });

        logger.error('Error while uploading blog banner to cloudinary', {
          blogId,
          publicId: blog?.banner.publicId,
        });
        return;
      }

      const newBanner = {
        publicId: data.public_id,
        url: data.secure_url,
        width: data.width,
        height: data.height,
      };

      logger.info('Blog banner uploaded to Cloudinary', {
        blogId,
        banner: newBanner,
      });

      req.body.banner = newBanner;
      next();
    } catch (err: unknown) {
      if (
        typeof err === 'object' &&
        err !== null &&
        'http_code' in err &&
        'message' in err
      ) {
        const error = err as UploadApiErrorResponse;
        res.status(error.http_code).json({
          code: error.http_code < 500 ? 'ValidationError' : error.name,
          message: error.message,
        });

        logger.error('Error  while uploading blog banner to Cloudinary', error);
      } else {
        res.status(500).json({
          code: 'ServerError',
          message: 'Internal server error',
        });

        logger.error(
          'Unknown error while uploading blog banner to Cloudinary',
          err,
        );
      }
    }
  };
};

export default uploadBlogBanner;
