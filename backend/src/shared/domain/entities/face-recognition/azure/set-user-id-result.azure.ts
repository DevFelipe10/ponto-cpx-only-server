import { ResultAzure } from './result.azure'

export class SetUserIdResultAzure extends ResultAzure {
  public readonly user_id: string
  public readonly face_token: string

  constructor(
    request_id?: string,
    time_used?: number,
    user_id?: string,
    face_token?: string,
  ) {
    super(request_id, time_used)
    this.user_id = user_id
    this.face_token = face_token
  }
}

export class SetUserIdResultAzureFactory {
  static create(setUserIdResult: SetUserIdResultAzure): SetUserIdResultAzure {
    return new SetUserIdResultAzure(
      setUserIdResult.request_id,
      setUserIdResult.time_used,
      setUserIdResult.user_id,
      setUserIdResult.face_token,
    )
  }
}
