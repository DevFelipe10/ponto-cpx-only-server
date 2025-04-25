import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class MarcacaoMistertDto {
  @ApiProperty()
  MATRICULA: string

  @ApiProperty()
  @IsNotEmpty()
  DATA: string

  @ApiProperty()
  @IsNotEmpty()
  HORA: string

  @ApiProperty()
  @IsNotEmpty()
  FUSOHORAR: string

  @ApiProperty()
  @IsNotEmpty()
  IDEVENTO: number

  @ApiProperty()
  @IsNotEmpty()
  IPORIGEM: string

  @ApiProperty()
  @IsNotEmpty()
  LATITUDE: number

  @ApiProperty()
  @IsNotEmpty()
  LONGITUDE: number

  @ApiProperty()
  @IsNotEmpty()
  PRECISAO: number

  @ApiProperty()
  @IsNotEmpty()
  IsFacialValid: boolean
}
