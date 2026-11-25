import { Body, Controller, Get, Param, Post } from '@nestjs/common'

import { PlaylistCreationDto } from './dto/playlist-creation.dto.js'
import { PlaylistsService } from './playlists.service.js'

@Controller('playlists')
export class PlaylistsController {
	constructor(private readonly playlistsService: PlaylistsService) {}

	@Post()
	createPlaylist(@Body() dto: PlaylistCreationDto) {
		return this.playlistsService.createPlaylist(dto)
	}

	@Get()
	getAllPlaylists() {
		return this.playlistsService.getAllPlaylists()
	}

	@Get(':id')
	getPlaylistById(@Param('id') id: string) {
		return this.playlistsService.getPlaylistById(id)
	}
}
