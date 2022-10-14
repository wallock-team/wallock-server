import { Test } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock'
import { Repository } from 'typeorm'
import { CategoriesService } from './categories.service'
import { Category } from './entities/category.entity'

const moduleMocker = new ModuleMocker(global)

describe('Categories service', () => {
  let service: CategoriesService

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CategoriesService,
        {
          provide: getRepositoryToken(Category),
          useValue: {}
        }
      ]
    })
      .useMocker(token => {
        if (token === Repository<Category>) {
          return {}
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

  it('', async () => {})
})
