import { Test, TestingModule } from '@nestjs/testing'
import { AuthService } from '../../auth.service'
import { AuthModule } from '../../auth.module'
import { UsersService } from 'src/shared/infrastructure/users/users.service'
import { JwtService } from '@nestjs/jwt'
import { MistertService } from 'src/face-recognition/infrastructure/mistert/mistert.service'
import {
  TokenResponseDto,
  TokenResponseDtoProps,
} from 'src/shared/domain/entities/auth/dto/token-response.dto.auth'
import { UserAuth } from 'src/shared/domain/entities/auth/user.auth'
import { UserPayload } from 'src/shared/domain/entities/auth/user-payload.auth'
import { TokenResponseDataBuilder } from 'src/shared/domain/testing/helpers/token-response-dto-data-builder'
import { UserAuthDataBuilder } from 'src/shared/domain/testing/helpers/user-auth-data-builder'

describe('AuthService integration tests', () => {
  let sut: AuthService
  let usersService: Partial<UsersService>
  let jwtService: Partial<JwtService>
  let mistertService: Partial<MistertService>
  let tokenResponseDtoProps: TokenResponseDtoProps
  let tokenResponseDto: TokenResponseDto

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: MistertService, useValue: { getUsersApi: jest.fn() } },
        { provide: UsersService, useValue: { findOne: jest.fn() } },
        { provide: JwtService, useValue: { signAsync: jest.fn() } },
      ],
      imports: [AuthModule],
    }).compile()

    sut = module.get<AuthService>(AuthService)
    usersService = module.get<UsersService>(UsersService)
    jwtService = module.get<JwtService>(JwtService)
    mistertService = module.get<MistertService>(MistertService)
    tokenResponseDtoProps = TokenResponseDataBuilder({})
    tokenResponseDto = new TokenResponseDto(tokenResponseDtoProps)
  })

  it('should be defined', () => {
    expect(sut).toBeDefined()
  })

  describe('SignIn', () => {
    it('should return undefined if user is not found', async () => {
      const username = 'admin'
      const password = 'wrong-password'

      jest.spyOn(usersService, 'findOne').mockResolvedValue(undefined)

      const result = await sut.signIn(username, password)

      expect(result).toBeUndefined()
      expect(usersService.findOne).toHaveBeenCalledWith(username, password)
    })

    it('should return a JWT token if user is found', async () => {
      const user = new UserAuth(UserAuthDataBuilder({}))

      const userPayload = <UserPayload>{
        sub: user.id,
        username: user.username,
        role: user.role,
      }

      jest.spyOn(usersService, 'findOne').mockResolvedValue(user)
      jest
        .spyOn(jwtService, 'signAsync')
        .mockResolvedValue(tokenResponseDto.token)

      const result = await sut.signIn(user.username, user.password)

      expect(result).toBeInstanceOf(TokenResponseDto)
      expect(result.token).toBe(tokenResponseDto.token)
      expect(usersService.findOne).toHaveBeenCalledWith(
        user.username,
        user.password,
      )
      expect(jwtService.signAsync).toHaveBeenCalledWith(userPayload)
    })
  })
})
