import { User } from '../entities/user.entity';
declare const ReadUserDto_base: import("@nestjs/common").Type<Omit<User, "password">>;
export declare class ReadUserDto extends ReadUserDto_base {
}
export {};
