import { ApiProperty } from '@nestjs/swagger'

export type TokenResponseDtoProps = {
  token: string
}

export class TokenResponseDto {
  constructor(props: TokenResponseDtoProps) {
    this.token = props.token
  }

  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IjEwMCwid2l0aHViOiIxMjM2ODk5ODM5ODMifQ..',
  })
  token: string
}
