import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { PlaylistCreationDto } from './dto/playlist-creation.dto.js'
import { Playlist } from './playlists.model.js'

@Injectable()
export class PlaylistsService {
	constructor(
		@InjectModel(Playlist) private readonly playlistRepository: typeof Playlist
	) {}

	async createPlaylist(dto: PlaylistCreationDto) {
		const playlist = await this.playlistRepository.create(dto)
		return playlist
	}

	async getAllPlaylists() {
		return this.playlistRepository.findAll()
	}

	async getPlaylistById(id: string) {
		const playlist = await this.playlistRepository.findByPk(id)

		if (!playlist) {
			throw new Error(`Playlist with id ${id} not found`)
		}

		return playlist
	}
}
