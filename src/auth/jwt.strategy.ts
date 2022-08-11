import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Request } from 'express'
import { passportJwtSecret } from 'jwks-rsa'
import { decode } from 'jsonwebtoken'
import googleOidcIssuerMetadata from './google-oidc-issuer-metadata'
import mockOidcIssuerMetadata from './mock-oidc-issuer-metadata'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      secretOrKeyProvider: function (
        request: Request,
        rawJwtToken: any,
        done: (err: any, secretOrKey?: string | Buffer) => void
      ): void {
        const decodedJwt = decode(rawJwtToken, { json: true })

        const jwksUri = getJwksUriFromIssuer(decodedJwt.iss)

        passportJwtSecret({
          jwksUri: jwksUri
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

function getJwksUriFromIssuer(issuer: string) {
  if (issuer === googleOidcIssuerMetadata.issuer) {
    return googleOidcIssuerMetadata.jwks_uri
  } else if (issuer === mockOidcIssuerMetadata.issuer) {
    return mockOidcIssuerMetadata.jwks_uri
  } else {
    throw new Error(`Unsupported issuer: ${issuer}`)
  }
}
