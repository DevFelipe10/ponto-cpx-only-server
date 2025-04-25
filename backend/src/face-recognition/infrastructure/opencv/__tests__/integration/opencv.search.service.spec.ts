import { Test, TestingModule } from '@nestjs/testing'
import { OpencvSearchService } from '../../opencv.search.service'
import { EnvConfigModule } from 'src/shared/infrastructure/env-config/env-config.module'
import { OpencvHttpService } from '../../opencv-http/opencv-http.service'
import { OpencvService } from '../../opencv.service'
import { faker } from '@faker-js/faker/.'
import { HttpStatus } from '@nestjs/common'
import { AxiosError, AxiosResponse } from 'axios'
import { PersonOpencv } from 'src/face-recognition/domain/entities/opencv/types/opencv.person.type'
import { PersonOpencvDataBuilder } from 'src/shared/domain/testing/helpers/person-opencv-data-builder'
import { ErrorResponseOpencv } from 'src/face-recognition/domain/entities/opencv/types/error-repsonse-opencv'
import { ErrorResponseOpencvDataBuilder } from 'src/shared/domain/testing/helpers/error-response-opencv-data-builder'
import {
  SearchDetectOpencv,
  SearchPersonOpencv,
} from 'src/face-recognition/domain/entities/opencv/types/opencv.search.type'
import { SearchDetectOpencvDataBuilder } from 'src/shared/domain/testing/helpers/search-detect-opencv-data-builder'
import { EnvConfigService } from 'src/shared/infrastructure/env-config/env-config.service'

describe('OpencvSearchService integration tests', () => {
  let sut: OpencvSearchService
  let opencvHttpService: OpencvHttpService
  let envConfigService: EnvConfigService
  let opencvService: OpencvService

  const image = faker.image.dataUri({ type: 'svg-base64' })
  const errorResponseOpencv = new ErrorResponseOpencv(
    ErrorResponseOpencvDataBuilder({}),
  )

  const mockRejectedPost = <AxiosError<ErrorResponseOpencv>>{
    response: {
      data: errorResponseOpencv,
      status: HttpStatus.BAD_REQUEST,
    },
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OpencvSearchService,
        OpencvService,
        {
          provide: OpencvHttpService,
          useValue: { post: jest.fn() },
        },
      ],
      imports: [EnvConfigModule],
    }).compile()

    sut = module.get<OpencvSearchService>(OpencvSearchService)
    opencvHttpService = module.get<OpencvHttpService>(OpencvHttpService)
    envConfigService = module.get<EnvConfigService>(EnvConfigService)
    opencvService = module.get<OpencvService>(OpencvService)
  })

  it('should be defined', () => {
    expect(sut).toBeDefined()
  })

  describe('detect function', () => {
    const searchDetectOpencv = new SearchDetectOpencv(
      SearchDetectOpencvDataBuilder({}),
    )

    it('should be return succesfully response', async () => {
      jest.spyOn(opencvHttpService, 'post').mockResolvedValue(<AxiosResponse>{
        data: [searchDetectOpencv],
        status: HttpStatus.OK,
      })

      const result = await sut.detect(image)

      expect(result).toBeInstanceOf(Array<SearchDetectOpencv>)
      expect(result).toEqual([searchDetectOpencv])
      expect(opencvHttpService.post).toHaveBeenCalledWith(
        `${envConfigService.getOpencvBaseUrl()}/detect`,
        { image: opencvService.wrapBase64(image) },
      )
    })

    it('should be return ErrorResponseOpencv response', async () => {
      jest.spyOn(opencvHttpService, 'post').mockRejectedValue(mockRejectedPost)

      await expect(sut.detect(image)).rejects.toBeInstanceOf(
        ErrorResponseOpencv,
      )
    })

    it('should be return error response', async () => {
      await expect(sut.detect(image)).rejects.toThrow(
        Error('Erro desconhecido ao detectar a imagem'),
      )
    })
  })

  describe('searchFace function', () => {
    const personOpencv = new PersonOpencv(PersonOpencvDataBuilder({}))

    it('should be return succesfully response', async () => {
      jest.spyOn(opencvHttpService, 'post').mockResolvedValue(<AxiosResponse>{
        data: [personOpencv],
        status: HttpStatus.OK,
      })

      const result = await sut.searchFace(image)

      expect(result).toBeInstanceOf(Array<PersonOpencv>)
      expect(result).toEqual([personOpencv])
      expect(opencvHttpService.post).toHaveBeenCalledWith(
        `${envConfigService.getOpencvBaseUrl()}/search`,
        <SearchPersonOpencv>{
          images: [opencvService.wrapBase64(image)],
          max_results: 2,
          min_score: envConfigService.getOpencvMinScoreFace(),
        },
      )
    })

    it('should be return ErrorResponseOpencv response', async () => {
      jest.spyOn(opencvHttpService, 'post').mockRejectedValue(mockRejectedPost)

      await expect(sut.searchFace(image)).rejects.toBeInstanceOf(
        ErrorResponseOpencv,
      )
    })

    it('should be return error response', async () => {
      await expect(sut.searchFace(image)).rejects.toThrow(
        Error('Erro desconhecido ao buscar face'),
      )
    })
  })
})
