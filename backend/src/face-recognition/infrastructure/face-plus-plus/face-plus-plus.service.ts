import { Injectable, Logger } from '@nestjs/common'
import { FaceRecognitionInterface } from '../face-recognition.interface'
import { EnvConfigService } from 'src/shared/infrastructure/env-config/env-config.service'
import { HttpService } from '@nestjs/axios'
import { catchError, delay, firstValueFrom } from 'rxjs'
import { AxiosError } from 'axios'
import {
  DetectResultEntity,
  DetectResultEntityFactory,
} from 'src/shared/domain/entities/face-recognition/face-plus-plus/detect-result.entity'
import { ResultFaceRecognition } from 'src/shared/domain/entities/face-recognition/face-plus-plus/result-face-recognition.entity'
import {
  SearchFaceResultEntity,
  SearchFaceResultEntityFactory,
} from 'src/shared/domain/entities/face-recognition/face-plus-plus/search-face-result.entity'
import {
  SetUserIdResultEntity,
  SetUserIdResultFactory,
} from 'src/shared/domain/entities/face-recognition/face-plus-plus/set-user-id-result.entity'
import {
  AddFaceResultEntity,
  AddFaceResultEntityFactory,
} from 'src/shared/domain/entities/face-recognition/face-plus-plus/add-face-result.entity'
import { PageQuery } from 'src/shared/domain/entities/pagination/page-query'
import {
  ListSearchPerson,
  PersonPaginate,
  SearchPersonResult,
} from 'src/shared/domain/entities/pagination/list-search-person'
import { GetDetailResultEntity } from 'src/shared/domain/entities/face-recognition/face-plus-plus/get-person-result.entity'

type ErrorFacePlusPlusService = {
  error_message: string
}

type DetailsFaceSet = {
  faceset_token: string
  tags: string
  time_used: number
  user_data: string
  display_name: string
  face_tokens: string[]
  face_count: number
  request_id: string
  outer_id: string
}

@Injectable()
export class FacePlusPlusService
  implements FaceRecognitionInterface<ResultFaceRecognition>
{
  private readonly logger = new Logger(FacePlusPlusService.name)

  constructor(
    private readonly httpService: HttpService,
    private readonly envConfigService: EnvConfigService,
  ) {}

  async detectFace(imageData: string): Promise<DetectResultEntity> {
    const { data } = await firstValueFrom(
      this.httpService
        .post<DetectResultEntity>(
          `${this.envConfigService.getFaceppBaseUrl()}/detect`,
          {
            api_key: this.envConfigService.getFaceppApiKey(),
            api_secret: this.envConfigService.getFaceppApiSecret(),
            image_base64: imageData,
          },
          {
            headers: { 'Content-Type': 'multipart/form-data' },
          },
        )
        .pipe(
          delay(3000),
          catchError((error: AxiosError<ErrorFacePlusPlusService>) => {
            this.logger.error(error.response.data)
            throw error.response.data.error_message + ' - detectFaces'
            // throw 'An error happened when trying to detect the face'
          }),
        ),
    )

    return DetectResultEntityFactory.create(data)
  }

  async searchFace(faceId: string): Promise<SearchFaceResultEntity> {
    const { data } = await firstValueFrom(
      this.httpService
        .post<SearchFaceResultEntity>(
          `${this.envConfigService.getFaceppBaseUrl()}/search`,
          {
            api_key: this.envConfigService.getFaceppApiKey(),
            api_secret: this.envConfigService.getFaceppApiSecret(),
            outer_id: this.envConfigService.getFaceppListId(),
            face_token: faceId,
            return_result_count: 1,
          },
          {
            headers: { 'Content-Type': 'multipart/form-data' },
          },
        )
        .pipe(
          delay(3000),
          catchError((error: AxiosError<ErrorFacePlusPlusService>) => {
            this.logger.error(error.response.data)
            throw error.response.data.error_message + ' - searchFace'
            // throw 'An error happened when searching for the face'
          }),
        ),
    )

    return SearchFaceResultEntityFactory.create(data)
  }

  async getPersons(pageQueries: PageQuery) {
    const { data } = await firstValueFrom(
      this.httpService
        .post<DetailsFaceSet>(
          `${this.envConfigService.getFaceppBaseUrl()}/faceset/getdetail`,
          {
            api_key: this.envConfigService.getFaceppApiKey(),
            api_secret: this.envConfigService.getFaceppApiSecret(),
            outer_id: this.envConfigService.getFaceppListId(),
          },
          {
            headers: { 'Content-Type': 'multipart/form-data' },
          },
        )
        .pipe(
          delay(3000),
          catchError((error: AxiosError<ErrorFacePlusPlusService>) => {
            delay(3000)
            this.logger.error(error.response.data)
            throw error.response.data.error_message + ' - getPersons'
          }),
        ),
    )

    const { face_count, face_tokens } = data
    const persons: PersonPaginate[] = []
    const totalPage = PageQuery.calculateTotalPages(
      face_tokens.length,
      pageQueries.limit,
    )

    face_tokens.splice(0, (pageQueries.page - 1) * pageQueries.limit)

    face_tokens.splice(
      pageQueries.limit,
      face_tokens.length - pageQueries.limit,
    )

    for (const token of face_tokens) {
      const detail = await this.getDetail(token)
      persons.push(new PersonPaginate({ id: detail.user_id }))
    }

    // Criar resultado da pesquisa de pessoas
    const searchPerson = new SearchPersonResult({
      count: face_count,
      persons: persons,
    })

    return new ListSearchPerson({
      limit: pageQueries.limit,
      searchPersonResult: searchPerson,
    })
  }

  async getDetail(face_token: string) {
    const { data } = await firstValueFrom(
      this.httpService
        .post<GetDetailResultEntity>(
          `${this.envConfigService.getFaceppBaseUrl()}/face/getdetail`,
          {
            api_key: this.envConfigService.getFaceppApiKey(),
            api_secret: this.envConfigService.getFaceppApiSecret(),
            face_token: face_token,
          },
          {
            headers: { 'Content-Type': 'multipart/form-data' },
          },
        )
        .pipe(
          delay(3000),
          catchError((error: AxiosError<ErrorFacePlusPlusService>) => {
            delay(3000)
            this.logger.error(error.response.data)
            throw error.response.data.error_message + ' - getDetail'
          }),
        ),
    )

    return data
  }

  async setUserId(
    userId: string,
    faceId: string,
  ): Promise<SetUserIdResultEntity> {
    const { data } = await firstValueFrom(
      this.httpService
        .post<SetUserIdResultEntity>(
          `${this.envConfigService.getFaceppBaseUrl()}/face/setuserid`,
          {
            api_key: this.envConfigService.getFaceppApiKey(),
            api_secret: this.envConfigService.getFaceppApiSecret(),
            user_id: userId,
            face_token: faceId,
          },
          {
            headers: { 'Content-Type': 'multipart/form-data' },
          },
        )
        .pipe(
          delay(3000),
          catchError((error: AxiosError<ErrorFacePlusPlusService>) => {
            this.logger.error(error.response.data)
            // throw 'An error happened when setting the user ID'
            throw error.response.data.error_message + ' - setUserId'
          }),
        ),
    )

    return SetUserIdResultFactory.create(data)
  }

  async addFace(faceId: string): Promise<AddFaceResultEntity> {
    const { data } = await firstValueFrom(
      this.httpService
        .post<AddFaceResultEntity>(
          `${this.envConfigService.getFaceppBaseUrl()}/faceset/addface`,
          {
            api_key: this.envConfigService.getFaceppApiKey(),
            api_secret: this.envConfigService.getFaceppApiSecret(),
            outer_id: this.envConfigService.getFaceppListId(),
            face_tokens: faceId,
          },
          {
            headers: { 'Content-Type': 'multipart/form-data' },
          },
        )
        .pipe(
          delay(3000),
          catchError((error: AxiosError<ErrorFacePlusPlusService>) => {
            this.logger.error(error.response.data)
            // throw 'An error happened when adding the face to the face list'
            throw error.response.data.error_message + ' - addFace'
          }),
        ),
    )

    return AddFaceResultEntityFactory.create(data)
  }
}
