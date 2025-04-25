import { Test, TestingModule } from '@nestjs/testing'
import { AuthGuard } from '../../auth.guard'
import { EnvConfigService } from 'src/shared/infrastructure/env-config/env-config.service'
import { JwtService } from '@nestjs/jwt'
import { Reflector } from '@nestjs/core'
import { ExecutionContext, UnauthorizedException } from '@nestjs/common'
import { PayloadGuardAuth } from 'src/shared/domain/entities/auth/payload-guard.auth'

describe('AuthGuard integration tests', () => {
  let sut: AuthGuard
  let jwtService: Partial<JwtService>
  let envConfigService: Partial<EnvConfigService>
  let reflector: Partial<Reflector>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthGuard,
        { provide: EnvConfigService, useValue: { getJwtSecret: jest.fn() } },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
            verifyAsync: jest.fn(),
          },
        },
        { provide: Reflector, useValue: { getAllAndOverride: jest.fn() } },
      ],
    }).compile()

    sut = module.get<AuthGuard>(AuthGuard)
    jwtService = module.get<JwtService>(JwtService)
    envConfigService = module.get<EnvConfigService>(EnvConfigService)
    reflector = module.get<Reflector>(Reflector)
  })

  it('should be defined', () => {
    expect(sut).toBeDefined()
  })

  it('should allow access when the request is public', async () => {
    const mockExecutionContext = {
      getHandler: jest.fn().mockReturnValue('publicFunction'),
      getClass: jest.fn().mockReturnValue('public'),
    } as unknown as ExecutionContext

    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(true)

    const result = await sut.canActivate(mockExecutionContext)

    expect(result).toBe(true)
  })

  it('should return Unauthorized Exception', async () => {
    const mockExecutionContext = {
      getHandler: jest.fn().mockReturnValue('functionName'),
      getClass: jest.fn().mockReturnValue('className'),
      switchToHttp: jest.fn().mockReturnValue({
        getRequest: jest.fn().mockReturnValue({
          cookies: {}, // Sem token JWT
        }),
      }),
    } as unknown as ExecutionContext

    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(false)

    await expect(sut.canActivate(mockExecutionContext)).rejects.toThrow(
      UnauthorizedException,
    )
  })

  it('should return Unauthorized Exception because the token is expired', async () => {
    const mockExecutionContext = {
      getHandler: jest.fn().mockReturnValue('functionName'),
      getClass: jest.fn().mockReturnValue('className'),
      switchToHttp: jest.fn().mockReturnValue({
        getRequest: jest.fn().mockReturnValue({
          cookies: {
            token: 'expired_token',
          },
        }),
      }),
    } as unknown as ExecutionContext

    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(false)
    jest.spyOn(envConfigService, 'getJwtSecret').mockReturnValue('secret')
    jest.spyOn(jwtService, 'verifyAsync').mockRejectedValue({
      message: 'jwt expired',
      error: 'Unauthorized',
      statusCode: 401,
    })

    await expect(sut.canActivate(mockExecutionContext)).rejects.toThrow(
      UnauthorizedException,
    )
    expect(reflector.getAllAndOverride).toHaveBeenCalled()
    expect(envConfigService.getJwtSecret).toHaveBeenCalled()
    expect(jwtService.verifyAsync).toHaveBeenCalledWith(
      mockExecutionContext.switchToHttp().getRequest().cookies.token,
      {
        secret: envConfigService.getJwtSecret(),
      },
    )
  })

  it('should be token authorized', async () => {
    const mockExecutionContext = {
      getHandler: jest.fn().mockReturnValue('functionName'),
      getClass: jest.fn().mockReturnValue('className'),
      switchToHttp: jest.fn().mockReturnValue({
        getRequest: jest.fn().mockReturnValue({
          cookies: {
            token: 'valid_token',
          },
        }),
      }),
    } as unknown as ExecutionContext

    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(false)
    jest.spyOn(envConfigService, 'getJwtSecret').mockReturnValue('secret')
    jest.spyOn(jwtService, 'verifyAsync').mockResolvedValue(<PayloadGuardAuth>{
      sub: 1,
      username: 'admin',
      role: 'ADMIN',
      iat: 1741353067,
      exp: 1741356667,
    })

    const result = await sut.canActivate(mockExecutionContext)

    expect(result).toBe(true)
    expect(reflector.getAllAndOverride).toHaveBeenCalled()
    expect(envConfigService.getJwtSecret).toHaveBeenCalled()
    expect(jwtService.verifyAsync).toHaveBeenCalledWith(
      mockExecutionContext.switchToHttp().getRequest().cookies.token,
      {
        secret: envConfigService.getJwtSecret(),
      },
    )
  })
})
