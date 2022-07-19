import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { SessionSerializer } from './session.serializer'
import { AuthController } from './auth.controller'
import { UsersModule } from 'src/users/users.module'
import { OidcStrategy } from './strategies/oidc/oidc.strategy'
import { JwtStrategy } from './strategies/jwt/jwt.strategy'

@Module({
  imports: [PassportModule, UsersModule],
  controllers: [AuthController],
  providers: [SessionSerializer, OidcStrategy, JwtStrategy]
})
export class AuthModule {}
