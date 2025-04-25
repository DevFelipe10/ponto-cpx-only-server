import { Module } from '@nestjs/common'
import { AzureController } from './azure.controller'
import { AzureService } from './azure.service'
import { HttpModule } from '@nestjs/axios'
import { EnvConfigService } from 'src/shared/infrastructure/env-config/env-config.service'
import { AzureAuthenticationService } from 'src/shared/infrastructure/azure/authentication/azure.authentication.service'

@Module({
  imports: [HttpModule],
  controllers: [AzureController],
  providers: [AzureService, EnvConfigService, AzureAuthenticationService],
})
export class AzureModule {}
