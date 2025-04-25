import { HttpStatus } from '@nestjs/common'
import {
  ApiExtraModels,
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger'
import { IsOptional } from 'class-validator'

@ApiExtraModels()
export class ResponseApi {
  @ApiProperty({
    examples: [HttpStatus.OK, HttpStatus.BAD_REQUEST],
  })
  status: number

  @ApiPropertyOptional({
    examples: [
      'MisterT setup fetched successfully',
      'Error getting MisterT setup',
    ],
  })
  @IsOptional()
  message?: string

  @ApiPropertyOptional({ examples: ['error'] })
  error: string

  @ApiPropertyOptional({ type: Object })
  data?: any
}
