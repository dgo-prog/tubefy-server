import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'

import { InjectModel } from '@nestjs/sequelize'

import { Video } from './videos.model.js'
import { VideoCreationDto } from './dto/video-creation.dto.js'

import { FilesService } from '../files/files.service.js'
import { User } from '../users/users.model.js'

import type { Express } from 'express'

@Injectable()
export class VideosService {
  constructor(
    @InjectModel(Video)
    private readonly videoRepository: typeof Video,

    @InjectModel(User)
    private readonly userRepository: typeof User,

    private readonly filesService: FilesService,
  ) {}

  async createVideo(
    dto: VideoCreationDto,
    files: {
      video?: Express.Multer.File[]
      image?: Express.Multer.File[]
    },
    userId: string,
  ) {
    const videoFile = files.video?.[0]
    const imageFile = files.image?.[0]

    const user = await this.userRepository.findByPk(userId)

    if (!user) {
      await Promise.all([
        this.filesService.removeFile(videoFile?.path),
        this.filesService.removeFile(imageFile?.path),
      ])

      throw new NotFoundException(
        'Пользователя с таким id не существует.',
      )
    }

    if (!videoFile) {
      await this.filesService.removeFile(imageFile?.path)

      throw new BadRequestException('Добавьте видео файл!')
    }

    try {
      const video = await this.videoRepository.create({
        name: dto.name,
        description: dto.description,
        video: videoFile.path,
        preview: imageFile?.path ?? null,
        userId: user.id,
      })

      return video
    } catch (error) {
      await Promise.all([
        this.filesService.removeFile(videoFile.path),
        this.filesService.removeFile(imageFile?.path),
      ])

      throw error
    }
  }

  async getAllVideos() {
    return this.videoRepository.findAll()
  }

  async getVideoPath(id: string): Promise<string> {
    const video = await this.videoRepository.findByPk(id)

    if (!video) {
      throw new NotFoundException(
        'Такого видео не существует или оно было удалено!',
      )
    }

    return video.video
  }
}