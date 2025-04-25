import { faker } from '@faker-js/faker'
import { PontoGeolocationProps } from '../../entities/mistert/ponto-geolocation.mistert'

export type Props = {
  id?: number
  local?: string
  latitude?: string
  longitude?: string
  raio?: string
}

export function PontoGeolocationMisterTDataBuilder(
  props: Props,
): PontoGeolocationProps {
  return {
    id: props.id ?? faker.number.int({ min: 1, max: 100 }),
    local: props.local ?? faker.location.city(),
    latitude: props.latitude ?? faker.location.latitude().toString(),
    longitude: props.longitude ?? faker.location.longitude().toString(),
    raio: props.raio ?? faker.number.float({ max: 100 }).toString(),
  }
}
