import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Request } from 'express'
import { passportJwtSecret } from 'jwks-rsa'

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
        function fromCookie(req: Request): string | null {
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
