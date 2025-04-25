import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export type ResultPointRegisterMisterTProps = {
  Success: boolean
  ErrorMsg: string
}

export class ResultPointRegisterMisterT {
  constructor(props: ResultPointRegisterMisterTProps) {
    this.Success = props.Success
    this.ErrorMsg = props.ErrorMsg
  }

  @ApiProperty()
  Success: boolean

  @ApiPropertyOptional()
  ErrorMsg: string
}
