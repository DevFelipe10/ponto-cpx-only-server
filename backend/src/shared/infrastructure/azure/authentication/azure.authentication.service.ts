import { Injectable } from '@nestjs/common'
import { AzureKeyCredential } from '@azure/core-auth'
import createFaceClient, { FaceClient } from '@azure-rest/ai-vision-face'
import { EnvConfigService } from '../../env-config/env-config.service'

@Injectable()
export class AzureAuthenticationService {
  constructor(private readonly envConfigService: EnvConfigService) {}

  authenticate(): FaceClient {
    const endpoint = this.envConfigService.getAzureBaseUrl() ?? '<endpoint>'
    const apikey = this.envConfigService.getAzureApiKey() ?? '<apikey>'
    const credential = new AzureKeyCredential(apikey)
    const client = createFaceClient(endpoint, credential, {
      apiVersion: 'v1.2-preview.1',
    })

    return client
  }
}
