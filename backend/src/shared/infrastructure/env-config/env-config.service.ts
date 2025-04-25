import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { EnvConfig } from './env-config.interface'
import { ConfigService } from '@nestjs/config'
import { join } from 'path'

@Injectable()
export class EnvConfigService implements EnvConfig {
  constructor(private configService: ConfigService) {}

  getAppPort(): number {
    const str = Number(this.configService.get<number>('PORT'))

    if (str === undefined) {
      throw new InternalServerErrorException('config getAppPort() is undefined')
    }

    return str
  }
  getNodeEnv(): string {
    const str = this.configService.get<string>('NODE_ENV')

    if (str === undefined) {
      throw new InternalServerErrorException('config getNodeEnv() is undefined')
    }

    return str
  }

  // JWT
  getJwtSecret(): string {
    const str = this.configService.get<string>('JWT_SECRET')

    console.log('teste: ' + join(process.cwd(), `.env.${process.env.NODE_ENV}`))

    if (str === undefined) {
      throw new InternalServerErrorException(
        'config getJwtSecret() is undefined',
      )
    }

    return str
  }
  getJwtExpiresIn(): string {
    const str = this.configService.get<string>('JWT_EXPIRES_IN')

    if (str === undefined) {
      throw new InternalServerErrorException(
        'config getJwtExpiresIn() is undefined',
      )
    }

    return str
  }

  // MISTER T
  getMisterTBaseUrl(): string {
    const str = this.configService.get<string>('MISTER_T_BASE_URL')

    if (str === undefined) {
      throw new InternalServerErrorException(
        'config getMisterTBaseUrl() is undefined',
      )
    }

    return str
  }

  // FACE++
  getFaceppBaseUrl(): string {
    const str = this.configService.get<string>('FACEPP_BASE_URL')

    if (str === undefined) {
      throw new InternalServerErrorException(
        'config getFaceppBaseUrl() is undefined',
      )
    }

    return str
  }
  getFaceppApiKey(): string {
    const str = this.configService.get<string>('FACEPP_API_KEY')

    if (str === undefined) {
      throw new InternalServerErrorException(
        'config getFaceppApiKey() is undefined',
      )
    }

    return str
  }
  getFaceppApiSecret(): string {
    const str = this.configService.get<string>('FACEPP_API_SECRET')

    if (str === undefined) {
      throw new InternalServerErrorException(
        'config getFaceppApiSecret() is undefined',
      )
    }

    return str
  }
  getFaceppListId(): string {
    const str = this.configService.get<string>('FACEPP_FACE_LIST_ID')

    if (str === undefined) {
      throw new InternalServerErrorException(
        'config getFaceppListId() is undefined',
      )
    }

    return str
  }

  // AZURE
  getAzureBaseUrl(): string {
    const str = this.configService.get<string>('AZURE_BASE_URL')

    if (str === undefined) {
      throw new InternalServerErrorException(
        'config getAzureBaseUrl() is undefined',
      )
    }

    return str
  }
  getAzureApiKey(): string {
    const str = this.configService.get<string>('AZURE_API_KEY')

    if (str === undefined) {
      throw new InternalServerErrorException(
        'config getAzureApiKey() is undefined',
      )
    }

    return str
  }

  // OPENCV
  getOpencvBaseUrl(): string {
    const str = this.configService.get<string>('OPENCV_BASE_URL')

    if (str === undefined) {
      throw new InternalServerErrorException(
        'config getOpencvBaseUrl() is undefined',
      )
    }

    return str
  }
  getOpencvApiKey(): string {
    const str = this.configService.get<string>('OPENCV_API_KEY')

    if (str === undefined) {
      throw new InternalServerErrorException(
        'config getOpencvApiKey() is undefined',
      )
    }

    return str
  }
  getOpencvMinScoreFace(): number {
    const str = this.configService.get<number>('OPENCV_MIN_SCORE_FACE')

    if (str === undefined) {
      throw new InternalServerErrorException(
        'config getMinimumScoreSearch() is undefined',
      )
    }

    return str
  }
}
