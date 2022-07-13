"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadUserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const user_entity_1 = require("../entities/user.entity");
class ReadUserDto extends (0, swagger_1.OmitType)(user_entity_1.User, ['password']) {
}
exports.ReadUserDto = ReadUserDto;
//# sourceMappingURL=read-user.dto.js.map