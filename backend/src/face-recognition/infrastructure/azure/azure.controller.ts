import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common'
import { AzureService } from './azure.service'
import { FastifyReply } from 'fastify'
import { ResponseApi } from 'src/shared/domain/entities/response-api'

@Controller('azure')
export class AzureController {
  constructor(private readonly azureService: AzureService) {}
  @Post('/faceregister')
  async faceRegister(
    @Body('image_base64') imageBase64: string,
    @Body('userid') userid: string,
    @Res() res: FastifyReply,
  ) {
    try {
      // Detectar faces na imagem
      const detectResult = await this.azureService.detectFace(imageBase64)

      if (detectResult.faceId === undefined) {
        throw 'Face not detected or multiple faces detected'
      }

      // // Set id customizado a imagem - inserir o número de matricula
      // await this.azureService.setUserId(userid, detectResult.faces[0].face_token)

      // Adicionar imagem a lista da faces na API
      const addFaceResult = await this.azureService.addFace(
        userid,
        detectResult.faceId,
      )

      if (addFaceResult.persistedFaceId === undefined) {
        throw 'Error adding face'
      }

      return res.status(HttpStatus.OK).send(<ResponseApi>{
        message: 'Face registered successfully',
        status: HttpStatus.OK,
      })
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).send(<ResponseApi>{
        message: error,
        status: HttpStatus.BAD_REQUEST,
      })
    }
  }
  faceAuthenticate(imageBase64: string, userId: string) {
    throw new Error('Method not implemented.')
  }
}
