import { Test, TestingModule } from '@nestjs/testing'
import { AzureAuthenticationService } from './azure.authentication.service'

describe('AzureService', () => {
  let service: AzureAuthenticationService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AzureAuthenticationService],
    }).compile()

    service = module.get<AzureAuthenticationService>(AzureAuthenticationService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
