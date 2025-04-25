import { Thresholds } from 'src/face-recognition/domain/entities/face-plus-plus/thresholds.facepp'
import { ResultFaceRecognition } from './result-face-recognition.entity'

export type ResultSearchFace = {
  confidence: number
  user_id: string
  face_token: string
}

export class SearchFaceResultEntity extends ResultFaceRecognition<any> {
  public readonly thresholds: Thresholds
  public readonly results: ResultSearchFace[]
  public readonly isConfidence: boolean

  constructor(
    request_id?: string,
    time_used?: number,
    thresholds?: Thresholds,
    results?: ResultSearchFace[],
    props?: any,
  ) {
    super(props, request_id, time_used)
    this.thresholds = thresholds
    this.results = results
    this.isConfidence = this.verifyConfidenceLevel()
  }

  // Verifica o nível de "confiança" da imagem buscada
  verifyConfidenceLevel(): boolean {
    if (this.results.length < 0) {
      return false
    }

    return this.results[0].confidence < 80 ? false : true
  }

  // verificar userid do request com o userid da imagem
  verifyUserId(userid: string): boolean {
    if (this.results.length < 0) {
      return false
    }

    return this.results[0].user_id === userid ? true : false
  }
}

export class SearchFaceResultEntityFactory {
  static create(searchResult: SearchFaceResultEntity): SearchFaceResultEntity {
    return new SearchFaceResultEntity(
      searchResult.request_id,
      searchResult.time_used,
      searchResult.thresholds,
      searchResult.results,
      searchResult.props,
    )
  }
}
