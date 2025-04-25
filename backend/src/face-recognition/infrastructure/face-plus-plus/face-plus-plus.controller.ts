import {
  Controller,
  Post,
  Body,
  HttpStatus,
  Res,
  Query,
  Get,
} from '@nestjs/common'
import { FastifyReply } from 'fastify'
import { FacePlusPlusService } from './face-plus-plus.service'
import { ResponseApi } from 'src/shared/domain/entities/response-api'
import { PageQuery } from 'src/shared/domain/entities/pagination/page-query'
import { Role } from 'src/shared/domain/entities/roles/role.enum'
import { Roles } from 'src/shared/domain/entities/roles/roles.decorator'
import {
  PageQueryDto,
  ResultSearchFaceDto,
  BodyFaceppDto as UserFaceppDto,
} from './interfaces'
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  getSchemaPath,
} from '@nestjs/swagger'
import {
  ListSearchPerson,
  PersonPaginate,
} from 'src/shared/domain/entities/pagination/list-search-person'

@Controller('facepp')
export class FacePlusPlusController {
  constructor(private readonly facePlusPlusService: FacePlusPlusService) {}

  // Cadastrar face no BD da API
  @ApiBadRequestResponse({
    type: ResponseApi,
    example: {
      message: 'IMAGE_ERROR_UNSUPPORTED_FORMAT: image_base64 - detectFaces',
      status: 400,
    },
  })
  @ApiCreatedResponse({
    type: ResponseApi,
    example: {
      message: 'Face registered successfully',
      status: HttpStatus.CREATED,
    },
  })
  @Post('faceregister')
  async faceRegister(
    @Body() userFaceppDto: UserFaceppDto,
    @Res() res: FastifyReply,
  ) {
    try {
      // Detectar faces na imagem
      const detectResult = await this.facePlusPlusService.detectFace(
        userFaceppDto.imageBase64,
      )

      if (detectResult.face_num !== 1) {
        throw 'Face not detected or multiple faces detected'
      }

      // Set id customizado a imagem - inserir o número de matricula
      await this.facePlusPlusService.setUserId(
        userFaceppDto.userId,
        detectResult.faces[0].face_token,
      )

      // Adicionar imagem a lista da faces na API
      const addFaceResult = await this.facePlusPlusService.addFace(
        detectResult.faces[0].face_token,
      )

      if (addFaceResult.face_added <= 0) {
        throw 'Error adding face'
      }

      return res.status(HttpStatus.CREATED).send(<ResponseApi>{
        message: 'Face registered successfully',
        status: HttpStatus.CREATED,
      })
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).send(<ResponseApi>{
        message: error,
        status: HttpStatus.BAD_REQUEST,
      })
    }
  }

  @ApiExtraModels(ResponseApi, ResultSearchFaceDto)
  @ApiOkResponse({
    description: 'Retorna o resultado da autenticação de face',
    schema: {
      allOf: [
        { $ref: getSchemaPath(ResponseApi) },
        {
          properties: {
            data: { $ref: getSchemaPath(ResultSearchFaceDto) },
          },
        },
      ],
    },
    example: <ResponseApi>{
      message: 'Face authenticated successfully',
      data: <ResultSearchFaceDto>{
        confidence: 98.53,
        userid: '123',
      },
      status: HttpStatus.OK,
    },
  })
  @ApiBadRequestResponse({
    type: ResponseApi,
    example: {
      message: 'IMAGE_ERROR_UNSUPPORTED_FORMAT: image_base64 - detectFaces',
      status: 400,
    },
  })
  @Roles(Role.REGISTRO_PONTO)
  @Post('faceauthenticate')
  async faceAuthenticate(
    @Body() userFaceppDto: UserFaceppDto,
    @Res() res: FastifyReply,
  ) {
    try {
      // Detectar faces na imagem
      const detectResult = await this.facePlusPlusService.detectFace(
        userFaceppDto.imageBase64,
      )

      if (detectResult.face_num !== 1) {
        throw 'Face not detected or multiple faces detected'
      }

      // Buscar imagem semelhante na API
      const searchResult = await this.facePlusPlusService.searchFace(
        detectResult.faces[0].face_token,
      )

      if (searchResult.results.length <= 0) {
        throw 'No face encountered'
      }

      // Verifica o nível de "confiança" da imagem buscada
      if (searchResult.isConfidence === false) {
        throw 'The face was not confidence'
      }

      // Caso userId seja passado no body faz a verificação com id da imagem
      if (userFaceppDto.userId != undefined && userFaceppDto.userId != '') {
        const isUseridEqual = searchResult.verifyUserId(userFaceppDto.userId)

        if (isUseridEqual === false) {
          throw `Userid not match Request: ${userFaceppDto.userId} - API: ${searchResult.results[0].user_id}`
        }
      }

      return res.status(HttpStatus.OK).send(<ResponseApi>{
        message: 'Face authenticated successfully',
        data: <ResultSearchFaceDto>{
          confidence: searchResult.results[0].confidence,
          userid: searchResult.results[0].user_id,
        },
        status: HttpStatus.OK,
      })
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).send(<ResponseApi>{
        message: error,
        status: HttpStatus.BAD_REQUEST,
      })
    }
  }

  @ApiExtraModels(ListSearchPerson, PersonPaginate)
  @ApiOkResponse({
    schema: {
      allOf: [
        { $ref: getSchemaPath(ListSearchPerson) },
        {
          properties: {
            persons: {
              type: 'array',
              items: {
                $ref: getSchemaPath(PersonPaginate),
              },
            },
          },
        },
      ],
    },
  })
  @ApiInternalServerErrorResponse({
    type: ResponseApi,
    example: {
      message: 'Internal Server Error',
      status: HttpStatus.INTERNAL_SERVER_ERROR,
    },
  })
  @Get('searchpersons')
  async searchPersons(
    @Query() pageQueryDto: PageQueryDto,
    @Res() res: FastifyReply,
  ) {
    try {
      const pageQueries = new PageQuery({
        limit: pageQueryDto.limit,
        page: pageQueryDto.page,
      })

      const persons = await this.facePlusPlusService.getPersons(pageQueries)

      return res.send(persons)
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message: error,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      })
    }
  }
}
