import { Injectable } from '@nestjs/common'
import * as turf from '@turf/turf'
import { MistertService } from 'src/face-recognition/infrastructure/mistert/mistert.service'

@Injectable()
export class GeofenceService {
  constructor(private readonly mistertService: MistertService) {}

  async isInsideCircle(latitude: number, longitude: number): Promise<boolean> {
    // Buscar os pontos de geolocalização no MT
    const geolocations = await this.mistertService.getPointGeolocation()

    const point: [number, number] = [latitude, longitude]

    const pontoGeolocation = geolocations.find(value => {
      const radius = value.raio
      const center = [value.latitude, value.longitude]

      const pt = turf.point(point)
      const circle = turf.circle(center, radius, { units: 'meters' })

      const res = turf.booleanPointInPolygon(pt, circle)

      if (res) {
        return value
      }
    })

    return pontoGeolocation === undefined ? false : true
  }
}
