import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Res,
} from '@nestjs/common'
import { OpencvPersonService } from './opencv.person.service'
import { OpencvSearchService } from './opencv.search.service'
import { FastifyReply } from 'fastify'
import { ResponseApi } from 'src/shared/domain/entities/response-api'
import { Roles } from 'src/shared/domain/entities/roles/roles.decorator'
import { Role } from 'src/shared/domain/entities/roles/role.enum'
import { PageQuery } from 'src/shared/domain/entities/pagination/page-query'

@Controller('opencv')
export class OpencvController {
  constructor(
    private readonly opencvPersonService: OpencvPersonService,
    private readonly opencvSearchService: OpencvSearchService,
  ) {}

  @Post('faceregister')
  async faceRegister(
    @Body('image_base64') imageBase64: string,
    @Body('userid') id: string,
    @Res() res: FastifyReply,
  ) {
    try {
      // Detectar face na imagem
      const detectResult = await this.opencvSearchService.detect(imageBase64)

      if (detectResult.length <= 0) {
        throw 'Face not found in image'
      }

      // Verificar se existe uma pessoa
      // const personResult = await this.opencvPersonService.getPersonById(id)

      // console.log(personResult)

      // Criar a pessoa com a imagem
      await this.opencvPersonService.createPerson(imageBase64, id)

      return res.status(HttpStatus.CREATED).send(<ResponseApi>{
        status: HttpStatus.CREATED,
        message: 'Face registered successfully',
      })
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).send(<ResponseApi>{
        status: HttpStatus.BAD_REQUEST,
        error: error,
        message: 'Error registering face',
      })
    }
  }

  @Post('faceauthenticate')
  @Roles(Role.REGISTRO_PONTO)
  async faceAuthenticate(
    @Res() res: FastifyReply,
    @Body('imageBase64') imageBase64: string,
    @Body('userId') userId?: string | null,
  ) {
    try {
      const detectResult = await this.opencvSearchService.detect(imageBase64)

      if (detectResult.length <= 0) {
        throw 'Face not detected'
      }

      if (detectResult.length > 1) {
        throw 'Multiple faces detected'
      }

      const searchResult =
        await this.opencvSearchService.searchFace(imageBase64)

      if (searchResult.length <= 0) {
        throw 'No equal face encountered'
      }

      // // Verifica o nível de "confiança" da imagem buscada
      // if (searchResult[0].score < 0.8) {
      //   throw 'The face was not confidence'
      // }

      // Caso userId seja passado no body faz a verificação com id da imagem
      if (userId != undefined && userId != '') {
        const isUseridEqual = userId === searchResult[0].name

        if (isUseridEqual === false) {
          throw `Userid not match Request: ${userId} - API: ${searchResult[0].name}`
        }
      }

      const result = <ResponseApi>{
        message: 'Face authenticated successfully',
        data: {
          confidence: searchResult[0].score,
          userid: searchResult[0].name,
        },
        status: HttpStatus.OK,
      }

      console.log(result)

      return res.status(HttpStatus.OK).send(result)
    } catch (error) {
      console.error(error)

      return res.status(HttpStatus.BAD_REQUEST).send(<ResponseApi>{
        message: error,
        status: HttpStatus.BAD_REQUEST,
      })
    }
  }

  @Get('searchpersons')
  async searchPersons(
    @Query('page') page: string,
    @Query('limit') limit: string,
    @Res() res: FastifyReply,
  ) {
    try {
      const pageQueries = new PageQuery({ limit: limit, page: page })
      const persons = await this.opencvPersonService.getPersons(pageQueries)

      return res.send(persons)
    } catch (error) {
      const status = error.status ?? HttpStatus.BAD_REQUEST

      return res.status(status).send({
        message: error.message,
        status: status,
      })
    }
  }
}
