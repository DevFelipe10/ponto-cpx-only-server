import { PersonOpencv } from './opencv.person.type'

export enum EnumSearchMode {
  ACCURATE = 'ACCURATE',
  FAST = 'FAST',
}

export type SearchPersonOpencv = {
  collection_id: string | null // OPTIONAL_COLLECTION_ID_TO_RESTRICT_SEARCH
  images: string[]
  max_results: number | null
  min_score: number | string | null
  search_mode: EnumSearchMode
}

export type SearchDetectOpencvProps = {
  box: {
    left: number
    top: number
    right: number
    bottom: number
  }
  landmarks: {
    left_eye: number[]
    right_eye: number[]
    nose: number[]
    left_mouth: number[]
    right_mouth: number[]
  }
  detection_score: number
  thumbnail: string
  persons: PersonOpencv[]
}

export class SearchDetectOpencv {
  constructor(props: SearchDetectOpencvProps) {
    this.box = props.box
    this.landmarks = props.landmarks
    this.detection_score = props.detection_score
    this.thumbnail = props.thumbnail
    this.persons = props.persons
  }

  box: {
    left: number
    top: number
    right: number
    bottom: number
  }
  landmarks: {
    left_eye: number[]
    right_eye: number[]
    nose: number[]
    left_mouth: number[]
    right_mouth: number[]
  }
  detection_score: number
  thumbnail: string
  persons: PersonOpencv[]
}
