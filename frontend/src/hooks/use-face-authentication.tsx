import { AxiosError, AxiosResponse } from 'axios'
import { ResponseApi } from './use-mistert'
import api from '@/api'

export type FaceAuthenticateResponse = { confidence: number; userid: string }

export type SearchPersonResponse = {
  totalPages: number
  total: number
  count: number
  persons: {
    id: string
    name: string
    create_date: string
    modified_date: string
  }[]
}

export const useFaceAuthentication = () => {
  const env = import.meta.env

  const faceRegister = async (registrationId: string, imageSrc: string) => {
    const { data } = await api
      .post<ResponseApi>(
        `${env.VITE_API_URL_FACE_AUTHENTICATION}/faceregister`,
        { userid: registrationId, image_base64: imageSrc },
      )
      // .then((value: AxiosResponse<ResponseAddFace>) => value.data)
      .catch((err: AxiosError<ResponseApi>) => err.response!)

    return data
  }

  const faceAuthenticate = async (userId: string, imageSrc: string) => {
    const res = await api
      .post<ResponseApi<FaceAuthenticateResponse>>(
        `${env.VITE_API_URL_FACE_AUTHENTICATION}/faceauthenticate`,
        { userId: userId, imageBase64: imageSrc },
      )
      .then(
        (value: AxiosResponse<ResponseApi<FaceAuthenticateResponse>>) =>
          value.data,
      )
      .catch(
        (error: AxiosError<ResponseApi<FaceAuthenticateResponse>>) =>
          error.response?.data as ResponseApi<FaceAuthenticateResponse>,
      )

    return res
  }

  const searchPersons = async (page: number = 1, limit: number = 10) => {
    const { data } = await api.get<SearchPersonResponse>(
      `${env.VITE_API_URL_FACE_AUTHENTICATION}/searchpersons`,
      { params: { page: page, limit: limit } },
    )

    return data
  }

  return { faceAuthenticate, faceRegister, searchPersons }
}
