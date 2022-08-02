import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Res,
  UseGuards
} from '@nestjs/common'
import { Response } from 'express'
import JwtAuthGuard from './jwt-auth.guard'
import GoogleOidcAuthGuard from './google-oidc-auth.guard'
import FacebookOidcAuthGuard from './facebook-oidc-auth.guard'
import AuthService from './auth.service'
import MocklabOidcAuthGuard from './mocklab-oidc-auth.guard'
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

  @UseGuards(FacebookOidcAuthGuard)
  @Get('/oauth2/facebook')
  loginWithFacebook() {}

  @UseGuards(MocklabOidcAuthGuard)
  @Get('/login-with-mocklab')
  loginWithMocklab() {}

  @Get('/greet')
  @UseGuards(JwtAuthGuard)
  async greet() {
    return 'Hello Wallock!'
  }

  @Get('/login-with-google-callback')
  async loginWithGoogleCallback(
    @Query('code') code: string,
    @Res() res: Response
  ) {
    const tokenSet = await this.authService.exchangeOidcCode('google', code)
    res.cookie('id_token', tokenSet.id_token)
    res.redirect('/')
  }

  @Get('/login-with-mocklab-callback')
  async loginWithMocklabCallback(
    @Query('code') code: string,
    @Res() res: Response
  ) {
    const tokenSet = await this.authService.exchangeOidcCode('mocklab', code)
    res.cookie('id_token', tokenSet.id_token)
    res.redirect('/')
  }

  @Get('/login-with-mock-callback')
  async loginWithMockCallback(
    @Query('code') code: string,
    @Res() res: Response
  ) {
    const tokenSet = await this.authService.exchangeOidcCode('mock', code)
    res.cookie('id_token', tokenSet.id_token)
    res.redirect('/auth/greet/')
  }

  @Post('/callback')
  async loginCallback(
    @Body('id_token')
    idToken: string,
    @Res()
    res: Response
  ) {
    if (idToken) {
      res.cookie('id_token', idToken)
      res.redirect('/')
    } else {
      res.redirect('/login')
    }
  }
}
