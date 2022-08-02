import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PassportModule } from '@nestjs/passport'
import AuthController from './auth.controller'
import { UsersModule } from './../users/users.module'
import OidcClientsManager from './oidc-clients-manager'
import AuthService from './auth.service'
import GoogleOidcStrategy from './google-oidc.strategy'
import MocklabOidcStrategy from './mocklab-oidc.strategy'
import MockOidcStrategy from './mock-oidc.strategy'
import { JwtStrategy } from './jwt.strategy'

@Module({
  imports: [PassportModule, UsersModule, ConfigModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    GoogleOidcStrategy,
    MocklabOidcStrategy,
    MockOidcStrategy,
    OidcClientsManager,
    JwtStrategy
  ],
  exports: [AuthService]
})
export class AuthModule {}
