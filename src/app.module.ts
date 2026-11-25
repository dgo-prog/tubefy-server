import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { SequelizeModule } from '@nestjs/sequelize'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'node:path'

import { UsersModule } from './users/users.module.js'
import { User } from './users/users.model.js'

import { VideosModule } from './videos/videos.module.js'
import { Video } from './videos/videos.model.js'

import { FilesModule } from './files/files.module.js'
import { MusicModule } from './music/music.module.js'
import { Music } from './music/music.model.js'
import { PlaylistsModule } from './playlists/playlists.module.js';
import { Playlist } from './playlists/playlists.model.js'
import { VideoPlaylist } from './videos/video-playlists.model.js'
import { MusicPlaylist } from './music/music-playlists.model.js'
import { UserSubscription } from './users/user-subscription.model.js'
import { AuthModule } from './auth/auth.module.js';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: '.env.development'
		}),

		SequelizeModule.forRootAsync({
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				dialect: 'postgres',
				host: configService.get<string>('DB_HOST'),
				port: configService.get<number>('DB_PORT'),
				username: configService.get<string>('DB_USER'),
				password: configService.get<string>('DB_PASSWORD'),
				database: configService.get<string>('DB_NAME'),

				autoLoadModels: true,
				synchronize: false,
				models: [
          User, 
          Video, 
          Music, 
          Playlist, 
          VideoPlaylist,
          MusicPlaylist,
          UserSubscription
        ]
			})
		}),

		ServeStaticModule.forRoot({
			rootPath: join(process.cwd(), 'static'),
			serveRoot: '/static'
		}),

		UsersModule,
		VideosModule,
		FilesModule,
		MusicModule,
		PlaylistsModule,
		AuthModule
	]
})
export class AppModule {}
