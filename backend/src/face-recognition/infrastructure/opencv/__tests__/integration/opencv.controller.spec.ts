import { Test, TestingModule } from '@nestjs/testing'
import { OpencvController } from '../../opencv.controller'
import { OpencvPersonService } from '../../opencv.person.service'
import { EnvConfigModule } from 'src/shared/infrastructure/env-config/env-config.module'
import { EnvConfigService } from 'src/shared/infrastructure/env-config/env-config.service'
import { OpencvSearchService } from '../../opencv.search.service'
import { faker } from '@faker-js/faker/.'
import { FastifyReply } from 'fastify'
import { SearchDetectOpencv } from 'src/face-recognition/domain/entities/opencv/types/opencv.search.type'
import { SearchDetectOpencvDataBuilder } from 'src/shared/domain/testing/helpers/search-detect-opencv-data-builder'
import { PersonOpencv } from 'src/face-recognition/domain/entities/opencv/types/opencv.person.type'
import { PersonOpencvDataBuilder } from 'src/shared/domain/testing/helpers/person-opencv-data-builder'
import { ResponseApi } from 'src/shared/domain/entities/response-api'
import { HttpStatus } from '@nestjs/common'
import { ListSearchPerson } from 'src/shared/domain/entities/pagination/list-search-person'
import { ListSearchPersonDataBuilder } from 'src/shared/domain/testing/helpers/list-search-person-data-builder'
import { PageQuery } from 'src/shared/domain/entities/pagination/page-query'
import { AxiosError, AxiosHeaders } from 'axios'

describe('OpencvController integration tests', () => {
  let sut: OpencvController
  let envConfigService: EnvConfigService
  let opencvSearchService: OpencvSearchService
  let opencvPersonService: OpencvPersonService
  let res: FastifyReply

  const imageBase64 = faker.image.dataUri({ type: 'svg-base64' })
  const personOpencv = new PersonOpencv(PersonOpencvDataBuilder({}))
  const listSearchPerson = new ListSearchPerson(ListSearchPersonDataBuilder({}))
  const searchDetect = new SearchDetectOpencv(SearchDetectOpencvDataBuilder({}))

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: OpencvPersonService,
          useValue: {
            createPerson: jest.fn().mockResolvedValue(personOpencv),
            getPersons: jest.fn().mockResolvedValue(listSearchPerson),
          },
        },
        {
          provide: OpencvSearchService,
          useValue: {
            detect: jest.fn().mockResolvedValue([searchDetect]),
            searchFace: jest.fn().mockResolvedValue([personOpencv]),
          },
        },
      ],
      controllers: [OpencvController],
      imports: [EnvConfigModule],
    }).compile()

    sut = module.get<OpencvController>(OpencvController)
    envConfigService = module.get<EnvConfigService>(EnvConfigService)
    opencvSearchService = module.get<OpencvSearchService>(OpencvSearchService)
    opencvPersonService = module.get<OpencvPersonService>(OpencvPersonService)
    res = {
      status: jest.fn().mockReturnValue({
        send: jest.fn(),
      }),
      send: jest.fn(),
    } as unknown as FastifyReply
  })

  it('should be defined', () => {
    expect(sut).toBeDefined()
  })

  describe('faceRegister function', () => {
    const id = faker.number.int({ min: 1, max: 100 }).toString()

    it('should be register face successfully', async () => {
      await sut.faceRegister(imageBase64, id, res)

      expect(opencvSearchService.detect).toHaveBeenCalledWith(imageBase64)
      // expect(opencvSearchService.detect).toHaveReturnedWith([searchDetect])
      expect(opencvPersonService.createPerson).toHaveBeenCalledWith(
        imageBase64,
        id,
      )
      // expect(opencvPersonService.createPerson).toHaveReturnedWith(personOpencv)
      expect(res.status).toHaveBeenCalledWith(HttpStatus.CREATED)
      expect(res.status(HttpStatus.CREATED).send).toHaveBeenCalledWith(<
        ResponseApi
      >{
        status: HttpStatus.CREATED,
        message: 'Face registered successfully',
      })
    })

    it('should not found face in image', async () => {
      jest
        .spyOn(opencvSearchService, 'detect')
        .mockResolvedValue([] as SearchDetectOpencv[])

      await sut.faceRegister(imageBase64, id, res)

      expect(opencvSearchService.detect).toHaveBeenCalledWith(imageBase64)
      expect(res.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST)
      expect(res.status(HttpStatus.BAD_REQUEST).send).toHaveBeenCalledWith(<
        ResponseApi
      >{
        status: HttpStatus.BAD_REQUEST,
        error: 'Face not found in image',
        message: 'Error registering face',
      })
    })
  })
  describe('faceAuthenticate function', () => {
    const id = faker.number.int({ min: 1, max: 100 }).toString()
    it('should be face authenticated with successfully without id', async () => {
      await sut.faceAuthenticate(res, imageBase64)

      expect(opencvSearchService.detect).toHaveBeenCalledWith(imageBase64)
      expect(opencvSearchService.searchFace).toHaveBeenCalledWith(imageBase64)
      expect(res.status).toHaveBeenCalledWith(HttpStatus.OK)
      expect(res.status(HttpStatus.OK).send).toHaveBeenCalledWith(<ResponseApi>{
        message: 'Face authenticated successfully',
        data: {
          confidence: personOpencv.score,
          userid: personOpencv.name,
        },
        status: HttpStatus.OK,
      })
    })

    it('should be face authenticated with successfully with equal id', async () => {
      await sut.faceAuthenticate(res, imageBase64, personOpencv.name)

      expect(opencvSearchService.detect).toHaveBeenCalledWith(imageBase64)
      expect(opencvSearchService.searchFace).toHaveBeenCalledWith(imageBase64)
      expect(res.status).toHaveBeenCalledWith(HttpStatus.OK)
      expect(res.status(HttpStatus.OK).send).toHaveBeenCalledWith(<ResponseApi>{
        message: 'Face authenticated successfully',
        data: {
          confidence: personOpencv.score,
          userid: personOpencv.name,
        },
        status: HttpStatus.OK,
      })
    })

    it('should be face authenticated with successfully without equal id', async () => {
      const fakeId = faker.number.int().toString()

      await sut.faceAuthenticate(res, imageBase64, fakeId)

      expect(opencvSearchService.detect).toHaveBeenCalledWith(imageBase64)
      expect(opencvSearchService.searchFace).toHaveBeenCalledWith(imageBase64)
      expect(res.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST)
      expect(res.status(HttpStatus.BAD_REQUEST).send).toHaveBeenCalledWith(<
        ResponseApi
      >{
        message: `Userid not match Request: ${fakeId} - API: ${personOpencv.name}`,
        status: HttpStatus.BAD_REQUEST,
      })
    })

    it('should be not face or multiple faces detected', async () => {
      jest
        .spyOn(opencvSearchService, 'detect')
        .mockResolvedValue([] as SearchDetectOpencv[])

      await sut.faceAuthenticate(res, imageBase64)

      expect(opencvSearchService.detect).toHaveBeenCalledWith(imageBase64)
      expect(res.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST)
      expect(res.status(HttpStatus.BAD_REQUEST).send).toHaveBeenCalledWith(<
        ResponseApi
      >{
        message: 'Face not detected or multiple faces detected',
        status: HttpStatus.BAD_REQUEST,
      })
    })

    it('should be no equal face encountered', async () => {
      jest
        .spyOn(opencvSearchService, 'searchFace')
        .mockResolvedValue([] as PersonOpencv[])

      await sut.faceAuthenticate(res, imageBase64)

      expect(opencvSearchService.detect).toHaveBeenCalledWith(imageBase64)
      expect(res.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST)
      expect(res.status(HttpStatus.BAD_REQUEST).send).toHaveBeenCalledWith(<
        ResponseApi
      >{
        message: 'No equal face encountered',
        status: HttpStatus.BAD_REQUEST,
      })
    })
  })

  describe('searchPersons function', () => {
    const page = faker.number.int({ max: 20, min: 1 }).toString()
    const limit = faker.number.int({ max: 20, min: 1 }).toString()

    it('should be return persons successfully', async () => {
      await sut.searchPersons(page, limit, res)

      expect(opencvPersonService.getPersons).toHaveBeenCalledWith(
        new PageQuery({ limit: limit, page: page }),
      )
      expect(res.send).toHaveBeenCalledWith(listSearchPerson)
    })

    it('should return error with status of the error', async () => {
      const statusCode = HttpStatus.INTERNAL_SERVER_ERROR
      const error = new AxiosError(
        'Erro interno de requisição',
        '',
        undefined,
        undefined,
        {
          config: {
            headers: new AxiosHeaders(),
          },
          status: statusCode,
          data: {},
          headers: {},
          statusText: '',
        },
      )

      jest.spyOn(opencvPersonService, 'getPersons').mockRejectedValue(error)

      await sut.searchPersons(page, limit, res)

      expect(opencvPersonService.getPersons).toHaveBeenCalledWith(
        new PageQuery({ limit: limit, page: page }),
      )
      expect(res.status).toHaveBeenCalledWith(statusCode)
      expect(res.status(statusCode).send).toHaveBeenCalledWith({
        message: error.message,
        status: statusCode,
      })
    })

    it('should return error with bad request status ', async () => {
      const statusCode = HttpStatus.BAD_REQUEST
      const error = new Error('Erro interno de requisição 2')

      jest.spyOn(opencvPersonService, 'getPersons').mockRejectedValue(error)

      await sut.searchPersons(page, limit, res)

      expect(opencvPersonService.getPersons).toHaveBeenCalledWith(
        new PageQuery({ limit: limit, page: page }),
      )
      expect(res.status).toHaveBeenCalledWith(statusCode)
      expect(res.status(statusCode).send).toHaveBeenCalledWith({
        message: error.message,
        status: statusCode,
      })
    })
  })
})
