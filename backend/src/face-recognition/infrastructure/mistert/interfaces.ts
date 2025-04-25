import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { MarcacaoMisterT } from 'src/face-recognition/domain/entities/mistert/marcacao.mistert'

export enum MisterTOperations {
  GET_SETUP = 'GetSetup',
  REGISTER_POINT = 'ExecutaMarcacao',
}

export class EventoGetSetup {
  @ApiProperty({ example: 2 })
  ID: number

  @ApiProperty({ example: 1 })
  IDDM: number

  @ApiProperty({ example: 2 })
  IDTIPOPON: number

  @ApiProperty({ example: 1 })
  SEQUENCIA: string

  @ApiProperty({ example: 'Entrada Manhã' })
  DESCRICAO: string

  @ApiProperty({ example: '' })
  OBSGER: string

  @ApiProperty({ example: 'S' })
  SEAPLICARP: string

  @ApiProperty({ example: 'S' })
  SEAPLICADF: string

  @ApiProperty({ example: 'S' })
  EXIBENOSRE: string

  @ApiProperty({ example: 'S' })
  PODEUSAR: string
}

export class FormatoRel {
  @ApiProperty({ example: 2 })
  ID: number

  @ApiProperty({ example: 1 })
  IDDM: number

  @ApiProperty({ example: '9999' })
  SEQUENCIA: string

  @ApiProperty({ example: 'Relógio Facial' })
  DESCRICAO: string

  @ApiProperty({ example: 'N' })
  EXDESCRI: string

  @ApiProperty({ example: 1 })
  IDFUSOHOR: number

  @ApiProperty({ example: 'N' })
  EXFUSOHOR: string

  @ApiProperty({ example: 'N' })
  EXHORVERAO: string

  @ApiProperty({ example: 1 })
  IDREGDIA: number

  @ApiProperty({ example: 'N' })
  EXREGDIA: string

  @ApiProperty({ example: 'N' })
  HSREGDIA: string

  @ApiProperty({ example: 2 })
  IDEVENTO: number

  @ApiProperty({ example: 'S' })
  EXEVENTO: string

  @ApiProperty({ example: 'N' })
  HSEVENTO: string

  @ApiProperty({ example: 1 })
  IDFATOR: number

  @ApiProperty({ example: 'N' })
  EXFATOR: string

  @ApiProperty({ example: 'N' })
  HSFATOR: string

  @ApiProperty({ example: 2 })
  IDORIGEM: number

  @ApiProperty({ example: 'N' })
  EXORIGEM: string

  @ApiProperty({ example: 'N' })
  HSORIGEM: string

  @ApiProperty({ example: 2 })
  IDIPORIGEM: number

  @ApiProperty({ example: 'N' })
  EXIPORIGEM: string

  @ApiProperty({ example: '594924290120251508202652355327' })
  CHAVE: string

  @ApiProperty({ example: '' })
  OBSGER: string

  @ApiProperty({ example: 'S' })
  PODEUSAR: string
}

export type ResultGetConfigProps = {
  Success: boolean
  ErrorMsg: string
  Versao: string
  URL_Img_Logo: string
  FormatoRel: FormatoRel
  HasMatricula?: boolean
  Eventos: EventoGetSetup[]
}

export class ResultGetConfig {
  constructor(props: ResultGetConfigProps) {
    this.Success = props.Success
    this.ErrorMsg = props.ErrorMsg
    this.Versao = props.Versao
    this.URL_Img_Logo = props.URL_Img_Logo
    this.FormatoRel = props.FormatoRel
    this.HasMatricula = props.HasMatricula
    this.Eventos = props.Eventos
  }

  @ApiProperty({ example: true })
  Success: boolean

  @ApiProperty({ example: '' })
  ErrorMsg: string

  @ApiProperty({ example: 'v1.0.0' })
  Versao: string

  @ApiProperty({ example: 'https://example.com/logo.png' })
  URL_Img_Logo: string

  @ApiProperty({ type: FormatoRel })
  FormatoRel: FormatoRel

  @ApiProperty({ example: true })
  HasMatricula?: boolean

  @ApiProperty({ type: [EventoGetSetup] })
  Eventos: EventoGetSetup[]
}

export type RequestMisterT = {
  Op: MisterTOperations
  Marcacao: MarcacaoMisterT
}
