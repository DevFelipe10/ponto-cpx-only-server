import { faker } from '@faker-js/faker'
import {
  ListSearchPersonProps,
  SearchPersonResult,
} from '../../entities/pagination/list-search-person'
import { SearchPersonResultDataBuilder } from './search-person-result-data-builder'

type Props = {
  searchPerson?: SearchPersonResult
  limit?: number
}

export function ListSearchPersonDataBuilder(
  props: Props,
): ListSearchPersonProps {
  return {
    limit: props.limit ?? faker.number.int(),
    searchPersonResult:
      props.searchPerson ??
      new SearchPersonResult(SearchPersonResultDataBuilder({})),
  }
}
