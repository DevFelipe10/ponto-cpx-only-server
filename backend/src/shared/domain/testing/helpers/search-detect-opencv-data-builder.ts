import { faker } from '@faker-js/faker'
import { TokenResponseDtoProps } from '../../entities/auth/dto/token-response.dto.auth'
import { UserTokenResponseDtoDataBuilder } from './user-token-response-dto-data-builder'
import { SearchDetectOpencvProps } from 'src/face-recognition/domain/entities/opencv/types/opencv.search.type'
import { PersonOpencv } from 'src/face-recognition/domain/entities/opencv/types/opencv.person.type'
import { PersonOpencvDataBuilder } from './person-opencv-data-builder'

type Props = {
  box?: {
    left: number
    top: number
    right: number
    bottom: number
  }
  landmarks?: {
    left_eye: number[]
    right_eye: number[]
    nose: number[]
    left_mouth: number[]
    right_mouth: number[]
  }
  detection_score?: number
  thumbnail?: string
  persons?: PersonOpencv[]
}

export function SearchDetectOpencvDataBuilder(
  props: Props,
): SearchDetectOpencvProps {
  return {
    box: props.box ?? {
      bottom: faker.number.float(),
      left: faker.number.float(),
      right: faker.number.float(),
      top: faker.number.float(),
    },
    detection_score: props.detection_score ?? faker.number.float(),
    landmarks: props.landmarks ?? {
      left_eye: faker.helpers.multiple(() => faker.number.float()),
      left_mouth: faker.helpers.multiple(() => faker.number.float()),
      nose: faker.helpers.multiple(() => faker.number.float()),
      right_eye: faker.helpers.multiple(() => faker.number.float()),
      right_mouth: faker.helpers.multiple(() => faker.number.float()),
    },
    persons:
      props.persons ??
      faker.helpers.multiple(
        () => new PersonOpencv(PersonOpencvDataBuilder({})),
      ),
    thumbnail: props.thumbnail ?? faker.image.dataUri({ type: 'svg-base64' }),
  }
}
