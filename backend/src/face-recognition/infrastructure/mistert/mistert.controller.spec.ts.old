import { Test, TestingModule } from '@nestjs/testing'
import { MistertController } from './mistert.controller'

describe('MistertController', () => {
  let controller: MistertController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MistertController],
    }).compile()

    controller = module.get<MistertController>(MistertController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
