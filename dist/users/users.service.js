"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
let UsersService = class UsersService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async create(createUserDto) {
        const exist_user = await this.userRepository.findOne({ where: { sub: createUserDto.sub } });
        if (exist_user) {
            return {
                statusCode: 201,
                message: 'Login in existed Email.',
                data: { username: createUserDto.username,
                    id: exist_user.id }
            };
        }
        else {
            const new_user = await this.userRepository.save(createUserDto);
            return {
                statusCode: 201,
                message: 'Login and create new user success',
                data: { username: new_user.username,
                    id: new_user.id }
            };
        }
    }
    async findAll() {
        return await this.userRepository.find();
    }
    async findOne(id) {
        return this.userRepository.findOne({ where: { id: id } });
    }
    async updateUser(id, updateUserDto) {
        const find_user = await this.userRepository.findOne({ where: { id: id } });
        if (find_user) {
            await this.userRepository.update(find_user.id, updateUserDto);
            return {
                statusCode: 201,
                message: 'Update successfully.'
            };
        }
        return {
            statusCode: 404,
            message: 'Can\'t find user.'
        };
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map