import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { MistertController } from './mistert.controller'
import { MistertService } from './mistert.service'
import { EnvConfigModule } from 'src/shared/infrastructure/env-config/env-config.module'
import { GeofenceModule } from 'src/shared/infrastructure/geofence/geofence.module'

@Module({
  imports: [EnvConfigModule, HttpModule, GeofenceModule],
  controllers: [MistertController],
  providers: [MistertService],
  exports: [MistertService],
})
export class MistertModule {}
