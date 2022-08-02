import { IssuerMetadata } from 'openid-client'

const mockIssuerMetadata: IssuerMetadata = {
  issuer: 'http://localhost:8080',
  authorization_endpoint: 'http://localhost:8080/authorize',
  token_endpoint: 'http://localhost:8080/token',
  userinfo_endpoint: 'http://localhost:8080/userinfo',
  jwks_uri: 'http://localhost:8080/jwks'
}

export default mockIssuerMetadata
