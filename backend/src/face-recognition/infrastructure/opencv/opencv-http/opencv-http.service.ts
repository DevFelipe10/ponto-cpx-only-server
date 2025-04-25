import { Injectable } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { BaseHttpService } from 'src/shared/infrastructure/base-http/base-http.service'
import { EnvConfigService } from 'src/shared/infrastructure/env-config/env-config.service'
import { AxiosHeaders } from 'axios'

@Injectable()
export class OpencvHttpService extends BaseHttpService {
  private readonly apiKey: string

  constructor(
    httpService: HttpService,
    private readonly envConfigService: EnvConfigService,
  ) {
    super(httpService)
    this.apiKey = this.envConfigService.getOpencvApiKey()
  }

  private header() {
    return new AxiosHeaders({ 'X-API-KEY': this.apiKey })
  }

  async get<T = any>(url: string, params?: any) {
    return super.get<T>(url, this.header(), params)
  }

  async post<T = any>(url: string, data: any) {
    return await super.post<T>(url, data, this.header())
  }
}
