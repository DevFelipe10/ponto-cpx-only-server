import { Test, TestingModule } from '@nestjs/testing'
import { ApiService } from '../../api.service'
import { HttpService } from '@nestjs/axios'
import { of } from 'rxjs'
import { faker } from '@faker-js/faker/.'

class User {
  id: number
  username: string

  constructor(props: UserProps = new UserProps()) {
    this.id = props.id
    this.username = props.username
  }
}

class UserProps {
  constructor(
    public id = 1,
    public username = 'teste',
  ) {}
}

class PutResult {
  constructor(
    public user: User,
    public message = 'Usuário atualizado',
  ) {}
}

describe('FaceApiService integration tests', () => {
  let sut: ApiService
  let httpService: HttpService

  const url = `https://${faker.internet.domainName()}/`
  const user = new User()
  const putResult = new PutResult(user)

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApiService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn().mockReturnValue(of({ data: user })),
            post: jest.fn().mockReturnValue(of({ data: user })),
            put: jest.fn().mockReturnValue(of({ data: putResult })),
          },
        },
      ],
    }).compile()

    sut = module.get<ApiService>(ApiService)
    httpService = module.get<HttpService>(HttpService)
  })

  it('should be defined', () => {
    expect(sut).toBeDefined()
  })

  describe('http verb GET, POST, PUT tests', () => {
    it('should to return response from GET', async () => {
      const result = await sut.get<User>(url, {})

      expect(result).toBeInstanceOf(User)
    })

    it('should to return response from POST', async () => {
      const result = await sut.post<User>(url, user, {})

      expect(result).toBeInstanceOf(User)
    })

    it('should to return response from PUT', async () => {
      user.username = 'another_name'

      const result = await sut.put<PutResult>(url, user, {})

      expect(result).toBeInstanceOf(PutResult)
      expect(result.user).toBe<User>(user)
    })
  })
})
