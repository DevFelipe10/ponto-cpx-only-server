import { FaceRectangle } from 'src/face-recognition/domain/entities/face-plus-plus/face-rectangle.facepp.'
import { ResultFaceRecognition } from './result-face-recognition.entity'

export type FaceSet = {
  faceset_token: string
  outer_id: string
  tags: string[]
}

export class GetDetailResultEntity extends ResultFaceRecognition<any> {
  public readonly user_id: string
  public readonly image_id: string
  public readonly face_rectangle: FaceRectangle
  public readonly facesets: FaceSet[]
  public readonly face_token: string

  constructor(
    user_id?: string,
    time_used?: number,
    request_id?: string,
    image_id?: string,
    face_rectangle?: FaceRectangle,
    facesets?: FaceSet[],
    face_token?: string,
    props?: any,
  ) {
    super(props, request_id, time_used)
    this.user_id = user_id
    this.image_id = image_id
    this.face_rectangle = face_rectangle
    this.facesets = facesets
    this.face_token = face_token
  }
}

export class GetPersonResultEntityFactory {
  static create(entity: GetDetailResultEntity): GetDetailResultEntity {
    return new GetDetailResultEntity(
      entity.request_id,
      entity.time_used,
      entity.user_id,
      entity.image_id,
      entity.face_rectangle,
      entity.facesets,
      entity.face_token,
      entity.props,
    )
  }
}
