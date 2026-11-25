import { Body, Controller, Post } from '@nestjs/common'

import { UserCreationDto } from '../users/dto/user-creation.dto.js'
import { AuthService } from './auth.service.js'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('register')
	registration(@Body() dto: UserCreationDto) {
		return this.authService.registration(dto)
	}

	@Post('login')
	login(@Body() dto: UserCreationDto) {
		return this.authService.login(dto)
	}
}
