import { Injectable } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { JwtService } from '@nestjs/jwt'
import { UserPayload } from 'src/shared/domain/entities/auth/user-payload.auth'
import { TokenResponseDto } from 'src/shared/domain/entities/auth/dto/token-response.dto.auth'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    password: string,
  ): Promise<TokenResponseDto | undefined> {
    const user = await this.usersService.findOne(username, password)

    if (user === undefined) {
      return undefined
    }

    const payload = <UserPayload>{
      sub: user.id,
      username: user.username,
      role: user.role,
    }

    const token = await this.jwtService.signAsync(payload)

    return new TokenResponseDto({ token: token })
  }
}
