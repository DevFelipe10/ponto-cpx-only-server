import { Injectable } from '@nestjs/common'
import { MistertService } from 'src/face-recognition/infrastructure/mistert/mistert.service'
import { UserAuth } from 'src/shared/domain/entities/auth/user.auth'

@Injectable()
export class UsersService {
  constructor(private readonly mistertService: MistertService) {}

  async findOne(
    username: string,
    password: string,
  ): Promise<UserAuth | undefined> {
    // Buscar JSON de usuários no MisterT
    const users = await this.mistertService.getUsersApi()

    return users.find(
      user => user.username === username && user.password === password,
    )
  }
}
