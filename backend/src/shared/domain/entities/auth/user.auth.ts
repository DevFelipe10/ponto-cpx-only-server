import { Role } from 'src/shared/domain/entities/roles/role.enum'

export type UserAuthProps = {
  id: number
  username: string
  password: string
  role: Role
}
export class UserAuth {
  constructor(props: UserAuthProps) {
    this.id = props.id
    this.username = props.username
    this.password = props.password
    this.role = props.role
  }

  id: number
  username: string
  password: string
  role: Role
}
