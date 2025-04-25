import { Injectable } from '@nestjs/common'
import { AxiosError } from 'axios'
import { EnvConfigService } from 'src/shared/infrastructure/env-config/env-config.service'
import {
  PersonCreateOpencv,
  PersonOpencv,
  SearchPersonResultOpencv,
} from '../../domain/entities/opencv/types/opencv.person.type'
import { ErrorResponseOpencv } from '../../domain/entities/opencv/types/error-repsonse-opencv'
import { OpencvHttpService } from './opencv-http/opencv-http.service'
import { OpencvService } from './opencv.service'
import { PageQuery } from 'src/shared/domain/entities/pagination/page-query'
import {
  ListSearchPerson,
  PersonPaginate,
  SearchPersonResult,
} from 'src/shared/domain/entities/pagination/list-search-person'

@Injectable()
export class OpencvPersonService {
  private apiUrl: string

  constructor(
    private readonly envConfigService: EnvConfigService,
    private readonly httpService: OpencvHttpService,
    private readonly opencvService: OpencvService,
  ) {
    this.apiUrl = this.envConfigService.getOpencvBaseUrl()
  }

  async getPersonById(personId: string): Promise<PersonOpencv | null> {
    try {
      const { data } = await this.httpService.get<PersonOpencv | null>(
        `${this.apiUrl}/person/${personId}`,
      )

      return data
    } catch {
      return null
    }
  }

  async getPersons(pageQueries: PageQuery): Promise<ListSearchPerson> {
    const { data } = await this.httpService.get<SearchPersonResultOpencv>(
      `${this.apiUrl}/persons`,
      { skip: pageQueries.skip, take: pageQueries.limit },
    )

    const searchPersonResult = new SearchPersonResult({
      count: data.count,
      persons: data.persons.map(
        person =>
          new PersonPaginate({
            id: person.name,
            name: person.name,
            create_date: person.create_date,
            modified_date: person.modified_date,
          }),
      ),
    })

    return new ListSearchPerson({
      limit: pageQueries.limit,
      searchPersonResult: searchPersonResult,
    })
  }

  // async createPerson(person: PersonCreateOpencv) {
  async createPerson(imageBase64: string, id: string) {
    try {
      const { data } = await this.httpService.post<PersonOpencv>(
        `${this.apiUrl}/person`,
        <PersonCreateOpencv>{
          name: id,
          images: [this.opencvService.wrapBase64(imageBase64)],
        },
      )

      return data
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponseOpencv>

      if (axiosError.response?.data) {
        throw axiosError.response?.data
      }

      throw new Error('Erro desconhecido ao criar nova pessoa')
    }
  }
}
