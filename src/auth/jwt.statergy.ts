import { Injectable } from '@nestjs/common/decorators'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import * as dotenv from 'dotenv'
import { UnauthorizedException } from '@nestjs/common'
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
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      issuer: 'https://accounts.google.com',
      algorithms: ['RS256']
    })
  }

  async validate(payload: any) {
    const { name } = payload
    //const user = await this.userRepository.findOne({ email });

    if (!name) {
      throw new UnauthorizedException()
    }

    return payload
  }
}
