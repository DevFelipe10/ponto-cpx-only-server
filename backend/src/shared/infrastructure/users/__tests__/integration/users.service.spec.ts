import { Test, TestingModule } from '@nestjs/testing'
import { UsersService } from '../../users.service'
import { MistertService } from 'src/face-recognition/infrastructure/mistert/mistert.service'
import { UserAuthDataBuilder } from 'src/shared/domain/testing/helpers/user-auth-data-builder'
import { UserAuth } from 'src/shared/domain/entities/auth/user.auth'

describe('UsersService integration tests', () => {
  let sut: UsersService
  let mistertService: MistertService

  const user = new UserAuth(UserAuthDataBuilder({}))
  const users = [user, new UserAuth(UserAuthDataBuilder({}))]

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: MistertService,
          useValue: { getUsersApi: jest.fn().mockResolvedValue(users) },
        },
      ],
    }).compile()

    sut = module.get<UsersService>(UsersService)
    mistertService = module.get<MistertService>(MistertService)
  })

  it('should be defined', () => {
    expect(sut).toBeDefined()
  })

  it('should be findOne User instance', async () => {
    const result = await sut.findOne(user.username, user.password)

    expect(result).not.toBe(undefined)
    expect(result).toBeInstanceOf(UserAuth)
  })

  it('should be findOne undefined', async () => {
    const result = await sut.findOne('username_invalid', 'password_invalid')

    expect(result).toBe(undefined)
  })
})
