import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { UsersModule } from '../users/users.module'
import { PassportModule } from '@nestjs/passport'
import { GoogleStrategy } from 'src/auth/google.strategy'

@Module({
  imports: [
    UsersModule,
    PassportModule
  ],
  providers: [AuthService, GoogleStrategy],
  exports: [AuthService]
})
export class AuthModule {}
