import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  Res,
  UseGuards
} from '@nestjs/common'
import { Request, Response } from 'express'
import JwtAuthGuard from './jwt-auth.guard'
import GoogleOidcAuthGuard from './google-oidc-auth.guard'
import FacebookOidcAuthGuard from './facebook-oidc-auth.guard'
import AuthService from './auth.service'

@Controller('auth')
export default class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(GoogleOidcAuthGuard)
  @Get('login-with-google')
  loginWithGoogle() {}

  @UseGuards(FacebookOidcAuthGuard)
  @Get('/oauth2/facebook')
  loginWithFacebook() {}

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
