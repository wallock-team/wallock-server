"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = require("@nestjs/passport");
class JwtAuthGuard extends (0, passport_1.AuthGuard)('jwt') {
}
exports.default = JwtAuthGuard;
//# sourceMappingURL=jwt-auth.guard.js.map