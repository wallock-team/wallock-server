import { Test, TestingModule } from '@nestjs/testing';
import { json } from 'stream/consumers';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';


describe('CATEGORIES UNIT TEST', () => {
  let controller: CategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [CategoriesService],
    }).compile();

    controller = module.get<CategoriesController>(CategoriesController);
  });

  it('Categories controller should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('This should create new Category', async () => {
    const input_Categories: CreateCategoryDto = {
      uID: 1,
      name: "Home",
      isExpense: 0,
      tier: 0,
      icon: "home Icon",
      parentID: null
    };
    const expected_output = {
      name: "Home",
      isExpense: 0,
      tier: 0,
      icon: "home Icon",
      parentID: null,
      uID: 1,
      cateID: 1
    }
    const received_output = await controller.create(input_Categories);
    expect(received_output.status_code).toBe(201);
    expect(received_output.data).toStrictEqual(expected_output);
  });

  it('This should update Category', async () => {
    const input_updateCate: UpdateCategoryDto =
    {
      cateID: 1,
	    name: 'C Home',
      isExpense: 0,
      icon: "Cuong Home Icon",
      parentID: null,
    }
    const expected_output = 	{
      name: 'C Home',
      isExpense: 0,
      tier: 0,
      icon: "Cuong Home Icon",
      parentID: null,
      uID: 1,
      cateID: 1
    }

    const received_output = await controller.update(input_updateCate);
    expect(received_output.status_code).toBe(201);
    expect(received_output.data).toStrictEqual(expected_output);
  })

  it('This should get specific category info', async () => {
    let input_cateID: number;
    const expected_output = 	{
      name: 'C Home',
      isExpense: 0,
      tier: 0,
      icon: "Cuong Home Icon",
      parentID: null,
      uID: 1,
      cateID: 1
    }
    const received_output = await controller.findOne(input_cateID);
    expect(received_output.status_code).toBe(201);
    expect(received_output.data).toStrictEqual(expected_output)
  })

  it('This should get all categories by userID', async () => {
    let input_uID: number;
    const expected_output = 		
    [
      {
        name: "C Home",
        isExpense: "out come",
        tier: 0,
        icon: "Cuong Home Icon",
        cateID: "123",
        children: [
          {
            name: "C Home",
            is_expense: "out come",
            tier: 1,
            icon: "Some icon"
          }
        ]
      }
    ]
    const received_output = await controller.findAll(input_uID);
    expect(received_output.status_code).toBe(201);
    expect(received_output.data).toStrictEqual(expected_output)
  })

  it('This should delete specific category', async () => {
    let cateID : number;
    const expected_output = "delete categories success";

    const received_output = await controller.remove(cateID);
    expect(received_output.status_code).toBe(201);
    expect(received_output.message).toBe("delete categories success");
  })

});
