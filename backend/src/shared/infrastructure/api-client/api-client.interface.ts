export interface ApiClient {
  get<T>(url: string, headers?: any): Promise<T>
  post<T>(url: string, body: any, headers?: any): Promise<T>
  put<T>(url: string, body: any, headers?: any): Promise<T>
}
