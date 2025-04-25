import { faker } from '@faker-js/faker'
import {
  PersonPaginate,
  SearchPersonResultProps,
} from '../../entities/pagination/list-search-person'
import { PersonPaginateDataBuilder } from './person-paginate-data-builder'

type Props = {
  count?: number
  persons?: PersonPaginate[]
}

export function SearchPersonResultDataBuilder(
  props: Props,
): SearchPersonResultProps {
  return {
    count: props.count ?? faker.number.int({ max: 5, min: 1 }),
    persons:
      props.persons ??
      faker.helpers.multiple(
        () => new PersonPaginate(PersonPaginateDataBuilder({})),
      ),
  }
}
