import { faker } from '@faker-js/faker'
import { UserTokenResponseDtoProps } from '../../entities/auth/dto/user-token-reponse.dto.auth'
import { Role } from '../../entities/roles/role.enum'

type Props = {
  sub?: number
  username?: string
  role?: Role
  iat?: number
  exp?: number
}

export function UserTokenResponseDtoDataBuilder(
  props: Props,
): UserTokenResponseDtoProps {
  return {
    sub: props.sub ?? faker.number.int(),
    username: props.username ?? faker.person.firstName(),
    role: props.role ?? faker.helpers.enumValue(Role),
    iat: props.iat ?? faker.date.recent().getTime(),
    exp: props.exp ?? faker.date.future().getTime(),
  }
}
