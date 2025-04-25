import { HttpStatus, Injectable } from '@nestjs/common'
import { FaceRecognitionInterface } from '../face-recognition.interface'
import { ResultAzure } from 'src/shared/domain/entities/face-recognition/azure/result.azure'
import {
  DetectResultAzure,
  DetectResultAzureFactory,
} from 'src/shared/domain/entities/face-recognition/azure/detect-result.azure'
import { AddFaceResultAzure } from 'src/shared/domain/entities/face-recognition/azure/add-face-result.azure'
import { SearchFaceResultAzure } from 'src/shared/domain/entities/face-recognition/azure/search-face-result.azure'
import { SetUserIdResultAzure } from 'src/shared/domain/entities/face-recognition/azure/set-user-id-result.azure'
import { HttpService } from '@nestjs/axios'
import { EnvConfigService } from 'src/shared/infrastructure/env-config/env-config.service'
import {
  DetectFromUrlParameters,
  DetectFromUrlQueryParamProperties,
  DetectParameters,
  FaceClient,
  FaceDetectionResultOutput,
  FaceErrorResponseOutput,
  GetFaceListsParameters,
  GetFaceListsQueryParamProperties,
  isUnexpected,
} from '@azure-rest/ai-vision-face'
import { AzureAuthenticationService } from 'src/shared/infrastructure/azure/authentication/azure.authentication.service'
import * as fs from 'fs'

type FaceRectangleLocal = {
  top: number
  left: number
  width: number
  height: number
}

type FaceDetectionResultLocal = {
  faceId: string
  faceRectangle: FaceRectangleLocal
}

type AddFaceResultLocal = {
  persistedFaceId: string
}

@Injectable()
// export class AzureService implements FaceRecognitionInterface<ResultAzure> {
export class AzureService {
  // private readonly client: FaceClient

  constructor(
    private readonly httpService: HttpService,
    private readonly envConfigService: EnvConfigService,
    private readonly azureAuthenticationService: AzureAuthenticationService,
  ) {}

  toBase64(data: string): string {
    return data.split('base64,')[1]
  }

  // Envia imagem para detectar faces
  // Necessário o binário da imagem para detectar
  async detectFace(imageBase64: string): Promise<FaceDetectionResultLocal> {
    return <FaceDetectionResultLocal>{
      faceId: 'asdj292893jsda83',
      faceRectangle: {
        top: 691,
        left: 512,
        width: 966,
        height: 966,
      },
    }
    // try {
    //   const client = this.azureAuthenticationService.authenticate()
    //   imageBase64 = this.toBase64(imageBase64)
    //   const buff = Buffer.from(imageBase64, 'base64')
    //   fs.writeFileSync('uploads/stack-abuse-logo-out.jpeg', buff)
    //   const body = <DetectParameters>{
    //     contentType: 'application/octet-stream',
    //     quesryParameters: {
    //       detectionModel: 'detection_01',
    //       recognitionModel: 'recognition_01',
    //       // returnFaceLandmarks: true,
    //       // returnRecognitionModel: true,
    //       // faceIdTimeToLive: 120,
    //       // returnFaceAttributes: ['headPose', 'mask', 'qualityForRecognition'],
    //       returnFaceId: false,
    //     },
    //     body: fs.readFileSync('uploads/stack-abuse-logo-out.jpeg'),
    //   }
    //   const response = await client.path('/detect').post(body)
    //   if (isUnexpected(response)) {
    //     throw new Error(response.body.error.message)
    //   }
    //   console.log(response.body)
    //   // url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    //   // queryParameters: <DetectFromUrlQueryParamProperties>{
    //   //   returnFaceId: true,
    //   // },
    //   // body: {
    //   //   url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    //   // },
    //   // console.log(resDetect.body)
    //   // console.log(resDetect.request.headers.toJSON())
    //   // const res =
    //   // if (Number(resDetect.status) != HttpStatus.OK) {
    //   //   throw resDetect.body as FaceErrorResponseOutput
    //   // }
    //   // Number(resDetect.status) == HttpStatus.OK
    //   // ? (resDetect as FaceDetectionResultOutput)
    //   // : (resDetect.body as FaceErrorResponseOutput)
    //   // return DetectResultAzureFactory.create(<DetectResultAzure>{
    //   //   request_id: 'teste',
    //   // })
    // } catch (err) {
    //   console.log('erro: ' + err.message)
    // }
  }

  async addFace(userId: string, imageUrl: string): Promise<AddFaceResultLocal> {
    return <AddFaceResultLocal>{
      persistedFaceId: '2138490ab940-32kdsa',
    }
  }
  searchFace(faceId: string): Promise<SearchFaceResultAzure> {
    throw new Error('Method not implemented.')
  }
  setUserId(userId: string, faceId: string): Promise<SetUserIdResultAzure> {
    throw new Error('Method not implemented.')
  }
}
