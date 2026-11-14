
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/sequelize';

import { Video } from './videos.model.js';
import { VideoCreationDto } from './dto/video-creation.dto.js';

import { FilesService } from '../files/files.service.js';

import type { Express } from 'express';

@Injectable()
export class VideosService {
  constructor(
    @InjectModel(Video)
    private readonly videoRepository: typeof Video,

    private readonly filesService: FilesService,
  ) {}

  async createVideo(
    dto: VideoCreationDto,
    files: {
      video?: Express.Multer.File[];
      image?: Express.Multer.File[];
    },
  ) {
    const videoFile = files.video?.[0];
    const imageFile = files.image?.[0];

    if (!videoFile) {
      await this.filesService.removeFile(imageFile?.path);

      throw new BadRequestException('Video file is required');
    }

    try {
      const video = await this.videoRepository.create({
        name: dto.name,
        description: dto.description,
        video: videoFile.path,
        preview: imageFile?.path ?? null,
      });

      return video;
    } catch (error) {
      await Promise.all([
        this.filesService.removeFile(videoFile.path),
        this.filesService.removeFile(imageFile?.path),
      ]);

      throw error;
    }
  }

  async getAllVideos() {
    const videos = await Video.findAll()
    return videos
  }

  async getVideoPath(id: string): Promise<string> {
    const video = await this.videoRepository.findByPk(id);

    if (!video) {
      throw new NotFoundException('Video not found');
    }

    return video.video;
  }
}
