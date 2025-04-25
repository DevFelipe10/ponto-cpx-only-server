import { Test, TestingModule } from '@nestjs/testing'
import { EnvConfigModule } from 'src/shared/infrastructure/env-config/env-config.module'
import { OpencvHttpService } from '../../opencv-http/opencv-http.service'
import { OpencvService } from '../../opencv.service'
import { faker } from '@faker-js/faker/.'
import { HttpStatus } from '@nestjs/common'
import { AxiosError, AxiosResponse } from 'axios'
import {
  PersonCreateOpencv,
  PersonOpencv,
  SearchPersonResultOpencv,
} from 'src/face-recognition/domain/entities/opencv/types/opencv.person.type'
import { PersonOpencvDataBuilder } from 'src/shared/domain/testing/helpers/person-opencv-data-builder'
import { ErrorResponseOpencv } from 'src/face-recognition/domain/entities/opencv/types/error-repsonse-opencv'
import { ErrorResponseOpencvDataBuilder } from 'src/shared/domain/testing/helpers/error-response-opencv-data-builder'
import { EnvConfigService } from 'src/shared/infrastructure/env-config/env-config.service'
import { OpencvPersonService } from '../../opencv.person.service'
import { SearchPersonResultOpencvDataBuilder } from 'src/shared/domain/testing/helpers/search-person-result-opencv-data-builder'
import { PageQuery } from 'src/shared/domain/entities/pagination/page-query'
import { PageQueryDataBuilder } from 'src/shared/domain/testing/helpers/page-query-data-builder'
import {
  ListSearchPerson,
  PersonPaginate,
  SearchPersonResult,
} from 'src/shared/domain/entities/pagination/list-search-person'
import { SearchPersonResultDataBuilder } from 'src/shared/domain/testing/helpers/search-person-result-data-builder'

describe('OpencvPersonService integration tests', () => {
  let sut: OpencvPersonService
  let opencvHttpService: OpencvHttpService
  let envConfigService: EnvConfigService
  let opencvService: OpencvService

  const imageBase64 = faker.image.dataUri({ type: 'svg-base64' })
  const mockRejected = <AxiosError<ErrorResponseOpencv>>{
    response: {
      data: new ErrorResponseOpencv(ErrorResponseOpencvDataBuilder({})),
      status: HttpStatus.BAD_REQUEST,
    },
  }
  const personOpencv = new PersonOpencv(PersonOpencvDataBuilder({}))
  const searchPersonResultOpencv = new SearchPersonResultOpencv(
    SearchPersonResultOpencvDataBuilder({}),
  )

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OpencvPersonService,
        OpencvService,
        {
          provide: OpencvHttpService,
          useValue: { post: jest.fn(), get: jest.fn() },
        },
      ],
      imports: [EnvConfigModule],
    }).compile()

    sut = module.get<OpencvPersonService>(OpencvPersonService)
    opencvHttpService = module.get<OpencvHttpService>(OpencvHttpService)
    envConfigService = module.get<EnvConfigService>(EnvConfigService)
    opencvService = module.get<OpencvService>(OpencvService)
  })

  it('should be defined', () => {
    expect(sut).toBeDefined()
  })

  describe('getPersonById function', () => {
    it('should be return succesfully response', async () => {
      jest.spyOn(opencvHttpService, 'get').mockResolvedValue(<AxiosResponse>{
        data: personOpencv,
        status: HttpStatus.OK,
      })

      const result = await sut.getPersonById(personOpencv.id)

      expect(result).toBeInstanceOf(PersonOpencv)
      expect(result).toEqual(personOpencv)
      expect(opencvHttpService.get).toHaveBeenCalledWith(
        `${envConfigService.getOpencvBaseUrl()}/person/${personOpencv.id}`,
      )
    })

    it('should be return null response', async () => {
      jest.spyOn(opencvHttpService, 'get').mockRejectedValue(mockRejected)

      const result = await sut.getPersonById(personOpencv.id)

      expect(result).toBeNull()
      expect(opencvHttpService.get).toHaveBeenCalledWith(
        `${envConfigService.getOpencvBaseUrl()}/person/${personOpencv.id}`,
      )
    })
  })

  describe('getPersons function', () => {
    const pageQueries = new PageQuery(PageQueryDataBuilder({}))
    const searchPersonResult = new SearchPersonResult(
      SearchPersonResultDataBuilder({
        count: searchPersonResultOpencv.persons.length,
        persons: searchPersonResultOpencv.persons.map(
          person =>
            new PersonPaginate({
              id: person.name,
              name: person.name,
              create_date: person.create_date,
              modified_date: person.modified_date,
            }),
        ),
      }),
    )
    const listSearchPerson = new ListSearchPerson({
      limit: pageQueries.limit,
      searchPersonResult: searchPersonResult,
    })

    it('should be return succesfully response', async () => {
      jest.spyOn(opencvHttpService, 'get').mockResolvedValue(<AxiosResponse>{
        data: searchPersonResultOpencv,
        status: HttpStatus.OK,
      })

      const result = await sut.getPersons(pageQueries)

      expect(result).toBeInstanceOf(ListSearchPerson)
      expect(result).toEqual(listSearchPerson)
      expect(opencvHttpService.get).toHaveBeenCalledWith(
        `${envConfigService.getOpencvBaseUrl()}/persons`,
        { skip: pageQueries.skip, take: pageQueries.limit },
      )
    })
  })

  describe('createPerson function', () => {
    const id = faker.number.int().toString()

    it('should be return succesfully response', async () => {
      jest.spyOn(opencvHttpService, 'post').mockResolvedValue(<AxiosResponse>{
        data: personOpencv,
        status: HttpStatus.OK,
      })

      const result = await sut.createPerson(imageBase64, id)

      expect(result).toBeInstanceOf(PersonOpencv)
      expect(result).toEqual(personOpencv)
      expect(opencvHttpService.post).toHaveBeenCalledWith(
        `${envConfigService.getOpencvBaseUrl()}/person`,
        <PersonCreateOpencv>{
          name: id,
          images: [opencvService.wrapBase64(imageBase64)],
        },
      )
    })

    it('should be return ErrorResponseOpencv response', async () => {
      jest.spyOn(opencvHttpService, 'post').mockRejectedValue(mockRejected)

      await expect(sut.createPerson(imageBase64, id)).rejects.toBeInstanceOf(
        ErrorResponseOpencv,
      )
    })

    it('should be return error response', async () => {
      await expect(sut.createPerson(imageBase64, id)).rejects.toThrow(
        Error('Erro desconhecido ao criar nova pessoa'),
      )
    })
  })
})
