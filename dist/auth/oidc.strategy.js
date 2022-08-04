"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OidcStrategy = exports.buildOpenIdClient = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const openid_client_1 = require("openid-client");
const create_user_dto_1 = require("../users/dto/create-user.dto");
const buildOpenIdClient = async () => {
    const TrustIssuer = await openid_client_1.Issuer.discover(`${process.env.OAUTH2_CLIENT_PROVIDER_OIDC_ISSUER}/.well-known/openid-configuration`);
    const client = new TrustIssuer.Client({
        client_id: process.env.OAUTH2_CLIENT_REGISTRATION_LOGIN_CLIENT_ID,
        client_secret: process.env.OAUTH2_CLIENT_REGISTRATION_LOGIN_CLIENT_SECRET
    });
    return client;
};
exports.buildOpenIdClient = buildOpenIdClient;
class OidcStrategy extends (0, passport_1.PassportStrategy)(openid_client_1.Strategy, 'oidc') {
    constructor(authService, client) {
        super({
            client: client,
            params: {
                redirect_uri: process.env.OAUTH2_CLIENT_REGISTRATION_LOGIN_REDIRECT_URI,
                scope: process.env.OAUTH2_CLIENT_REGISTRATION_LOGIN_SCOPE
            },
            passReqToCallback: false,
            usePKCE: false
        });
        this.authService = authService;
        this.client = client;
    }
    async validate(tokenset, usersService) {
        const userinfo = await this.client.userinfo(tokenset);
        try {
            const [header, payload, signature] = tokenset.id_token.split('.');
            const decodedPayload = Buffer.from(payload, 'base64').toString();
            const Payload = JSON.parse(decodedPayload);
            const user = new create_user_dto_1.CreateUserDto();
            user.sub = Payload.sub;
            user.iss = Payload.iss;
            user.username = Payload.name;
            user.picture = Payload.picture;
            return { id_token: tokenset.id_token, userinfo: userinfo };
        }
        catch (err) {
            throw new common_1.UnauthorizedException();
        }
    }
}
exports.OidcStrategy = OidcStrategy;
//# sourceMappingURL=oidc.strategy.js.map