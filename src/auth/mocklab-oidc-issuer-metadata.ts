import { IssuerMetadata } from 'openid-client'

// https://www.mocklab.io/docs/oauth2-mock/
const mocklabIssuerMetadata: IssuerMetadata = {
  issuer: 'https://oauth.mocklab.io/',
  authorization_endpoint: 'https://oauth.mocklab.io/oauth/authorize',
  token_endpoint: 'https://oauth.mocklab.io/oauth/token',
  userinfo_endpoint: 'https://oauth.mocklab.io/userinfo',
  jwks_uri: 'https://oauth.mocklab.io/.well-known/jwks.json'
}

export default mocklabIssuerMetadata
