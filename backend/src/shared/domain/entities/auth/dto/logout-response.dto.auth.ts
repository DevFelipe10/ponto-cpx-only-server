import { ApiProperty } from '@nestjs/swagger'

export class LogoutResponseDto {
  constructor(message?: string) {
    this.message = message ?? this.message
  }

  @ApiProperty({ example: 'Sessão encerrada' })
  message: string = 'Sessão encerrada'
}
