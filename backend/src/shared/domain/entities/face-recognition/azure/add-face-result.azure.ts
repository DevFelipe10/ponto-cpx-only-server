import { ResultAzure } from './result.azure'

export class AddFaceResultAzure extends ResultAzure {
  public readonly faceset_token: string
  public readonly face_count: number
  public readonly face_added: number
  public readonly outer_id: string
  public readonly failure_detail: string[]

  constructor(
    request_id?: string,
    time_used?: number,
    face_count?: number,
    face_added?: number,
    outer_id?: string,
    failure_detail?: string[],
  ) {
    super(request_id, time_used)
    face_count = face_count
    face_added = face_added
    outer_id = outer_id
    failure_detail = failure_detail
  }
}

export class AddFaceResultAzureFactory {
  static create(addFaceResult: AddFaceResultAzure): AddFaceResultAzure {
    return new AddFaceResultAzure(
      addFaceResult.request_id,
      addFaceResult.time_used,
      addFaceResult.face_count,
      addFaceResult.face_added,
      addFaceResult.outer_id,
      addFaceResult.failure_detail,
    )
  }
}
