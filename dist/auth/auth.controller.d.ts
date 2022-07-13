import { Response } from 'express';
import { UsersService } from '../users/users.service';
export declare class AuthController {
    private readonly usersService;
    constructor(usersService: UsersService);
    login(): void;
    user(req: any): Promise<any>;
    loginCallback(res: Response): Promise<void>;
    logout(req: any, res: Response): Promise<void>;
}
