import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export type SignAuthProps = {
  username: string
  password: string
}

export class SignInDto {
  constructor(username: string, password: string) {
    this.username = username
    this.password = password
  }

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  username: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string
}
