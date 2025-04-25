import { Test, TestingModule } from '@nestjs/testing'
import { OpencvService } from '../../opencv.service'
import { faker } from '@faker-js/faker/.'

describe('OpencvService unit tests', () => {
  let sut: OpencvService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OpencvService],
    }).compile()

    sut = module.get<OpencvService>(OpencvService)
  })

  it('should be defined', () => {
    expect(sut).toBeDefined()
  })

  it('should be wrap base64 encode', () => {
    const base64 = faker.image.dataUri({ type: 'svg-base64' })

    const result = sut.wrapBase64(base64)

    expect(result).not.toContain('data:image/svg+xml;base64,')
  })
})
