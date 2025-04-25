import { Injectable } from '@nestjs/common'
import { AxiosError } from 'axios'
import { EnvConfigService } from 'src/shared/infrastructure/env-config/env-config.service'
import { PersonOpencv } from '../../domain/entities/opencv/types/opencv.person.type'
import { ErrorResponseOpencv } from '../../domain/entities/opencv/types/error-repsonse-opencv'
import { OpencvHttpService } from './opencv-http/opencv-http.service'
import {
  SearchDetectOpencv,
  SearchPersonOpencv,
} from '../../domain/entities/opencv/types/opencv.search.type'
import { OpencvService } from './opencv.service'

@Injectable()
export class OpencvSearchService {
  private opencvBaseUrl: string
  private min_score: number

  constructor(
    private readonly envConfigService: EnvConfigService,
    private readonly httpService: OpencvHttpService,
    private readonly opencvService: OpencvService,
  ) {
    this.opencvBaseUrl = this.envConfigService.getOpencvBaseUrl()
    this.min_score = this.envConfigService.getOpencvMinScoreFace()
  }

  async detect<R = SearchDetectOpencv[], E = ErrorResponseOpencv>(
    image: Base64URLString,
  ) {
    try {
      const { data } = await this.httpService.post<R>(
        `${this.opencvBaseUrl}/detect`,
        { image: this.opencvService.wrapBase64(image) },
      )

      return data
    } catch (error) {
      console.error(error)

      const axiosError = error as AxiosError<E>

      if (axiosError.response?.data) {
        throw axiosError.response.data
      }

      throw new Error('Erro desconhecido ao detectar a imagem')
    }
  }

  // Busca um ou mais imagens da pessoa
  async searchFace<R = PersonOpencv[], E = ErrorResponseOpencv>(
    image: Base64URLString,
    max_results: number = 2,
  ) {
    try {
      const request = <SearchPersonOpencv>{
        images: [this.opencvService.wrapBase64(image)],
        max_results: max_results,
        min_score: this.min_score,
      }

      const res = await this.httpService.post<R>(
        `${this.opencvBaseUrl}/search`,
        request,
      )

      return res.data
    } catch (error) {
      const axiosError = error as AxiosError<E>

      if (axiosError.response?.data) {
        throw axiosError.response.data
      }

      throw new Error('Erro desconhecido ao buscar face')
    }
  }
}
