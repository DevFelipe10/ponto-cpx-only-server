import { faker } from '@faker-js/faker'
import { SignAuthProps } from '../../entities/auth/dto/sign.dto.auth'

type Props = {
  username?: string
  password?: string
}

export function SigninDataBuilder(props: Props): SignAuthProps {
  return {
    username: props.username ?? faker.person.firstName(),
    password: props.password ?? faker.internet.password(),
  }
}
