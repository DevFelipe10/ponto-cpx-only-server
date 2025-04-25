import api from '@/api'
import { AxiosError, HttpStatusCode } from 'axios'

export class TokenResponse {
  token?: string
  message?: string
  error?: string
  statusCode?: HttpStatusCode
}

export class ApiResponse {
  message?: string
  error?: string
  statusCode?: HttpStatusCode
}

export class Profile {
  sub?: number
  username?: string
  role?: string
  iat?: bigint
  exp?: bigint
}

export class ProfileResponse {
  error?: ApiResponse
  data?: Profile
}

export const useApiAuth = () => {
  const env = import.meta.env

  // const getTokenRegistroPonto = async () =>
  //   await getToken(env.VITE_API_USERNAME, env.VITE_API_PASSWORD)

  // const getConfgiMisterT = async () => {
  //   // Faz o request
  //   const { data } = await api
  //     .get<ResponseApi<ResultGetConfig>>(
  //       `${env.VITE_API_URL_MISTERT}/config`,
  //       {},
  //     )
  //     .then(response => response)
  //     .catch((err: AxiosError<ResponseApi<ResultGetConfig>>) => err.response!)

  //   return data
  // }

  const getToken = async (username: string, password: string) => {
    const { data } = await api
      .post<TokenResponse>(
        `${env.VITE_API_URL_AUTH}/login`,
        { username: username, password: password },
        { withCredentials: true }, // Envia e recebe cookies automaticamente
      )
      .then(res => {
        return res
      })

    return data
  }

  const logout = async () => {
    const { data } = await api
      .get<ApiResponse>(`${env.VITE_API_URL_AUTH}/logout`)
      .then(res => res)
      .catch((err: AxiosError<ApiResponse>) => err.response!)

    return data
  }

  const getProfile = async () => {
    const profileResponse = new ProfileResponse()

    await api
      .get<Profile>(`${env.VITE_API_URL_AUTH}/profile`)
      .then(res => (profileResponse.data = res.data))
      .catch((err: AxiosError<ApiResponse>) => {
        profileResponse.error = err.response!.data
      })

    return profileResponse
  }

  return {
    getToken,
    // getTokenRegistroPonto,
    // getConfgiMisterT,
    logout,
    getProfile,
  }
}
