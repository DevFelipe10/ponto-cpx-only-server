import { faker } from '@faker-js/faker'
import { ResultPointRegisterMisterTProps } from '../../entities/mistert/result-point-register.mistert'

export type Props = {
  Success?: boolean
  ErrorMsg?: string
}

export function ResultPointRegisterMisterTDataBuilder(
  props: Props,
): ResultPointRegisterMisterTProps {
  return {
    Success: props.Success ?? faker.datatype.boolean(),
    ErrorMsg: props.ErrorMsg ?? faker.lorem.sentence(),
  }
}
