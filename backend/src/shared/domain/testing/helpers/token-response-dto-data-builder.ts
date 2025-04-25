import { faker } from '@faker-js/faker'
import { TokenResponseDtoProps } from '../../entities/auth/dto/token-response.dto.auth'
import { UserTokenResponseDtoDataBuilder } from './user-token-response-dto-data-builder'

type Props = {
  token?: string
}

export function TokenResponseDataBuilder(props: Props): TokenResponseDtoProps {
  return {
    token:
      props.token ??
      faker.internet.jwt({
        payload: UserTokenResponseDtoDataBuilder({}),
      }),
  }
}
