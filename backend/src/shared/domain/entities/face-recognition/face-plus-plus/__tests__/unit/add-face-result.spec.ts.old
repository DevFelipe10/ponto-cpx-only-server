import { Test, TestingModule } from '@nestjs/testing'
import {
  AddFaceResultEntity,
  AddFaceResultEntityFactory,
} from '../../add-face-result.entity'

describe('AddFaceResult unit tests', () => {
  let sut: AddFaceResultEntity

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AddFaceResultEntity, AddFaceResultEntityFactory],
    }).compile()

    sut = module.get<AddFaceResultEntity>(AddFaceResultEntity)
  })

  it('should be defined', () => {
    expect(sut).toBeDefined()
  })

  it('should to return JSON', () => {
    const result = sut.toJSON()
    expect(result).toBeInstanceOf(Object)
  })

  // it('should not to return JSON', () => {
  //   const sut2 = new AddFaceResultEntity()
  //   const result = sut2.toJSON()
  //   expect(result).toBeInstanceOf(Object)
  // })
})
