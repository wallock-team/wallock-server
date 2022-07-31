import { Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export default class MocklabOidcAuthGuard extends AuthGuard('mocklab-oidc') {}
