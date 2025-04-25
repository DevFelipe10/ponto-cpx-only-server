import { faker } from '@faker-js/faker'
import { MarcacaoMisterTProps } from '../../entities/mistert/marcacao.mistert'

export type Props = {
  Versao?: string
  MATRICULA?: string
  DATA?: string
  HORA?: string
  FUSOHORAR?: string
  IDEVENTO?: number
  IPORIGEM?: string
  LATITUDE?: number
  LONGITUDE?: number
  PRECISAO?: number
  OBSREG?: string
  IsFacialValid?: boolean
}

export function MarcacaoMisterTDataBuilder(props: Props): MarcacaoMisterTProps {
  return {
    Versao: props.Versao ?? faker.string.numeric({ length: 2 }),
    MATRICULA: props.MATRICULA ?? faker.string.numeric({ length: 8 }),
    DATA: props.DATA ?? faker.date.past().toISOString().split('T')[0],
    HORA: props.HORA ?? faker.date.past().toLocaleTimeString(),
    FUSOHORAR: props.FUSOHORAR ?? faker.string.numeric({ length: 4 }),
    IDEVENTO: props.IDEVENTO ?? faker.number.int({ min: 1, max: 100 }),
    IPORIGEM: props.IPORIGEM ?? faker.internet.ip(),
    LATITUDE: props.LATITUDE ?? faker.location.latitude(),
    LONGITUDE: props.LONGITUDE ?? faker.location.longitude(),
    PRECISAO: props.PRECISAO ?? faker.number.float(),
    OBSREG: props.OBSREG ?? faker.word.words(),
    IsFacialValid: faker.datatype.boolean(),
  }
}
