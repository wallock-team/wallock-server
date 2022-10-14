import { Test } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock'
import { CategoriesService } from './categories.service'
import { Category } from './entities/category.entity'

const moduleMocker = new ModuleMocker(global)

const mockedCategoryRepository = {}

describe('Categories service', () => {
  let service: CategoriesService

  describe('Creating category', () => {
    it('Case 1', async () => {})
  })
  describe('Updating category', () => {
    it('Case 1', async () => {})
  })
  describe('Deleting category', () => {
    it('Case 1', async () => {})
  })

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [CategoriesService]
    })
      .useMocker(token => {
        if (token === getRepositoryToken(Category)) {
          return mockedCategoryRepository
        }
        if (typeof token === 'function') {
          const mockMetadata = moduleMocker.getMetadata(
            token
          ) as MockFunctionMetadata<any, any>
          const Mock = moduleMocker.generateFromMetadata(mockMetadata)
          return new Mock()
        }
      })
      .compile()

    service = moduleRef.get(CategoriesService)
  })
})
