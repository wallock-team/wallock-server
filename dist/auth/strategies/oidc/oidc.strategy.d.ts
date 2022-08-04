import { Strategy, TokenSet } from 'openid-client';
import AuthService from 'src/auth/auth.service';
import { User } from 'src/users/entities/user.entity';
declare const OidcStrategy_base: new (...args: any[]) => Strategy<unknown, import("openid-client").BaseClient>;
export declare class OidcStrategy extends OidcStrategy_base {
    private authService;
    private static setupGoogleClient;
    constructor(authService: AuthService);
    validate(tokenSet: TokenSet, done: (err: any, user?: User) => void): Promise<void>;
}
export {};
