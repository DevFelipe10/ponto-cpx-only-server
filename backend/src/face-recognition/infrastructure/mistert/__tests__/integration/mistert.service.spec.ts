import { Test, TestingModule } from '@nestjs/testing'
import { MistertService } from '../../mistert.service'
import { HttpModule, HttpService } from '@nestjs/axios'
import { EnvConfigModule } from 'src/shared/infrastructure/env-config/env-config.module'
import { ResultGetConfig } from '../../interfaces'
import { EnvConfigService } from 'src/shared/infrastructure/env-config/env-config.service'
import { faker } from '@faker-js/faker/.'
import { of } from 'rxjs'
import { AxiosResponse } from 'axios'
import { UserAuth } from 'src/shared/domain/entities/auth/user.auth'
import { MarcacaoMisterT } from 'src/face-recognition/domain/entities/mistert/marcacao.mistert'
import { MarcacaoMisterTDataBuilder } from 'src/face-recognition/domain/testing/helpers/marcacao-mistert-data-builder'
import {
  ResultPointRegisterMisterT,
  ResultPointRegisterMisterTProps,
} from 'src/face-recognition/domain/entities/mistert/result-point-register.mistert'
import { ResultPointRegisterMisterTDataBuilder } from 'src/face-recognition/domain/testing/helpers/result-point-register-mistert-data-builder'
import { PontoGeolocation } from 'src/face-recognition/domain/entities/mistert/ponto-geolocation.mistert'

describe('MistertService integration tests', () => {
  let sut: MistertService
  let httpService: HttpService
  let envConfigService: EnvConfigService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MistertService],
      imports: [HttpModule, EnvConfigModule],
    }).compile()

    sut = module.get<MistertService>(MistertService)
    httpService = module.get<HttpService>(HttpService)
    envConfigService = module.get<EnvConfigService>(EnvConfigService)
  })

  it('should be defined', () => {
    expect(sut).toBeDefined()
  })

  describe('getConfig function', () => {
    it('should return a ResultGetConfig', async () => {
      const result = await sut.getConfig()

      expect(result).toBeInstanceOf(ResultGetConfig)
    })

    it('should return an error from request', async () => {
      jest
        .spyOn(envConfigService, 'getMisterTBaseUrl')
        .mockReturnValue(faker.internet.url())

      await expect(sut.getConfig()).rejects.toThrow(
        new Error(
          'An error happened when trying to get the webponto configuration',
        ),
      )
    })

    it('should return an error from conversion parse the JSON', async () => {
      jest
        .spyOn(httpService, 'get')
        .mockReturnValue(of({ data: faker.word.words() } as AxiosResponse))

      await expect(sut.getConfig()).rejects.toThrow(
        new Error(
          'An error happened when trying to parse the JSON - is not valid JSON - getConfigMisterT()',
        ),
      )
    })
  })

  describe('getUsersApi function', () => {
    it('should return a User list', async () => {
      const result = await sut.getUsersApi()

      expect(result.every(item => item instanceof UserAuth)).toBe(true)
    })

    it('should return an error from request', async () => {
      jest
        .spyOn(envConfigService, 'getMisterTBaseUrl')
        .mockReturnValue(faker.internet.url())

      await expect(sut.getUsersApi()).rejects.toThrow(
        new Error('An error happened when trying to getUsersApi()'),
      )
    })

    it('should return an error from conversion parse the JSON', async () => {
      jest
        .spyOn(httpService, 'get')
        .mockReturnValue(of({ data: faker.word.words() } as AxiosResponse))

      await expect(sut.getUsersApi()).rejects.toThrow(
        new Error(
          'An error happened when trying to parse the JSON - is not valid JSON - getUsersApi()',
        ),
      )
    })
  })

  describe('pointRegisterMisterT function', () => {
    const marcacaoMisterT = new MarcacaoMisterT(MarcacaoMisterTDataBuilder({}))

    it('should return a ResultPointRegister', async () => {
      const resultPointRegisterProps = ResultPointRegisterMisterTDataBuilder({})
      const resultPointRegister = new ResultPointRegisterMisterT(
        resultPointRegisterProps,
      )

      jest.spyOn(httpService, 'get').mockReturnValue(
        of<AxiosResponse<ResultPointRegisterMisterTProps>>({
          data: JSON.stringify(resultPointRegisterProps),
        } as AxiosResponse),
      )

      const result = await sut.pointRegisterMisterT(marcacaoMisterT)

      expect(result).toBeInstanceOf(ResultPointRegisterMisterT)
      expect(result).toEqual(resultPointRegister)
    })

    it('should return an error from request', async () => {
      jest.spyOn(httpService, 'get').mockRestore()
      jest
        .spyOn(envConfigService, 'getMisterTBaseUrl')
        .mockReturnValue(faker.internet.url())

      await expect(sut.pointRegisterMisterT(marcacaoMisterT)).rejects.toThrow(
        new Error('An error happened when trying to register point'),
      )
    })

    it('should return an error from conversion parse the JSON', async () => {
      jest
        .spyOn(httpService, 'get')
        .mockReturnValue(of({ data: faker.word.words() } as AxiosResponse))

      await expect(sut.pointRegisterMisterT(marcacaoMisterT)).rejects.toThrow(
        new Error(
          'An error happened when trying to parse the JSON - is not valid JSON - pointRegisterMisterT',
        ),
      )
    })
  })

  describe('getPointGeolocation function', () => {
    const marcacaoMisterT = new MarcacaoMisterT(MarcacaoMisterTDataBuilder({}))

    it('should return a PontoGeolocation array', async () => {
      const result = await sut.getPointGeolocation()

      expect(result.every(item => item instanceof PontoGeolocation)).toBe(true)
    })

    it('should return an error from request', async () => {
      jest.spyOn(httpService, 'get').mockRestore()
      jest
        .spyOn(envConfigService, 'getMisterTBaseUrl')
        .mockReturnValue(faker.internet.url())

      await expect(sut.getPointGeolocation()).rejects.toThrow(
        new Error('An error happened when trying to get point geolocation'),
      )
    })

    it('should return an error from conversion parse the JSON', async () => {
      jest
        .spyOn(httpService, 'get')
        .mockReturnValue(of({ data: faker.word.words() } as AxiosResponse))

      await expect(sut.getPointGeolocation()).rejects.toThrow(
        new Error(
          'An error happened when trying to parse the JSON - is not valid JSON - getPointGeolocation',
        ),
      )
    })
  })
})
