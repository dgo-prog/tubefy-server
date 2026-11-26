import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { User } from '../users/users.model.js'

import bcrypt from 'bcrypt'
import { UserCreationDto } from '../users/dto/user-creation.dto.js'
import { UsersService } from '../users/users.service.js'
import { TokenService } from './token.service.js'
import { LoginDto } from '../users/dto/user-login.dto.js'

@Injectable()
export class AuthService {
	constructor(
		@InjectModel(User) private readonly userRepository: typeof User,

		private readonly usersService: UsersService,

		private readonly tokenService: TokenService
	) {}

	async registration(dto: UserCreationDto) {
		const candidate = await this.userRepository.findOne({
			where: { email: dto.email }
		})

		if (candidate) {
			throw new HttpException(
				'Пользователь с таким email уже зарегистрирован.',
				HttpStatus.BAD_REQUEST
			)
		}

		const usernameCandidate = await this.userRepository.findOne({
			where: { username: dto.username }
		})

		if (usernameCandidate) {
			throw new HttpException(
				'Такой username уже занят. Попробуйте другой.',
				HttpStatus.BAD_REQUEST
			)
		}

		const salt = await bcrypt.genSalt(10)
		const hashPassword = await bcrypt.hash(dto.password, salt)
		const user = await this.usersService.createUser({
			...dto,
			password: hashPassword
		})

		return this.tokenService.generateTokens(user)
	}

	async login(dto: LoginDto) {
		const user = await this.userRepository.findOne({
			where: { email: dto.email }
		})

		if (!user) {
			throw new HttpException(
				'Пользователя с таким email не существует.',
				HttpStatus.NOT_FOUND
			)
		}

		const confirmPasswords = await bcrypt.compare(dto.password, user.password)

		if (!confirmPasswords) {
			throw new HttpException(
				'Пароли не совпадают.',
				HttpStatus.BAD_REQUEST
			)
		}

		return this.tokenService.generateTokens(user)
	}
}
