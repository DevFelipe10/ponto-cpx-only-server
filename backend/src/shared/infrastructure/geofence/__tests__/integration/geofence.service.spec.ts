import { Test, TestingModule } from '@nestjs/testing'
import { GeofenceService } from '../../geofence.service'
import { faker } from '@faker-js/faker/.'
import { MistertModule } from 'src/face-recognition/infrastructure/mistert/mistert.module'

describe('GeofenceService', () => {
  let sut: GeofenceService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MistertModule],
      providers: [GeofenceService],
    }).compile()

    sut = module.get<GeofenceService>(GeofenceService)
  })

  it('should be defined', () => {
    expect(sut).toBeDefined()
  })

  it('should be geolocation inside in geofence', async () => {
    const lat = -23.56234617883095
    const long = -46.69077163688083

    const result = await sut.isInsideCircle(lat, long)

    expect(result).toBe(true)
  })

  it('should not be geolocation inside in geofence', async () => {
    const lat = faker.location.latitude()
    const long = faker.location.longitude()

    const result = await sut.isInsideCircle(lat, long)

    expect(result).toBe(false)
  })
})
