import { Injectable } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { firstValueFrom } from 'rxjs'
import { ApiClient } from './api-client.interface'

@Injectable()
export class ApiService implements ApiClient {
  constructor(private readonly httpService: HttpService) {}

  async get<T>(url: string, headers: any = {}): Promise<T> {
    const response = await firstValueFrom(
      this.httpService.get<T>(url, { headers }),
    )
    return response.data
  }

  async post<T>(url: string, body: any, headers: any = {}): Promise<T> {
    const response = await firstValueFrom(
      this.httpService.post<T>(url, body, { headers }),
    )
    return response.data
  }

  async put<T>(url: string, body: any, headers: any = {}): Promise<T> {
    const response = await firstValueFrom(
      this.httpService.put<T>(url, body, { headers }),
    )
    return response.data
  }
}
