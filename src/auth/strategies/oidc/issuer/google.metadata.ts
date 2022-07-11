import { IssuerMetadata } from 'openid-client'

const GoogleMetadata: IssuerMetadata = {
  claim_types_supported: ['normal'],
  claims_parameter_supported: false,
  grant_types_supported: [
    'authorization_code',
    'refresh_token',
    'urn: ietf: params: oauth: grant - type: device_code',
    'urn: ietf: params: oauth: grant - type: jwt- bearer'
  ],
  request_parameter_supported: false,
  request_uri_parameter_supported: true,
  require_request_uri_registration: false,
  response_modes_supported: ['query', 'fragment'],
  token_endpoint_auth_methods_supported: [
    'client_secret_post',
    'client_secret_basic'
  ],
  issuer: 'https://accounts.google.com',
  authorization_endpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
  device_authorization_endpoint: 'https://oauth2.googleapis.com/device/code',
  token_endpoint: 'https://oauth2.googleapis.com/token',
  userinfo_endpoint: 'https://openidconnect.googleapis.com/v1/userinfo',
  revocation_endpoint: 'https://oauth2.googleapis.com/revoke',
  jwks_uri: 'https://www.googleapis.com/oauth2/v3/certs',
  response_types_supported: [
    'code',
    'token',
    'id_token',
    'code token',
    'code id_token',
    'token id_token',
    'code token id_token',
    'none'
  ],
  subject_types_supported: ['public'],
  id_token_signing_alg_values_supported: ['RS256'],
  scopes_supported: ['openid', 'email', 'profile'],
  claims_supported: [
    'aud',
    'email',
    'email_verified',
    'exp',
    'family_name',
    'given_name',
    'iat',
    'iss',
    'locale',
    'name',
    'picture',
    'sub'
  ],
  code_challenge_methods_supported: ['plain', 'S256'],
  revocation_endpoint_auth_methods_supported: [
    'client_secret_post',
    'client_secret_basic'
  ]
}

export default GoogleMetadata
