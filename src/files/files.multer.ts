import { randomUUID } from 'node:crypto';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

import multer from 'multer';
import type { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

import {
  FILE_CONFIG,
  type FileCategory,
} from './files.config.js';

export function createUploadOptions(
  fields: Record<string, FileCategory>,
): MulterOptions {
  const maxFileSize = Math.max(
    ...Object.values(fields).map(
      (category) => FILE_CONFIG[category].maxSize,
    ),
  );

  return {
    storage: multer.diskStorage({
      destination: (_req, file, callback) => {
        const category = fields[file.fieldname];

        if (!category) {
          return callback(
            new Error('Unsupported file field'),
            '',
          );
        }

        const config = FILE_CONFIG[category];

        const destination = path.resolve(
          process.cwd(),
          'static',
          config.folder,
        );

        mkdir(destination, { recursive: true })
          .then(() => callback(null, destination))
          .catch((error: Error) => callback(error, ''));
      },

      filename: (_req, file, callback) => {
        const category = fields[file.fieldname];

        if (!category) {
          return callback(
            new Error('Unsupported file field'),
            '',
          );
        }

        const extension =
          FILE_CONFIG[category].mimeTypes[file.mimetype];

        callback(null, `${randomUUID()}${extension}`);
      },
    }),

    fileFilter: (_req, file, callback) => {
      const category = fields[file.fieldname];

      if (!category) {
        return callback(
          new Error('Unsupported file field'),
          false,
        );
      }

      const config = FILE_CONFIG[category];

      const isAllowed = Object.hasOwn(
        config.mimeTypes,
        file.mimetype,
      );

      if (!isAllowed) {
        return callback(
          new Error('Unsupported file type'),
          false,
        );
      }

      callback(null, true);
    },

    limits: {
      fileSize: maxFileSize,
      files: Object.keys(fields).length,
    },
  };
}