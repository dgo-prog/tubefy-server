
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { FileFieldsInterceptor } from '@nestjs/platform-express';

import { VideoCreationDto } from './dto/video-creation.dto.js';
import { VideosService } from './videos.service.js';

import { createUploadOptions } from '../files/files.multer.js';

import type { Express, Response } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth/jwt-auth.guard.js'
import { CurrentUser } from '../auth/decorators/current-user/current-user.decorator.js'

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

  @UseGuards(JwtAuthGuard)
  createVideo(
    @Body() dto: VideoCreationDto,
    @UploadedFiles()
    files: {
      video?: Express.Multer.File[];
      image?: Express.Multer.File[];
    },
    @CurrentUser('id') userId: string
  ) {
    return this.videosService.createVideo(dto, files, userId);
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
