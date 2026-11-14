import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';

import {
  unlink,
} from 'node:fs/promises';

import type { Express } from 'express';

@Injectable()
export class FilesService {
  uploadFile(file?: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException(
        'File was not uploaded',
      );
    }

    return {
      filename: file.filename,
      originalName: file.originalname,
      mimeType: file.mimetype,
      size: file.size,
      path: file.path,
    };
  }

  async removeFile(filePath?: string) {
    if (!filePath) {
      return;
    }

    await unlink(filePath).catch((error: NodeJS.ErrnoException) => {
      if (error.code !== 'ENOENT') {
        throw error;
      }
    });
  }
}