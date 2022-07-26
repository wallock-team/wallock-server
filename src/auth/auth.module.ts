import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { AuthController } from './auth.controller'
import { UsersModule } from 'src/users/users.module'
import { OidcStrategy } from './google-oidc.strategy'
import { JwtStrategy } from './jwt.strategy'
import { FacebookOidcStrategy } from './facebook-oidc.strategy'

@Module({
  imports: [PassportModule, UsersModule],
  controllers: [AuthController],
  providers: [
    FacebookOidcStrategy,
    OidcStrategy,
    JwtStrategy
  ]
})
export class AuthModule {}
