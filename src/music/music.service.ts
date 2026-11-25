import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { FilesService } from '../files/files.service.js'
import { MusicCreationDto } from './dto/creation-music.dto.js'
import { Music } from './music.model.js'

@Injectable()
export class MusicService {
	constructor(
		@InjectModel(Music) private readonly musicRepository: typeof Music,
		private readonly filesService: FilesService
	) {}

	async createMusic(
		dto: MusicCreationDto,
		files: {
			audio?: Express.Multer.File[]
			image?: Express.Multer.File[]
		}
	) {
		const audioFile = files.audio?.[0]
		const imageFile = files.image?.[0]

		if (!audioFile) {
			await this.filesService.removeFile(imageFile?.path)

			throw new HttpException('Audio file is required', HttpStatus.BAD_REQUEST)
		}

		try {
			const audio = await this.musicRepository.create({
				name: dto.name,
				description: dto.description,
				audio: audioFile.path,
				albumImage: imageFile?.path ?? null,
				album: dto.album
			})

			return audio
		} catch (error) {
			await Promise.all([
				this.filesService.removeFile(audioFile.path),
				this.filesService.removeFile(imageFile?.path)
			])

			throw error
		}
	}

	async getAllMusic() {
		const audio = await this.musicRepository.findAll()
		return audio
	}

	async getAudioById(id: string): Promise<string> {
		const audio = await this.musicRepository.findByPk(id)

		if (!audio) {
			throw new HttpException('Audio not found', HttpStatus.NOT_FOUND)
		}

		return audio.audio
	}
}
/* 
  просто какой то текст, якобы я что то печатаю
  первый раз кстати оставляю такой вид коммнетариев. 
*/