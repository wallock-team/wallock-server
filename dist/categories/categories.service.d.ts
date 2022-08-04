import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoriesService {
    create(createCategoryDto: CreateCategoryDto): {
        name: string;
        isExpense: number;
        tier: number;
        icon: string;
        parentID: any;
        uID: number;
        cateID: number;
    };
    findAll(id: number): {
        status_code: number;
        data: {
            name: string;
            isExpense: string;
            tier: number;
            icon: string;
            cateID: string;
            children: {
                name: string;
                is_expense: string;
                tier: number;
                icon: string;
            }[];
        }[];
    };
    findOne(id: number): {
        status_code: number;
        data: {
            name: string;
            isExpense: number;
            tier: number;
            icon: string;
            parentID: any;
            uID: number;
            cateID: number;
        };
    };
    update(updateCategoryDto: UpdateCategoryDto): {
        status_code: number;
        data: {
            name: string;
            isExpense: number;
            tier: number;
            icon: string;
            parentID: any;
            uID: number;
            cateID: number;
        };
    };
    remove(id: number): {
        status_code: number;
        message: string;
    };
}
