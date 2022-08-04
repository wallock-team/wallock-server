import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Request } from 'express'
import { passportJwtSecret } from 'jwks-rsa'
import { decode } from 'jsonwebtoken'
import OidcClientsManager from './oidc-clients-manager'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(oidcClientsManager: OidcClientsManager) {
    super({
      secretOrKeyProvider: function (
        request: Request,
        rawJwtToken: any,
        done: (err: any, secretOrKey?: string | Buffer) => void
      ): void {
        const decodedJwt = decode(rawJwtToken, { json: true })

        const client = oidcClientsManager.findClientByUrl(decodedJwt.iss)

        passportJwtSecret({
          jwksUri: client.issuer.metadata.jwks_uri
        })(request, rawJwtToken, done)
      },
      jwtFromRequest: ExtractJwt.fromExtractors([
        function fromCookie(req: Request): string | null {
          return req.cookies.id_token
        }
      ])
    })
  }

  async validate(token: any) {
    if (!token) {
      throw new UnauthorizedException()
    }

    return token
  }
}
