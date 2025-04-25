import { FaceRectangle } from 'src/face-recognition/domain/entities/face-plus-plus/face-rectangle.facepp.'
import { ResultFaceRecognition } from './result-face-recognition.entity'

export type FaceDetectResult = {
  face_token: string
  face_rectangle: FaceRectangle
}

export class DetectResultEntity extends ResultFaceRecognition<any> {
  public readonly faces: FaceDetectResult[]
  public readonly image_id: string
  public readonly face_num: number

  constructor(
    request_id?: string,
    time_used?: number,
    faces?: FaceDetectResult[],
    image_id?: string,
    face_num?: number,
    props?: any,
  ) {
    super(props, request_id, time_used)
    this.faces = faces
    this.image_id = image_id
    this.face_num = face_num
  }
}

export class DetectResultEntityFactory {
  static create(detectResult: DetectResultEntity): DetectResultEntity {
    return new DetectResultEntity(
      detectResult.request_id,
      detectResult.time_used,
      detectResult.faces,
      detectResult.image_id,
      detectResult.face_num,
      detectResult.props,
    )
  }
}
