import { Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export default class GoogleOidcAuthGuard extends AuthGuard('google-oidc') {}
