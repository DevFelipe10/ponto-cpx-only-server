import { Test, TestingModule } from '@nestjs/testing'
import { RolesGuard } from '../../roles.guard'
import { ExecutionContext, ForbiddenException } from '@nestjs/common'
import { UserTokenResponseDto } from 'src/shared/domain/entities/auth/dto/user-token-reponse.dto.auth'
import { UserTokenResponseDtoDataBuilder } from 'src/shared/domain/testing/helpers/user-token-response-dto-data-builder'
import { Reflector } from '@nestjs/core'
import { RoleEnumDataBuilder } from 'src/shared/domain/testing/helpers/role-enum-data-builder'
import { HttpArgumentsHost, Type } from '@nestjs/common/interfaces'
import { Role } from 'src/shared/domain/entities/roles/role.enum'

describe('RolesGuard integration tests', () => {
  let sut: RolesGuard
  let reflector: Reflector
  let mockExecutionContext: ExecutionContext

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RolesGuard,
        { provide: Reflector, useValue: { getAllAndOverride: jest.fn() } },
      ],
    }).compile()

    sut = module.get<RolesGuard>(RolesGuard)
    reflector = module.get<Reflector>(Reflector)
    mockExecutionContext = {
      getHandler: jest.fn().mockReturnValue('functionName'),
      getClass: jest.fn().mockReturnValue('className'),
      switchToHttp: jest.fn().mockReturnValue({
        getRequest: jest.fn().mockReturnValue({
          cookies: {},
          user: new UserTokenResponseDto(
            UserTokenResponseDtoDataBuilder({
              role: Role.REGISTRO_PONTO,
            }),
          ),
        }),
      }),
    } as unknown as ExecutionContext
  })

  it('should be defined', () => {
    expect(sut).toBeDefined()
  })

  it('should to permit free access for AuthController and signIn function', () => {
    jest
      .spyOn(mockExecutionContext, 'getClass')
      .mockReturnValue({ name: 'AuthController' } as Type)
    jest
      .spyOn(mockExecutionContext, 'getHandler')
      .mockReturnValue({ name: 'signIn' } as Type)

    const result = sut.canActivate(mockExecutionContext)

    expect(result).toBe(true)
  })

  it('should not exist User authenticated', async () => {
    jest
      .spyOn(reflector, 'getAllAndOverride')
      .mockReturnValue(RoleEnumDataBuilder())
    jest
      .spyOn(mockExecutionContext, 'switchToHttp')
      .mockImplementationOnce(() => {
        return {
          getRequest() {
            return { user: null }
          },
        } as HttpArgumentsHost
      })

    expect(() => sut.canActivate(mockExecutionContext)).toThrow(
      ForbiddenException,
    )
  })

  it('should to permit access for Admin group', async () => {
    const user = new UserTokenResponseDto(
      UserTokenResponseDtoDataBuilder({
        role: Role.ADMIN,
      }),
    )

    jest
      .spyOn(mockExecutionContext, 'switchToHttp')
      .mockImplementationOnce(() => {
        return {
          getRequest() {
            return { user: user }
          },
        } as HttpArgumentsHost
      })

    const result = sut.canActivate(mockExecutionContext)

    expect(
      mockExecutionContext.switchToHttp().getRequest().user,
    ).toBeInstanceOf(UserTokenResponseDto)
    expect(result).toBe(true)
  })

  it('should be not to exist defined Role ', async () => {
    expect(() => sut.canActivate(mockExecutionContext)).toThrow(
      new ForbiddenException('Acesso negado: permissão não definida'),
    )
  })

  it('should be role function is equal the role User ', async () => {
    const role = Role.REGISTRO_PONTO
    const user = mockExecutionContext.switchToHttp().getRequest()
      .user as UserTokenResponseDto

    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue([role])

    const result = sut.canActivate(mockExecutionContext)

    expect(user.role).toEqual(role)
    expect(result).toBe(true)
  })

  it('should be return forbidden access ', async () => {
    // Nesse caso o usuário com autenticação estaria acessando uma rota apenas apra ADMIN

    const role = Role.ADMIN
    const user = mockExecutionContext.switchToHttp().getRequest()
      .user as UserTokenResponseDto

    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue([role])

    expect(user.role).not.toEqual(role)
    expect(() => sut.canActivate(mockExecutionContext)).toThrow(
      new ForbiddenException('Acesso negado'),
    )
  })
})
