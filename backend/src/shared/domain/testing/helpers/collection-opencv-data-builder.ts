import { CollectionOpencvProps } from 'src/face-recognition/domain/entities/opencv/opencv.collections'
import { faker } from '@faker-js/faker/.'

type Props = {
  id?: string
  name?: string
  description?: string | null
  count?: number
  create_date?: Date
  modified_date?: Date
}

export function CollectionOpencvDataBuilder(
  props?: Props,
): CollectionOpencvProps {
  return {
    count: props.count ?? faker.number.int(),
    create_date: props.create_date ?? faker.date.recent(),
    description:
      props.description ?? faker.string.alpha({ length: { min: 5, max: 10 } }),
    id: props.id ?? faker.string.alpha(),
    modified_date: props.modified_date ?? faker.date.recent(),
    name: props.name ?? faker.string.alpha({ length: { min: 5, max: 10 } }),
  }
}
