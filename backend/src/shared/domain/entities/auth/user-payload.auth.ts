import { Role } from 'src/shared/domain/entities/roles/role.enum'

export class UserPayload {
  sub: number
  username: string
  role: Role
}
