import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsNumberString } from 'class-validator'

export class BodyFaceppDto {
  @ApiProperty()
  @IsNotEmpty()
  imageBase64: string

  @ApiProperty()
  // @IsNotEmpty()
  userId: string
}

export class ResultSearchFaceDto {
  @ApiProperty({ example: 98.53 })
  @IsNotEmpty()
  confidence: number

  @ApiProperty({ example: '123' })
  @IsNotEmpty()
  userid: string
}

export class PageQueryDto {
  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumberString()
  page: string

  @ApiProperty({ example: 10 })
  @IsNotEmpty()
  @IsNumberString()
  limit: string
}
