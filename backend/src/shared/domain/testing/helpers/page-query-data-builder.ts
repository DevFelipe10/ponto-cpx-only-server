import { faker } from '@faker-js/faker'
import { PageQueryProps } from '../../entities/pagination/page-query'

type Props = {
  page?: string
  limit?: string
}

export function PageQueryDataBuilder(props: Props): PageQueryProps {
  return {
    limit: props.limit ?? faker.number.int({ min: 1, max: 5 }).toString(),
    page: props.page ?? faker.number.int({ min: 1, max: 5 }).toString(),
  }
}
