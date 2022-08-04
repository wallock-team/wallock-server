import { Strategy, Client, TokenSet } from 'openid-client';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
export declare const buildOpenIdClient: () => Promise<import("openid-client").BaseClient>;
declare const OidcStrategy_base: new (...args: any[]) => Strategy<unknown, import("openid-client").BaseClient>;
export declare class OidcStrategy extends OidcStrategy_base {
    private readonly authService;
    client: Client;
    constructor(authService: AuthService, client: Client);
    validate(tokenset: TokenSet, usersService: UsersService): Promise<any>;
}
export {};
