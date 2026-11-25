import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { SequelizeModule } from '@nestjs/sequelize'

import { User } from '../users/users.model.js'
import { UsersModule } from '../users/users.module.js'
import { AuthController } from './auth.controller.js'
import { AuthService } from './auth.service.js'
import { RefreshToken } from './refresh-token.model.js'
import { TokenService } from './token.service.js'

@Module({
	imports: [
		SequelizeModule.forFeature([User, RefreshToken]),
		JwtModule.register({
			global: true,
			secret: process.env.JWT_ACCESS_SECRET || 'default-secret',
			signOptions: { expiresIn: '15m' }
		}),
		UsersModule
	],
	controllers: [AuthController],
	providers: [AuthService, TokenService],
	exports: [TokenService, AuthService]
})
export class AuthModule {}
