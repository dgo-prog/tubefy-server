import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './users.model.js'
import { InjectModel } from '@nestjs/sequelize'
import { UserCreationDto } from './dto/user-creation.dto.js'

@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User) private userRepository: typeof User
  ) {}

  async getAllUsers() {
    const users = await this.userRepository.findAll()
    return users
  }

  async createUser(dto: UserCreationDto): Promise<User> {
    const user = await this.userRepository.create(dto)
    return user
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.userRepository.findByPk(id)

    if (!user) {
      throw new HttpException(`User with id ${id} not found`, HttpStatus.NOT_FOUND)
    }
    
    return user
  }
}
