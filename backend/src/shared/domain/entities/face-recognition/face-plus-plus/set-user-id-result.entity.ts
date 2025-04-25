import { ResultFaceRecognition } from './result-face-recognition.entity'

export class SetUserIdResultEntity extends ResultFaceRecognition<any> {
  public readonly user_id: string
  public readonly face_token: string

  constructor(
    request_id?: string,
    time_used?: number,
    user_id?: string,
    face_token?: string,
    props?: any,
  ) {
    super(props, request_id, time_used)
    this.user_id = user_id
    this.face_token = face_token
  }
}

export class SetUserIdResultFactory {
  static create(setUserIdResult: SetUserIdResultEntity): SetUserIdResultEntity {
    return new SetUserIdResultEntity(
      setUserIdResult.request_id,
      setUserIdResult.time_used,
      setUserIdResult.user_id,
      setUserIdResult.face_token,
      setUserIdResult.props,
    )
  }
}
