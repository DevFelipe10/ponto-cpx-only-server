import { ApiProperty } from '@nestjs/swagger'
import { Role } from 'src/shared/domain/entities/roles/role.enum'

export type UserTokenResponseDtoProps = {
  sub: number
  username: string
  role: Role
  iat: number
  exp: number
}

export class UserTokenResponseDto {
  constructor(props: UserTokenResponseDtoProps) {
    this.sub = props.sub
    this.username = props.username
    this.role = props.role
    this.iat = props.iat
    this.exp = props.exp
  }

  @ApiProperty({ example: 1 })
  sub: number

  @ApiProperty({ example: 'admin' })
  username: string

  @ApiProperty({ example: Role.ADMIN })
  role: Role

  @ApiProperty({ example: 1740595330 })
  iat: number

  @ApiProperty({ example: 1740598930 })
  exp: number
}
