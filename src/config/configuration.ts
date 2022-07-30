export default function configuration() {
  return {
    env: process.env.ENV,
    baseUrl: process.env.BASE_URL,
    oidcClients: {
      google: {
        id: process.env.OIDC_GOOGLE_CLIENT_ID,
        secret: process.env.OIDC_GOOGLE_CLIENT_ID
      },
      facebook: {
        id: process.env.OIDC_FACEBOOK_CLIENT_ID,
        secret: process.env.OIDC_FACEBOOK_CLIENT_SECRET
      }
    }
  }
}
