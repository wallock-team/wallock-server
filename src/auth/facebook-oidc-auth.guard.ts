import { Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export default class FacebookOidcAuthGuard extends AuthGuard('facebook-oidc') {}
