"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OidcStrategy = void 0;
const passport_1 = require("@nestjs/passport");
const openid_client_1 = require("openid-client");
const google_metadata_1 = require("./issuer/google.metadata");
class OidcStrategy extends (0, passport_1.PassportStrategy)(openid_client_1.Strategy, 'oidc') {
    constructor(authService) {
        super({
            client: OidcStrategy.setupGoogleClient(),
            params: {
                redirect_uri: process.env.OAUTH2_CLIENT_REGISTRATION_LOGIN_REDIRECT_URI
            }
        });
        this.authService = authService;
    }
    static setupGoogleClient() {
        const googleIssuer = new openid_client_1.Issuer(google_metadata_1.default);
        return new googleIssuer.Client({
            client_id: process.env.GOOGLE_OAUTH20_CLIENT_ID,
            client_secret: process.env.GOOGLE_OAUTH20_CLIENT_SECRET
        });
    }
    async validate(tokenSet, done) {
        const user = await this.authService.validateUser(tokenSet);
        done(null, user);
    }
}
exports.OidcStrategy = OidcStrategy;
//# sourceMappingURL=oidc.strategy.js.map