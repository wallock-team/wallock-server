import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PassportModule } from '@nestjs/passport'
import AuthController from './auth.controller'
import AuthService from './auth.service'
import GoogleOidcStrategy from './google-oidc.strategy'
import MockOidcStrategy from './mock-oidc.strategy'
import { JwtStrategy } from './jwt.strategy'
import { UsersModule } from '../users/users.module'

@Module({
  imports: [PassportModule, UsersModule, ConfigModule],
  controllers: [AuthController],
  providers: [AuthService, GoogleOidcStrategy, MockOidcStrategy, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
