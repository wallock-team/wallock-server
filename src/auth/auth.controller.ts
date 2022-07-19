import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common'
import { Response } from 'express'
import JwtAuthGuard from './strategies/jwt/jwt-auth.guard'

import { OidcAuthGuard } from './strategies/oidc/oidc-auth.guard'

@Controller()
export class AuthController {
  constructor() {}

  @UseGuards(OidcAuthGuard)
  @Get('/login')
  login() {}

  @Get('/greet')
  @UseGuards(JwtAuthGuard)
  async greet() {
    return 'Hello Wallock!'
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
