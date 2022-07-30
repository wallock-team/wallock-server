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

@Controller('auth')
export class AuthController {
  constructor() {}

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

  @Get('/oidc-callback')
  oidcCallback(@Req() req: Request, @Query('code') code: string) {}

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
