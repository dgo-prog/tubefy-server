import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';

import { FilesService } from './files.service.js';
import { createUploadOptions } from './files.multer.js';

@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
  ) {}

  @Post('videos')
  @UseInterceptors(
    FileInterceptor(
      'file',
      createUploadOptions({
        file: 'video',
      }),
    ),
  )
  uploadVideo(
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.filesService.uploadFile(file);
  }

  @Post('audio')
  @UseInterceptors(
    FileInterceptor(
      'file',
      createUploadOptions({
        file: 'audio',
      }),
    ),
  )
  uploadAudio(
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.filesService.uploadFile(file);
  }

  @Post('images')
  @UseInterceptors(
    FileInterceptor(
      'file',
      createUploadOptions({
        file: 'image',
      }),
    ),
  )
  uploadImage(
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.filesService.uploadFile(file);
  }
}