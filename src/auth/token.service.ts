import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { User } from '../users/users.model.js'
import { InjectModel } from '@nestjs/sequelize'
import { RefreshToken } from './refresh-token.model.js'
import { createHash, randomBytes } from 'crypto'

@Injectable()
export class TokenService {
	constructor(
    @InjectModel(RefreshToken) private readonly tokenRepository: typeof RefreshToken,

    private jwtService: JwtService
  ) {}

	async generateTokens(user: User) {
		const payload = {
			email: user.email,
			id: user.id
		}

		const [accessToken, refreshToken] = await Promise.all([
			this.accessToken(payload),
			this.refreshToken()
		])

    await this.saveToken(user.id, refreshToken)

		return {
			accessToken,
			refreshToken
		}
	}

	private async accessToken(payload: object) {
		return this.jwtService.signAsync(payload, {
			secret: process.env.JWT_ACCESS_SECRET,
			expiresIn: '15m'
		})
	}

	private refreshToken() {
		return randomBytes(64).toString('hex')
	}

  private async saveToken(userId: string, refreshToken: string) {
    const tokenHash = createHash('sha256')
      .update(refreshToken)
      .digest('hex')

    const expiresAt = new Date(
      Date.now() + 7 * 24 * 60 * 60 * 1000
    )

    await this.tokenRepository.destroy({where: {userId}})

    return this.tokenRepository.create({
      userId,
      tokenHash,
      expiresAt
    })
  }
}
