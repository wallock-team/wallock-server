import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { error } from 'console'
import { Client, ClientMetadata, Issuer, IssuerMetadata } from 'openid-client'
import facebookIssuerMetadata from './facebook-oidc-issuer-metadata'
import googleIssuerMetadata from './google-oidc-issuer-metadata'

@Injectable()
export default class OidcClientsManager {
  constructor(private readonly configService: ConfigService) {
    this.clients = new Map()
    this.registerClient(
      'google',
      googleIssuerMetadata,
      this.configService.getOrThrow<ClientMetadata>('oidcClients.google')
    )
    this.registerClient(
      'facebook',
      facebookIssuerMetadata,
      this.configService.getOrThrow<ClientMetadata>('oidcClients.facebook')
    )
  }

  public getClient(name: string): Client {
    if (this.clients.has(name)) {
      return this.clients.get(name)
    } else {
      throw new error(`The OIDC client '${name}' is not supported`)
    }
  }

  private registerClient(
    name: string,
    issuerMetadata: IssuerMetadata,
    clientMetadata: ClientMetadata
  ) {
    this.clients.set(
      name,
      new new Issuer(issuerMetadata).Client(clientMetadata)
    )
  }

  private clients: Map<string, Client>
}
