import { ResultAzure } from './result.azure'

export type FaceRectangle = {
  top: number
  left: number
  width: number
  height: number
}

export type FaceDetectResult = {
  face_token: string
  face_rectangle: FaceRectangle
}

export class DetectResultAzure extends ResultAzure {
  public readonly faces: FaceDetectResult[]
  public readonly image_id: string
  public readonly face_num: number

  constructor(
    request_id?: string,
    time_used?: number,
    faces?: FaceDetectResult[],
    image_id?: string,
    face_num?: number,
  ) {
    super(request_id, time_used)
    this.faces = faces
    this.image_id = image_id
    this.face_num = face_num
  }
}

export class DetectResultAzureFactory {
  static create(detectResult: DetectResultAzure): DetectResultAzure {
    return new DetectResultAzure(
      detectResult.request_id,
      detectResult.time_used,
      detectResult.faces,
      detectResult.image_id,
      detectResult.face_num,
    )
  }
}
