import { faker } from '@faker-js/faker'
import { Role } from '../../entities/roles/role.enum'
import { UserAuthProps } from '../../entities/auth/user.auth'

export type Props = {
  id?: number
  username?: string
  password?: string
  role?: Role
}

export function UserAuthDataBuilder(props: Props): UserAuthProps {
  return {
    id: props.id ?? faker.number.int(),
    username: props.username ?? faker.person.firstName(),
    password: props.password ?? faker.internet.password(),
    role: props.role ?? faker.helpers.enumValue(Role),
  }
}
