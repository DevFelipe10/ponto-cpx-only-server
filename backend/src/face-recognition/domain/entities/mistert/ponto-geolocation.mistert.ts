export type PontoGeolocationProps = {
  id: number
  local: string
  latitude: string
  longitude: string
  raio: string
}

export class PontoGeolocation {
  constructor(props: PontoGeolocationProps) {
    this.id = props.id
    this.local = props.local
    this.latitude = parseFloat(props.latitude)
    this.longitude = parseFloat(props.longitude)
    this.raio = parseFloat(props.raio)
  }

  id: number
  local: string
  latitude: number
  longitude: number
  raio: number
}
