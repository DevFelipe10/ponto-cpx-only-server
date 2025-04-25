import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Request,
  Res,
  UseInterceptors,
} from '@nestjs/common'
import { Public } from './auth.guard'
import { AuthService } from './auth.service'
import { FastifyReply, FastifyRequest } from 'fastify'
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger'
import { Role } from 'src/shared/domain/entities/roles/role.enum'
import { Roles } from 'src/shared/domain/entities/roles/roles.decorator'
import { UserTokenResponseDto } from 'src/shared/domain/entities/auth/dto/user-token-reponse.dto.auth'
import { SignInDto } from 'src/shared/domain/entities/auth/dto/sign.dto.auth'
import { TokenResponseDto } from 'src/shared/domain/entities/auth/dto/token-response.dto.auth'
import { LogoutResponseDto } from 'src/shared/domain/entities/auth/dto/logout-response.dto.auth'

@Controller('auth')
// @UseInterceptors(CacheInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiNotFoundResponse({
    description: 'User not found',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        error: { type: 'string' },
        statusCode: { type: 'integer' },
      },
      example: {
        message: 'Usuário não encontrado',
        error: 'Not Found',
        statusCode: 404,
      },
    },
  })
  @ApiCreatedResponse({
    description: 'Token created successfully',
    type: TokenResponseDto,
  })
  @Public()
  @Post('login')
  async signIn(@Body() signInDto: SignInDto, @Res() res: FastifyReply) {
    const { username, password } = signInDto

    const tokenReponseDto = await this.authService.signIn(username, password)

    if (tokenReponseDto === undefined) {
      throw new BadRequestException('Usuário não encontrado')
    }

    return res
      .setCookie('token', tokenReponseDto.token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        path: '/',
        // expires: new Date(new Date().getTime() + 84600),
        maxAge: 86400,
      })
      .send(tokenReponseDto)
  }

  @ApiOkResponse({
    description: 'Logged out successfully',
    type: LogoutResponseDto,
  })
  @Roles(Role.REGISTRO_PONTO)
  @Get('logout')
  logout(@Res() res: FastifyReply) {
    return res
      .clearCookie('token', {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        path: '/',
      })
      .send(new LogoutResponseDto())
  }

  @ApiOkResponse({
    description: 'User profile retrieved successfully',
    type: UserTokenResponseDto,
  })
  @Get('profile')
  getProfile(@Request() req: AuthenticatedRequest) {
    return req.user
  }
}

export interface AuthenticatedRequest extends FastifyRequest {
  user: UserTokenResponseDto
}
