import { faker } from '@faker-js/faker'
import { PersonPaginateProps } from '../../entities/pagination/list-search-person'

type Props = {
  id?: string
  name?: string
  create_date?: Date | string
  modified_date?: Date | string
}

export function PersonPaginateDataBuilder(props: Props): PersonPaginateProps {
  return {
    id: props.id ?? faker.number.int().toString(),
    create_date: props.create_date ?? faker.date.recent(),
    modified_date: props.modified_date ?? faker.date.recent(),
    name: props.name ?? faker.lorem.slug(),
  }
}
