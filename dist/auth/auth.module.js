"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const oidc_strategy_1 = require("./oidc.strategy");
const session_serializer_1 = require("./session.serializer");
const auth_service_1 = require("./auth.service");
const auth_controller_1 = require("./auth.controller");
const users_module_1 = require("../users/users.module");
const jwt_statergy_1 = require("./jwt.statergy");
const OidcStrategyFactory = {
    provide: 'OidcStrategy',
    useFactory: async (authService) => {
        const client = await (0, oidc_strategy_1.buildOpenIdClient)();
        const strategy = new oidc_strategy_1.OidcStrategy(authService, client);
        return strategy;
    },
    inject: [auth_service_1.AuthService]
};
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            passport_1.PassportModule.register({
                session: true,
                defaultStrategy: 'oidc'
            }),
            users_module_1.UsersModule
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [OidcStrategyFactory, session_serializer_1.SessionSerializer, auth_service_1.AuthService, jwt_statergy_1.JwtStrategy]
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map