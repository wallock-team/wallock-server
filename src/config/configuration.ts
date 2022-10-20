export default function configuration() {
  return {
    env: process.env.ENV,
    baseUrl: process.env.SERVER_URL,
    oidcClients: {
      google: {
        client_id: process.env.OIDC_GOOGLE_CLIENT_ID,
        client_secret: process.env.OIDC_GOOGLE_CLIENT_SECRET
      },
      facebook: {
        client_id: process.env.OIDC_FACEBOOK_CLIENT_ID,
        client_secret: process.env.OIDC_FACEBOOK_CLIENT_SECRET
      }
    }
  }
}
