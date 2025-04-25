import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export type SearchPersonResultProps = {
  count: number
  persons: PersonPaginate[]
}

export class SearchPersonResult {
  count: number
  persons: PersonPaginate[]

  constructor(props: SearchPersonResultProps) {
    this.count = props.count
    this.persons = props.persons
  }
}

export type PersonPaginateProps = {
  id: string
  name?: string
  create_date?: Date | string
  modified_date?: Date | string
}

export class PersonPaginate {
  @ApiProperty({ example: '0001' })
  @IsNotEmpty()
  id: string

  @ApiProperty({ example: 'Antônio' })
  name?: string = '-'

  @ApiProperty({ example: '21/03/2025, 11:30:31' })
  create_date?: string = '-'

  @ApiProperty({ example: '25/03/2025, 10:21:05' })
  modified_date?: string = '-'

  constructor(props: PersonPaginateProps) {
    this.id = props.id
    this.name = props.name ?? '-'
    this.create_date = props.create_date
      ? new Date(props.create_date).toLocaleString()
      : '-'
    this.modified_date = props.modified_date
      ? new Date(props.modified_date).toLocaleString()
      : '-'
  }
}

export type ListSearchPersonProps = {
  searchPersonResult: SearchPersonResult
  limit: number
}

export class ListSearchPerson {
  constructor(props: ListSearchPersonProps) {
    this.total = props.searchPersonResult.count
    this.totalPages = Math.round(this.total / props.limit)
    this.count = props.searchPersonResult.persons.length
    this.persons = props.searchPersonResult.persons
  }

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  totalPages: number

  @ApiProperty({ example: 2 })
  @IsNotEmpty()
  total: number

  @ApiProperty({ example: 2 })
  @IsNotEmpty()
  count: number

  persons: PersonPaginate[]
}
