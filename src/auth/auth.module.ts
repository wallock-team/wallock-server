import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { AuthController } from './auth.controller'
import { UsersModule } from 'src/users/users.module'
import { OidcStrategy } from './strategies/oidc/oidc.strategy'
import { JwtStrategy } from './strategies/jwt/jwt.strategy'

@Module({
  imports: [PassportModule, UsersModule],
  controllers: [AuthController],
  providers: [OidcStrategy, JwtStrategy]
})
export class AuthModule {}
