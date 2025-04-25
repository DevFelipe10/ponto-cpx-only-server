import { CollectionOpencv } from '../opencv.collections'

export enum GenderEnumOpencv {
  Male = 'M',
  Female = 'F',
}

export type ThumbnailOpencvProps = {
  id: string
  thumbnail: string
}

export class ThumbnailOpencv {
  constructor(props: ThumbnailOpencvProps) {
    this.id = props.id
    this.thumbnail = props.thumbnail
  }

  id: string
  thumbnail: string
}

export type PersonOpencvProps = {
  id: string
  name: string | null
  thumbnails: ThumbnailOpencv[]
  gender: GenderEnumOpencv | null
  date_of_birth: string | null
  nationality: string | null
  score: number | undefined
  collections: CollectionOpencv[]
  notes: string | null
  create_date: Date
  modified_date: Date
}

export class PersonOpencv {
  constructor(props: PersonOpencvProps) {
    this.id = props.id
    this.name = props.name
    this.thumbnails = props.thumbnails
    this.gender = props.gender
    this.date_of_birth = props.date_of_birth
    this.nationality = props.nationality
    this.score = props.score
    this.collections = props.collections
    this.notes = props.notes
    this.create_date = props.create_date
    this.modified_date = props.modified_date
  }

  id: string
  name: string | null
  thumbnails: ThumbnailOpencv[]
  gender: GenderEnumOpencv | null
  date_of_birth: string | null
  nationality: string | null
  score: number | undefined
  collections: CollectionOpencv[]
  notes: string | null
  create_date: Date
  modified_date: Date
}

export type PersonCreateOpencv = {
  collections: string[] | null
  date_of_birth: string | null
  gender: GenderEnumOpencv | null
  id: string | null
  images: string[]
  is_bulk_insert: false | null
  name: string
  nationality: string | null
  notes: string | null
}

export type SearchPersonResultOpencvProps = {
  count: number
  persons: PersonOpencv[]
}
export class SearchPersonResultOpencv {
  constructor(props: SearchPersonResultOpencv) {
    this.count = props.count
    this.persons = props.persons
  }

  count: number
  persons: PersonOpencv[]
}
