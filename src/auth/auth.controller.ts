import { Controller, Get, UseGuards } from '@nestjs/common'
import JwtAuthGuard from './jwt-auth.guard'
import GoogleOidcAuthGuard from './google-oidc-auth.guard'
import AuthService from './auth.service'
import MockOidcAuthGuard from './mock-oidc-auth.guard'

@Controller('auth')
export default class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(GoogleOidcAuthGuard)
  @Get('login-with-google')
  loginWithGoogle() {}

  @UseGuards(MockOidcAuthGuard)
  @Get('login-with-mock')
  loginWithMock() {}

  @Get('/greet')
  @UseGuards(JwtAuthGuard)
  async greet() {
    return 'Hello Wallock!'
  }
}
