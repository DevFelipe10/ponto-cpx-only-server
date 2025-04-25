import { faker } from '@faker-js/faker'
import {
  GenderEnumOpencv,
  PersonOpencvProps,
  ThumbnailOpencv,
} from 'src/face-recognition/domain/entities/opencv/types/opencv.person.type'
import { CollectionOpencv } from 'src/face-recognition/domain/entities/opencv/opencv.collections'
import { CollectionOpencvDataBuilder } from './collection-opencv-data-builder'
import { ThumbnailOpencvDataBuilder } from './thumbnail-opencv-data-builder'

type Props = {
  id?: string
  name?: string | null
  thumbnails?: ThumbnailOpencv[]
  gender?: GenderEnumOpencv | null
  date_of_birth?: string | null
  nationality?: string | null
  score?: number | undefined
  collections?: CollectionOpencv[]
  notes?: string | null
  create_date?: Date
  modified_date?: Date
}

export function PersonOpencvDataBuilder(props: Props): PersonOpencvProps {
  return {
    collections:
      props.collections ??
      faker.helpers.multiple(() => CollectionOpencvDataBuilder({})),
    create_date: props.create_date ?? faker.date.recent(),
    date_of_birth: props.date_of_birth ?? faker.date.recent().toISOString(),
    gender: props.gender ?? faker.helpers.enumValue(GenderEnumOpencv),
    id: faker.string.uuid(),
    modified_date: props.create_date ?? faker.date.recent(),
    name: props.name ?? faker.person.firstName(),
    nationality: props.nationality ?? faker.location.country(),
    notes: props.notes ?? faker.word.words(),
    score: props.score ?? faker.number.float(),
    thumbnails:
      props.thumbnails ??
      faker.helpers.multiple(
        () => new ThumbnailOpencv(ThumbnailOpencvDataBuilder({})),
      ),
  }
}
