// import { Injectable } from '@nestjs/common/decorators'
// import { PassportStrategy } from '@nestjs/passport'
// import { Strategy } from 'openid-client'
// import { ExtractJwt } from 'passport-jwt'
// import * as dotenv from 'dotenv'

// dotenv.config()

// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
//   constructor() {
//     super({
//       secretOrKeyProvider: passportJwtSecret({
//         cache: true,
//         rateLimit: true,
//         jwksRequestsPerMinute: 5,
//         jwksUri: 'KEYS_URI'
//       }),
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       issuer: 'Issuer',
//       algorithms: ['RS256']
//     })
//   }

//   async validate(payload: JwtPayloadInterface) {
//     const { email } = payload
//     //const user = await this.userRepository.findOne({ email });

//     if (!user || !user.isActive) {
//       throw new UnauthorizedException()
//     }

//     return payload
//   }
// }
