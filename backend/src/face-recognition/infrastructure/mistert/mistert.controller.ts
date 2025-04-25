import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common'
import { MistertService } from './mistert.service'
import { FastifyReply } from 'fastify'
import { ResponseApi } from 'src/shared/domain/entities/response-api'
import { ResultGetConfig } from './interfaces'
import { Roles } from 'src/shared/domain/entities/roles/roles.decorator'
import { Role } from 'src/shared/domain/entities/roles/role.enum'
import {
  ApiBadRequestResponse,
  ApiExtraModels,
  ApiOkResponse,
  getSchemaPath,
} from '@nestjs/swagger'
import { MarcacaoMisterT } from 'src/face-recognition/domain/entities/mistert/marcacao.mistert'
import { ResultPointRegisterMisterT } from 'src/face-recognition/domain/entities/mistert/result-point-register.mistert'
import { GeofenceService } from 'src/shared/infrastructure/geofence/geofence.service'
import { MarcacaoMistertDto } from 'src/face-recognition/domain/entities/mistert/marcacao.mistert.dto'

@Controller('mistert')
export class MistertController {
  constructor(
    private readonly mistertService: MistertService,
    private readonly geofenceService: GeofenceService,
  ) {}

  @ApiExtraModels(ResponseApi, ResultGetConfig)
  @ApiOkResponse({
    description: 'Retorna as configurações do MisterT',
    schema: {
      allOf: [
        { $ref: getSchemaPath(ResponseApi) }, // Define o esquema base
        {
          properties: {
            data: { $ref: getSchemaPath(ResultGetConfig) }, // Define o tipo correto de `data`
          },
        },
      ],
    },
  })
  @ApiBadRequestResponse({
    description: 'Parâmetros inválidos',
    type: ResponseApi,
  })
  @Get('config')
  @Roles(Role.REGISTRO_PONTO)
  async getconfig(@Res() res: FastifyReply) {
    try {
      const result = await this.mistertService.getConfig()

      if (result.Success === false) {
        throw result.ErrorMsg
      }

      return res.status(HttpStatus.OK).send(<ResponseApi>{
        status: HttpStatus.OK,
        message: 'MisterT setup fetched successfully',
        data: result,
      })
    } catch (e) {
      res.status(HttpStatus.BAD_REQUEST).send(<ResponseApi>{
        status: HttpStatus.BAD_REQUEST,
        message: 'Error getting MisterT setup',
        error: e.toString(),
      })
    }
  }

  @ApiExtraModels(ResponseApi, ResultPointRegisterMisterT)
  @ApiOkResponse({
    description: 'Retorna o resultado do registro do ponto',
    schema: {
      allOf: [
        { $ref: getSchemaPath(ResponseApi) },
        {
          properties: {
            data: { $ref: getSchemaPath(ResultPointRegisterMisterT) },
          },
        },
      ],
    },
  })
  @Post('pointregister')
  @Roles(Role.REGISTRO_PONTO)
  async pointRegisterMisterT(
    @Body() marcacaoDto: MarcacaoMistertDto,
    @Res() res: FastifyReply,
  ) {
    try {
      // converter o DTO para a classe
      const marcacao = MarcacaoMisterT.fromDto(marcacaoDto)

      // // verificar a localização do usuário
      // const { LATITUDE, LONGITUDE } = marcacao

      // const isInsideGeofence = await this.geofenceService.isInsideCircle(
      //   LATITUDE,
      //   LONGITUDE,
      // )

      // marcacao.setIsInsideGeofence(isInsideGeofence)

      // if (!isInsideGeofence) {
      //   return 'A sua localização não está dentro da área definida para realizar o registro de ponto. Tente novamente!'
      // }

      // envio do JSON para registrar o ponto
      const result = await this.mistertService.pointRegisterMisterT(marcacao)

      if (result.Success === false) {
        throw result.ErrorMsg
      }

      return res.status(HttpStatus.OK).send(<ResponseApi>{
        status: HttpStatus.OK,
        message: 'MisterT point registered successfully',
        data: result,
      })
    } catch (e) {
      const error = e as Error
      console.error(error)
      res.status(HttpStatus.BAD_REQUEST).send(<ResponseApi>{
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
        error: 'Error registering point',
      })
    }
  }
}
