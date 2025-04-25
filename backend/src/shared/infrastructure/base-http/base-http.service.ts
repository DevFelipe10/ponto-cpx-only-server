import { Injectable } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { AxiosHeaders } from 'axios'

@Injectable()
export class BaseHttpService {
  constructor(protected readonly httpService: HttpService) {}

  protected getHeaders(extraHeaders?: AxiosHeaders) {
    return new AxiosHeaders({
      'Content-Type': 'application/json',
      ...extraHeaders,
    })
  }

  protected async get<T = any>(
    url: string,
    extraHeaders?: AxiosHeaders,
    params?: any,
  ) {
    const response = await this.httpService.axiosRef.get<T>(url, {
      headers: this.getHeaders(extraHeaders),
      params: params,
    })
    return response
  }

  protected async post<T = any>(
    url: string,
    data: any,
    extraHeaders?: AxiosHeaders,
    params?: any,
  ) {
    const response = await this.httpService.axiosRef.post<T>(url, data, {
      headers: this.getHeaders(extraHeaders),
      params: params,
    })
    return response
  }
}
