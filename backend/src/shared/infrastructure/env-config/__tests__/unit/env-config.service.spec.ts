import { Test, TestingModule } from '@nestjs/testing'
import { EnvConfigService } from '../../env-config.service'
import { EnvConfigModule } from '../../env-config.module'

describe('EnvConfigService unit tests', () => {
  let sut: EnvConfigService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [EnvConfigModule.forRoot()],
      providers: [EnvConfigService],
    }).compile()

    sut = module.get<EnvConfigService>(EnvConfigService)
  })

  it('should be defined', () => {
    expect(sut).toBeDefined()
  })

  it('should return the variable PORT', () => {
    expect(sut.getAppPort()).toBe(3000)
  })

  it('should return the variable NODE_ENV', () => {
    expect(sut.getNodeEnv()).toBe('test')
  })

  describe('Azure Configuration', () => {
    it('should return the Azure Api Key', () => {
      expect(sut.getAzureApiKey()).toBe('123')
    })

    it('should return the Azure Base URL', () => {
      expect(sut.getAzureBaseUrl()).toBe('https://azure.example')
    })
  })

  describe('Face++ Configuration', () => {
    it('should return the Face++ Api Key', () => {
      expect(sut.getFaceppApiKey()).toBe('123')
    })

    it('should return the Face++ Api Secret', () => {
      expect(sut.getFaceppApiSecret()).toBe('321')
    })

    it('should return the Face++ List Id', () => {
      expect(sut.getFaceppListId()).toBe('listid')
    })

    it('should return the Face++ Base URL', () => {
      expect(sut.getFaceppBaseUrl()).toBe('https://faceplusplus.example')
    })
  })

  describe('JWT Configuration', () => {
    it('should return the JWT expiresIn', () => {
      expect(sut.getJwtExpiresIn()).toBe('1h')
    })

    it('should return the JWT Secret', () => {
      expect(sut.getJwtSecret()).toBe('123')
    })
  })

  describe('MisterT Configuration', () => {
    it('should return the MisterT Base URL', () => {
      expect(sut.getMisterTBaseUrl()).toBe(
        'http://andregarcia73.ddns.net:8088/MisterT.asp',
      )
    })
  })

  describe('OpenCV Configuration', () => {
    it('should return the OpenCV Api Key', () => {
      expect(sut.getOpencvApiKey()).toBe('123')
    })

    it('should return the OpenCV Base URL', () => {
      expect(sut.getOpencvBaseUrl()).toBe('https://opencv.example')
    })

    it('should return the OpenCV Minimum Score Face', () => {
      expect(sut.getOpencvMinScoreFace()).toBe('0.95')
    })
  })
})
