
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';

import { FileFieldsInterceptor } from '@nestjs/platform-express';

import { VideoCreationDto } from './dto/video-creation.dto.js';
import { VideosService } from './videos.service.js';

import { createUploadOptions } from '../files/files.multer.js';

import type { Express, Response } from 'express';

@Controller('videos')
export class VideosController {
  constructor(
    private readonly videosService: VideosService,
  ) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'video', maxCount: 1 },
        { name: 'image', maxCount: 1 },
      ],
      createUploadOptions({
        video: 'video',
        image: 'image',
      }),
    ),
  )
  createVideo(
    @Body() dto: VideoCreationDto,
    @UploadedFiles()
    files: {
      video?: Express.Multer.File[];
      image?: Express.Multer.File[];
    },
  ) {
    return this.videosService.createVideo(dto, files);
  }

  @Get() 
  getAllVideos() {
    return this.videosService.getAllVideos()
  }

  @Get(':id/stream')
  async streamVideo(
    @Param('id') id: string,
    @Res() response: Response,
  ) {
    const filePath = await this.videosService.getVideoPath(id);

    response.sendFile(filePath);
  }
}
