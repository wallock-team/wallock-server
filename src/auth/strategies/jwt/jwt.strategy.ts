import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import * as dotenv from 'dotenv'
import { passportJwtSecret } from 'jwks-rsa'

dotenv.config()

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://www.googleapis.com/oauth2/v3/certs'
      }),
      jwtFromRequest: ExtractJwt.fromExtractors([
        function fromCookie(req) {
          return req.cookies.id_token
        }
      ]),
      issuer: 'https://accounts.google.com',
      algorithms: ['RS256']
    })
  }

  async validate(token: any) {
    if (!token) {
      throw new UnauthorizedException()
    }

    return token
  }
}
