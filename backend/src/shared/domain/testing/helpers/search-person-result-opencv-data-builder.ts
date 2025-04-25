import { faker } from '@faker-js/faker'
import {
  PersonOpencv,
  SearchPersonResultOpencvProps,
} from 'src/face-recognition/domain/entities/opencv/types/opencv.person.type'
import { PersonOpencvDataBuilder } from './person-opencv-data-builder'

type Props = {
  count?: number
  persons?: PersonOpencv[]
}

export function SearchPersonResultOpencvDataBuilder(
  props: Props,
): SearchPersonResultOpencvProps {
  const persons = faker.helpers.multiple(
    () => new PersonOpencv(PersonOpencvDataBuilder({})),
    { count: { max: 3, min: 1 } },
  )

  return {
    count: props.count ?? persons.length,
    persons: props.persons ?? persons,
  }
}
