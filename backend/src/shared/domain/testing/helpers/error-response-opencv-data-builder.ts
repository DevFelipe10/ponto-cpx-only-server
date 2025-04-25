import { faker } from '@faker-js/faker'
import { ErrorResponseOpencvProps } from 'src/face-recognition/domain/entities/opencv/types/error-repsonse-opencv'

type Props = {
  code?: string
  message?: string
}

export function ErrorResponseOpencvDataBuilder(
  props: Props,
): ErrorResponseOpencvProps {
  return {
    code: props.code ?? faker.string.numeric({ length: { min: 3, max: 5 } }),
    message: props.message ?? faker.lorem.words(),
  }
}
