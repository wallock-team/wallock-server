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
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtStrategy = void 0;
const decorators_1 = require("@nestjs/common/decorators");
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
const dotenv = require("dotenv");
const common_1 = require("@nestjs/common");
const jwks_rsa_1 = require("jwks-rsa");
dotenv.config();
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'jwt') {
    constructor() {
        super({
            secretOrKeyProvider: (0, jwks_rsa_1.passportJwtSecret)({
                cache: true,
                rateLimit: true,
                jwksRequestsPerMinute: 5,
                jwksUri: 'https://www.googleapis.com/oauth2/v3/certs'
            }),
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            issuer: 'https://accounts.google.com',
            algorithms: ['RS256']
        });
    }
    async validate(payload) {
        const { name } = payload;
        if (!name) {
            throw new common_1.UnauthorizedException();
        }
        return payload;
    }
};
JwtStrategy = __decorate([
    (0, decorators_1.Injectable)(),
    __metadata("design:paramtypes", [])
], JwtStrategy);
exports.JwtStrategy = JwtStrategy;
//# sourceMappingURL=jwt.statergy.js.map