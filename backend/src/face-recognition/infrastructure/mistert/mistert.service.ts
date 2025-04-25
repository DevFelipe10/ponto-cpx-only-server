import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { catchError, firstValueFrom } from 'rxjs'
import { EnvConfigService } from 'src/shared/infrastructure/env-config/env-config.service'
import iconv from 'iconv-lite'
import {
  MisterTOperations,
  RequestMisterT,
  ResultGetConfig,
  ResultGetConfigProps,
} from './interfaces'
import {
  UserAuth,
  UserAuthProps,
} from 'src/shared/domain/entities/auth/user.auth'
import { MarcacaoMisterT } from 'src/face-recognition/domain/entities/mistert/marcacao.mistert'
import {
  ResultPointRegisterMisterT,
  ResultPointRegisterMisterTProps,
} from 'src/face-recognition/domain/entities/mistert/result-point-register.mistert'
import {
  PontoGeolocation,
  PontoGeolocationProps,
} from 'src/face-recognition/domain/entities/mistert/ponto-geolocation.mistert'

@Injectable()
export class MistertService {
  constructor(
    private readonly httpService: HttpService,
    private readonly envConfigService: EnvConfigService,
  ) {}

  private parameterToJson(
    operation: MisterTOperations,
    marcacao?: MarcacaoMisterT,
  ): string {
    const parameterMT = <RequestMisterT>{
      Op: operation,
      Marcacao: marcacao,
    }

    return Buffer.from(JSON.stringify(parameterMT)).toString('base64')
  }

  private convertFromBinaryToJson<R>(binaryData: string) {
    // Converter binary para latin1 removendo � da string
    const dataLatin1 = Buffer.from(binaryData, 'binary')

    // Decode de latin1 to utf8 format
    const dataUtf8 = iconv.decode(dataLatin1, 'latin1')

    return JSON.parse(dataUtf8) as R
  }

  // Chamar o endpoint de configuração do MisterT para o webponto
  async getConfig(): Promise<ResultGetConfig> {
    const { data } = await firstValueFrom(
      this.httpService
        .get<string>(`${this.envConfigService.getMisterTBaseUrl()}`, {
          // Definir tipo binary e evita conversões incorretas
          responseType: 'arraybuffer',
          responseEncoding: 'utf-8',
          params: {
            SS: 'v3m4q8r2u9b7e3p7m5w9b4h2w5n2h7',
            NH: '-1',
            P: this.parameterToJson(MisterTOperations.GET_SETUP),
          },
        })
        .pipe(
          catchError(error => {
            throw new Error(
              'An error happened when trying to get the webponto configuration',
            )
          }),
        ),
    )

    try {
      const dataJson = this.convertFromBinaryToJson<ResultGetConfigProps>(data)

      return new ResultGetConfig(dataJson)
    } catch (e) {
      throw new Error(
        'An error happened when trying to parse the JSON - is not valid JSON - getConfigMisterT()',
      )
    }
  }

  async getUsersApi(): Promise<UserAuth[]> {
    const { data } = await firstValueFrom(
      this.httpService
        .get<string>(`${this.envConfigService.getMisterTBaseUrl()}`, {
          // Definir tipo binary e evita conversões incorretas
          responseType: 'arraybuffer',
          responseEncoding: 'utf-8',
          params: {
            SS: 'c4z6h3x4s3b8p9k3t2x3s6g5q8g3t4',
            NH: '-1',
          },
        })
        .pipe(
          catchError(error => {
            throw new Error('An error happened when trying to getUsersApi()')
          }),
        ),
    )

    try {
      const dataJson = this.convertFromBinaryToJson<UserAuthProps[]>(data)

      return dataJson.map(value => new UserAuth(value))
    } catch (e) {
      throw new Error(
        'An error happened when trying to parse the JSON - is not valid JSON - getUsersApi()',
      )
    }
  }

  async pointRegisterMisterT(
    marcacao: MarcacaoMisterT,
  ): Promise<ResultPointRegisterMisterT> {
    const { data } = await firstValueFrom(
      this.httpService
        .get<string>(`${this.envConfigService.getMisterTBaseUrl()}`, {
          // Definir tipo binary e evita conversões incorretas
          responseType: 'arraybuffer',
          responseEncoding: 'utf-8',
          params: {
            SS: 'v3m4q8r2u9b7e3p7m5w9b4h2w5n2h7',
            NH: '-1',
            P: this.parameterToJson(MisterTOperations.REGISTER_POINT, marcacao),
          },
        })
        .pipe(
          catchError(error => {
            throw new Error('An error happened when trying to register point')
          }),
        ),
    )

    try {
      console.log(
        'teste: ' +
          this.parameterToJson(MisterTOperations.REGISTER_POINT, marcacao),
      )

      const dataJson =
        this.convertFromBinaryToJson<ResultPointRegisterMisterTProps>(data)

      return new ResultPointRegisterMisterT(dataJson)
    } catch (e) {
      throw new Error(
        'An error happened when trying to parse the JSON - is not valid JSON - pointRegisterMisterT',
      )
    }
  }

  async getPointGeolocation(): Promise<PontoGeolocation[]> {
    const { data } = await firstValueFrom(
      this.httpService
        .get<string>(`${this.envConfigService.getMisterTBaseUrl()}`, {
          responseType: 'arraybuffer',
          responseEncoding: 'utf-8',
          params: {
            SS: 'x2t2p2c7u6d2v5d4g5x6h5v2d4e5d6',
            NH: '-1',
          },
        })
        .pipe(
          catchError(error => {
            throw new Error(
              'An error happened when trying to get point geolocation',
            )
          }),
        ),
    )

    try {
      const dataJson =
        this.convertFromBinaryToJson<PontoGeolocationProps[]>(data)

      return dataJson.map(value => new PontoGeolocation(value))
    } catch (e) {
      throw new Error(
        'An error happened when trying to parse the JSON - is not valid JSON - getPointGeolocation',
      )
    }
  }
}
