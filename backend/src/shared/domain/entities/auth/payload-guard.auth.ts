import { Role } from 'src/shared/domain/entities/roles/role.enum'

export class PayloadGuardAuth {
  sub: number
  username: string
  role: Role
  iat: number
  exp: number
}
