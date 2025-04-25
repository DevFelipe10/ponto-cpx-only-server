import { Test, TestingModule } from '@nestjs/testing'
import { OpencvHttpService } from '../../opencv-http.service'
import { faker } from '@faker-js/faker/.'
import { HttpModule } from '@nestjs/axios'
import { EnvConfigModule } from 'src/shared/infrastructure/env-config/env-config.module'
import { HttpStatus } from '@nestjs/common'
import { AxiosResponse } from 'axios'

class UserHttpMock {
  id: number
  username: string

  constructor(props: UserHttpMockProps = new UserHttpMockProps()) {
    this.id = props.id
    this.username = props.username
  }
}

class UserHttpMockProps {
  constructor(
    public id = 1,
    public username = 'teste',
  ) {}
}

class OpencvHttpMock {
  constructor(private readonly user: UserHttpMock) {}

  getMock() {
    return jest.fn().mockResolvedValue(<AxiosResponse>{
      data: this.user,
      status: HttpStatus.OK,
    })
  }

  postMock() {
    return jest.fn().mockResolvedValue(<AxiosResponse>{
      data: this.user,
      status: HttpStatus.OK,
    })
  }
}

describe('OpencvHttpService unit tests', () => {
  let sut: OpencvHttpService

  const url = `https://${faker.internet.domainName()}/`
  const user = new UserHttpMock()
  const opencvHttpMock = new OpencvHttpMock(user)

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: OpencvHttpService,
          useValue: {
            get: opencvHttpMock.getMock(),
            post: opencvHttpMock.postMock(),
          },
        },
      ],
      imports: [HttpModule, EnvConfigModule],
    }).compile()

    sut = module.get<OpencvHttpService>(OpencvHttpService)
  })

  it('should be defined', () => {
    expect(sut).toBeDefined()
  })

  it('should be success response for the GET', async () => {
    const result = await sut.get<UserHttpMock>(url, {})

    expect(result.data).toBeInstanceOf(UserHttpMock)
  })

  it('should be success response for the POST', async () => {
    const result = await sut.post<UserHttpMock>(url, {})

    expect(result.data).toBeInstanceOf(UserHttpMock)
  })
})
