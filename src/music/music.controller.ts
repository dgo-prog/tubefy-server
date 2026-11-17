import { Body, Controller, Get, Param, Post, Res, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { MusicService } from './music.service.js'
import { MusicCreationDto } from './dto/creation-music.dto.js'
import { FileFieldsInterceptor } from '@nestjs/platform-express'
import { createUploadOptions } from '../files/files.multer.js'
import type { Response } from 'express'

@Controller('music')
export class MusicController {
  constructor(
    private readonly musicService: MusicService
  ) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'audio', maxCount: 1 },
        { name: 'image', maxCount: 1 },
      ],
      createUploadOptions({
        audio: 'audio',
        image: 'image'
      })
    )
  )
  createMusic(
    @Body() dto: MusicCreationDto,
    @UploadedFiles()
    files: {
      audio?: Express.Multer.File[]
      image?: Express.Multer.File[]
    }
  ) {
    return this.musicService.createMusic(dto, files)
  }

  @Get()
  getAllMusic() {
    return this.musicService.getAllMusic()
  }

  @Get('/:id/stream')
  async getMusicById(
    @Param('id') id: string,
    @Res() response: Response
  ) {
    const filePath = await this.musicService.getAudioById(id)

    response.sendFile(filePath)
  }
}
