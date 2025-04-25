import { Test, TestingModule } from '@nestjs/testing'
import { AuthController, AuthenticatedRequest } from '../../auth.controller'
import { AuthService } from '../../auth.service'
import {
  SignAuthProps,
  SignInDto,
} from 'src/shared/domain/entities/auth/dto/sign.dto.auth'
import { FastifyReply } from 'fastify'
import { BadRequestException } from '@nestjs/common'
import { SigninDataBuilder } from 'src/shared/domain/testing/helpers/signin-data-builder'
import {
  TokenResponseDto,
  TokenResponseDtoProps,
} from 'src/shared/domain/entities/auth/dto/token-response.dto.auth'
import { TokenResponseDataBuilder } from 'src/shared/domain/testing/helpers/token-response-dto-data-builder'
import { LogoutResponseDto } from 'src/shared/domain/entities/auth/dto/logout-response.dto.auth'
import { UserTokenResponseDto } from 'src/shared/domain/entities/auth/dto/user-token-reponse.dto.auth'
import { UserTokenResponseDtoDataBuilder } from 'src/shared/domain/testing/helpers/user-token-response-dto-data-builder'

describe('AuthController integration tests', () => {
  let sut: AuthController
  let authService: AuthService
  let propsSignin: SignAuthProps
  let signinDto: SignInDto
  let res: FastifyReply
  let tokenResponseDtoProps: TokenResponseDtoProps
  let tokenResponseDto: TokenResponseDto

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [{ provide: AuthService, useValue: { signIn: jest.fn() } }],
      controllers: [AuthController],
    }).compile()

    sut = module.get<AuthController>(AuthController)
    authService = module.get<AuthService>(AuthService)
    propsSignin = SigninDataBuilder({})
    signinDto = new SignInDto(propsSignin.username, propsSignin.password)
    tokenResponseDtoProps = TokenResponseDataBuilder({})
    tokenResponseDto = new TokenResponseDto(tokenResponseDtoProps)
    res = {
      setCookie: jest.fn().mockReturnValue({
        send: jest.fn().mockReturnValue(tokenResponseDto),
      }),
    } as unknown as FastifyReply
  })

  it('should be defined', () => {
    expect(sut).toBeDefined()
  })

  describe('sigin', () => {
    it('should user not encountered in signIn', async () => {
      jest.spyOn(authService, 'signIn').mockResolvedValue(undefined)

      await expect(sut.signIn(signinDto, res)).rejects.toThrow(
        BadRequestException,
      )
      expect(authService.signIn).toHaveBeenCalledWith(
        signinDto.username,
        signinDto.password,
      )
    })

    it('should be user authenticated', async () => {
      res = {
        setCookie: jest.fn().mockReturnValue({
          send: jest.fn().mockReturnValue(<FastifyReply>{
            sent: true,
          }),
        }),
      } as unknown as FastifyReply

      jest.spyOn(authService, 'signIn').mockResolvedValue(tokenResponseDto)

      await sut.signIn(signinDto, res)

      expect(authService.signIn).toHaveBeenCalledWith(
        signinDto.username,
        signinDto.password,
      )
      expect(res.setCookie).toHaveBeenCalledWith(
        'token',
        tokenResponseDto.token,
        {
          httpOnly: true,
          secure: true,
          sameSite: 'none',
          path: '/',
          maxAge: 86400,
        },
      )
      expect(
        res.setCookie('token', tokenResponseDto.token, {
          httpOnly: true,
          secure: true,
          sameSite: 'none',
          path: '/',
          maxAge: 86400,
        }).send,
      ).toHaveBeenCalledWith(tokenResponseDto)
    })
  })

  describe('logout', () => {
    it('should be logout user', async () => {
      res = {
        clearCookie: jest.fn().mockReturnValue({
          send: jest.fn().mockReturnValue(<FastifyReply>{
            sent: true,
          }),
        }),
      } as unknown as FastifyReply

      sut.logout(res)

      expect(res.clearCookie).toHaveBeenCalledWith('token', {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        path: '/',
      })
      expect(
        res.clearCookie('token', {
          httpOnly: true,
          secure: true,
          sameSite: 'none',
          path: '/',
        }).send,
      ).toHaveBeenCalledWith(new LogoutResponseDto())
    })
  })

  describe('profile', () => {
    it('should be logout user', async () => {
      const userTokenReponseDtoProps = UserTokenResponseDtoDataBuilder({})
      const userTokenReponseDto = new UserTokenResponseDto(
        userTokenReponseDtoProps,
      )
      const req = <AuthenticatedRequest>{
        user: userTokenReponseDto,
      }

      const result = sut.getProfile(req)

      expect(result).toEqual(userTokenReponseDto)
    })
  })
})
