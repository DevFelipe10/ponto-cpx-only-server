import { MarcacaoMistertDto } from './marcacao.mistert.dto'

export type MarcacaoMisterTProps = {
  Versao?: string
  MATRICULA: string
  DATA: string
  HORA: string
  FUSOHORAR: string
  IDEVENTO: number
  IPORIGEM: string
  LATITUDE: number
  LONGITUDE: number
  PRECISAO: number
  OBSREG?: string
  IsFacialValid: boolean
}

export class MarcacaoMisterT {
  constructor(props: MarcacaoMisterTProps) {
    this.Versao = props.Versao ?? '1.0'
    this.MATRICULA =
      props.MATRICULA.length === 0 || props.MATRICULA === undefined
        ? '9999'
        : props.MATRICULA
    this.DATA = props.DATA
    this.HORA = props.HORA
    this.FUSOHORAR = props.FUSOHORAR
    this.IDEVENTO = props.IDEVENTO
    this.IPORIGEM = props.IPORIGEM
    this.LATITUDE = props.LATITUDE
    this.LONGITUDE = props.LONGITUDE
    this.PRECISAO = props.PRECISAO
    this.OBSREG = props.OBSREG ?? 'API PONTOCPX'
    this.IsFacialValid = props.IsFacialValid
  }

  static fromDto(dto: MarcacaoMistertDto): MarcacaoMisterT {
    return new MarcacaoMisterT({ ...dto })
  }

  // setIsInsideGeofence(isInside: boolean): void {
  //   this.IsInsideGeofence = isInside
  // }

  Versao: string
  MATRICULA: string
  DATA: string
  HORA: string
  FUSOHORAR: string
  IDEVENTO: number
  IPORIGEM: string
  LATITUDE: number
  LONGITUDE: number
  PRECISAO: number
  OBSREG: string
  IsFacialValid: boolean
  // IsInsideGeofence: boolean = false
}
