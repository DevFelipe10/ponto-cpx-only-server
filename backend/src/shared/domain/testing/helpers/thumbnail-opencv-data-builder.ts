import { faker } from '@faker-js/faker'
import { ThumbnailOpencvProps } from 'src/face-recognition/domain/entities/opencv/types/opencv.person.type'

type Props = {
  id?: string
  thumbnail?: string
}

export function ThumbnailOpencvDataBuilder(props: Props): ThumbnailOpencvProps {
  return {
    id: props.id ?? faker.string.uuid(),
    thumbnail: props.thumbnail ?? faker.image.dataUri({ type: 'svg-base64' }),
  }
}
