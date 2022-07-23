import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { OidcStrategy, buildOpenIdClient } from './oidc.strategy'
import { SessionSerializer } from './session.serializer'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { UsersModule } from '../users/users.module'
import { JwtStrategy } from './jwt.statergy'

const OidcStrategyFactory = {
  provide: 'OidcStrategy',
  useFactory: async (authService: AuthService) => {
    const client = await buildOpenIdClient() // secret sauce! build the dynamic client before injecting it into the strategy for use in the constructor super call.
    const strategy = new OidcStrategy(authService, client)
    return strategy
  },
  inject: [AuthService]
}

@Module({
  imports: [
    PassportModule.register({
      session: true,
      defaultStrategy: 'oidc'
    }),
    UsersModule
  ],
  controllers: [AuthController],
  providers: [OidcStrategyFactory, SessionSerializer, AuthService, JwtStrategy,UsersModule]
})
export class AuthModule {}
