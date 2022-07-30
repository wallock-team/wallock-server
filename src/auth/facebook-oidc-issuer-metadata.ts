import { IssuerMetadata } from 'openid-client'

// Pulled directly from
// https://www.facebook.com/.well-known/openid-configuration/
const facebookIssuerMetadata: IssuerMetadata = {
  issuer: 'https://www.facebook.com',
  authorization_endpoint: 'https://facebook.com/dialog/oauth/',
  jwks_uri: 'https://www.facebook.com/.well-known/oauth/openid/jwks/',
  response_types_supported: ['id_token', 'token id_token'],
  subject_types_supported: ['pairwise'],
  id_token_signing_alg_values_supported: ['RS256'],
  claims_supported: [
    'iss',
    'aud',
    'sub',
    'iat',
    'exp',
    'jti',
    'nonce',
    'at_hash',
    'name',
    'given_name',
    'middle_name',
    'family_name',
    'email',
    'picture',
    'user_friends',
    'user_birthday',
    'user_age_range',
    'user_link',
    'user_hometown',
    'user_location',
    'user_gender'
  ]
}

export default facebookIssuerMetadata