"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
let CategoriesService = class CategoriesService {
    create(createCategoryDto) {
        return {
            name: "Home",
            isExpense: 0,
            tier: 0,
            icon: "home Icon",
            parentID: null,
            uID: 1,
            cateID: 1
        };
    }
    findAll(id) {
        return {
            status_code: 201,
            data: [
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
        };
    }
    findOne(id) {
        return {
            status_code: 201,
            data: {
                name: 'C Home',
                isExpense: 0,
                tier: 0,
                icon: "Cuong Home Icon",
                parentID: null,
                uID: 1,
                cateID: 1
            }
        };
    }
    update(updateCategoryDto) {
        return {
            status_code: 201,
            data: {
                name: 'C Home',
                isExpense: 0,
                tier: 0,
                icon: "Cuong Home Icon",
                parentID: null,
                uID: 1,
                cateID: 1
            }
        };
    }
    remove(id) {
        return {
            status_code: 201,
            message: "delete categories success"
        };
    }
};
CategoriesService = __decorate([
    (0, common_1.Injectable)()
], CategoriesService);
exports.CategoriesService = CategoriesService;
//# sourceMappingURL=categories.service.js.map